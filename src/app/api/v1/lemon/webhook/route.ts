import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const LEMON_WEBHOOK_SECRET = process.env.LEMON_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("lemon-squeezy-signature") || "";
  const body = await req.text();
  const expectedSignature = crypto
    .createHmac("sha256", LEMON_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const payload = JSON.parse(body);
  const supabase = await createSupabaseServerClient();
  console.log("Webhook received", payload);
  if (payload.event === "subscription.created") {
    const { id: subscriptionId, attributes } = payload.data;
    const { customer_id: lemonCustomerId, status } = attributes;

    const { error } = await supabase
      .from("customers")
      .update({
        subscription_id: subscriptionId,
        status,
      })
      .eq("lemon_customer_id", lemonCustomerId);
    revalidatePath("/");

    if (error) {
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }
  if (payload.event === "subscription.updated") {
    const { id: subscriptionId, attributes } = payload.data;
    const { customer_id: lemonCustomerId, status } = attributes;

    const { error } = await supabase
      .from("customers")
      .update({
        subscription_id: subscriptionId,
        status,
      })
      .eq("lemon_customer_id", lemonCustomerId);
    revalidatePath("/");

    if (error) {
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }
  if (payload.event === "subscription.deleted") {
    const { id: subscriptionId, attributes } = payload.data;
    const { customer_id: lemonCustomerId, status } = attributes;
    revalidatePath("/");

    const { error } = await supabase
      .from("customers")
      .update({
        subscription_id: null,
        status,
      })
      .eq("lemon_customer_id", lemonCustomerId);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Webhook received" });
}
