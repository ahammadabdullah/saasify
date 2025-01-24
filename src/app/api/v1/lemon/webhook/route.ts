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
  console.log("Webhook received:", payload);

  try {
    const { meta, data } = payload;
    const eventName = meta?.event_name; // subscription_created, subscription_updated, subscription_deleted
    const { id: subscriptionId, attributes } = data;
    console.log("------subscriptionId------", subscriptionId);
    const userId = meta.custom_data?.user_id;
    const {
      customer_id: lemonCustomerId,
      product_name,
      variant_name,
      status,
      test_mode,
      billing_anchor,
      card_brand,
      card_last_four,
      renews_at,
      created_at,
      updated_at,
    } = attributes;

    if (!userId) {
      console.error("User ID not found in metadata");
      return NextResponse.json(
        { error: "Missing user ID in subscription metadata" },
        { status: 400 }
      );
    }

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated"
    ) {
      const { error } = await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          product_name,
          subscription_id: subscriptionId,
          variant_name,
          status,
          test_mode,
          billing_anchor,
          card_brand,
          card_last_four,
          renews_at,
          created_at,
          updated_at,
        },
        { onConflict: "user_id" }
      );

      if (error) {
        console.error("Error upserting subscription:", error);
        return NextResponse.json(
          { error: "Failed to upsert subscription" },
          { status: 500 }
        );
      }
    } else if (eventName === "subscription_deleted") {
      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("id", subscriptionId);

      if (error) {
        console.error("Error deleting subscription:", error);
        return NextResponse.json(
          { error: "Failed to delete subscription" },
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
