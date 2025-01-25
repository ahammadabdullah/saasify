import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import crypto from "crypto";

const LEMON_WEBHOOK_SECRET = process.env.LEMON_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  const hmac = crypto.createHmac("sha256", LEMON_WEBHOOK_SECRET);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const receivedSignature = Buffer.from(
    req.headers.get("X-Signature") || "",
    "utf8"
  );

  if (!crypto.timingSafeEqual(digest, receivedSignature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const payload = JSON.parse(rawBody);
  const supabase = await createSupabaseServerClient();
  // console.log("Webhook received:", payload);

  try {
    const { meta, data } = payload;
    const eventName = meta?.event_name; // subscription_created, subscription_updated, subscription_deleted, order_created
    const { id: subscriptionId, attributes } = data;
    const userId = meta.custom_data?.user_id;

    if (!userId) {
      console.error("User ID not found in metadata");
      return NextResponse.json(
        { error: "Missing user ID in subscription metadata" },
        { status: 400 }
      );
    }

    const randomId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated"
    ) {
      const {
        customer_id: lemonCustomerId,
        product_name,
        variant_name,
        status,
        billing_anchor,
        card_brand,
        card_last_four,
        renews_at,
        created_at,
        updated_at,
        total,
      } = attributes;
      const { error } = await supabase.from("subscriptions").insert({
        id: randomId,
        user_id: userId,
        product_name,
        subscription_id: subscriptionId,
        variant_name,
        status,
        billing_anchor,
        card_brand,
        card_last_four,
        renews_at,
        created_at,
        updated_at,
        total: total / 100,
      });

      if (error) {
        console.error("Error inserting subscription:", error);
        return NextResponse.json(
          { error: "Failed to upsert subscription" },
          { status: 500 }
        );
      }
    } else if (eventName === "subscription_deleted") {
      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("subscription_id", subscriptionId);

      if (error) {
        console.error("Error deleting subscription:", error);
        return NextResponse.json(
          { error: "Failed to delete subscription" },
          { status: 500 }
        );
      }
    } else if (eventName === "order_created") {
      const { error } = await supabase.from("subscriptions").insert({
        id: randomId,
        user_id: userId,
        product_name: attributes.first_order_item.product_name,
        subscription_id: data.id,
        variant_name: attributes.first_order_item.variant_name,
        status: attributes.status,
        billing_anchor: attributes.billing_anchor,
        card_brand: attributes.card_brand,
        card_last_four: attributes.card_last_four,
        renews_at: attributes.renews_at,
        created_at: attributes.created_at,
        updated_at: attributes.updated_at,
        total: attributes.total / 100,
      });
      if (error) {
        console.error("Error inserting order:", error);
        return NextResponse.json(
          { error: "Failed to insert order" },
          { status: 500 }
        );
      }
    } else {
      console.warn(`Unhandled event_name: ${eventName}`);
    }

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
