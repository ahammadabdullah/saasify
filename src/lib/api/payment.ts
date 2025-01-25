"use server";

import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { createSupabaseServerClient } from "../supabase/server";

lemonSqueezySetup({
  apiKey: process.env.LEMON_API_KEY,
});

export async function getCustomerSubscriptionDetails(userId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (subscriptionError) {
      console.error("Error fetching subscriptions:", subscriptionError);
      return null;
    }

    if (!subscriptionData || subscriptionData.length === 0) {
      console.warn("No subscriptions found for this customer.");
      return null;
    }

    const latestSubscription = subscriptionData[0];
    const currentPlan = latestSubscription?.variant_name ?? null;

    let currentDue = 0;
    if (latestSubscription?.status !== "paid") {
      currentDue = latestSubscription?.amount_due
        ? parseFloat(latestSubscription.amount_due)
        : 0;
    }

    const billingMethod = {
      type: latestSubscription?.card_brand ?? null,
      last4: latestSubscription?.card_last_four ?? null,
      renewAt: latestSubscription?.renews_at ?? null,
    };

    const { data: invoiceList } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return {
      currentPlan,
      currentDue,
      billingMethod,
      invoiceList,
    };
  } catch (error) {
    console.error("Error fetching subscription details:", error);
    return null;
  }
}
