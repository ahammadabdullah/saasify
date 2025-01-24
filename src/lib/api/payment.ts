"use server";

import {
  listSubscriptionInvoices,
  lemonSqueezySetup,
  listSubscriptions,
} from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({
  apiKey: process.env.LEMON_API_KEY,
});

export async function getCustomerSubscriptionDetails(customerId: string) {
  console.log("customerId", customerId);
  try {
    const { data: SubscriptionList } = await listSubscriptions();
    const customerSubscriptions = SubscriptionList?.data.filter(
      (subscription) =>
        subscription.attributes.customer_id === parseInt(customerId)
    );
    const latestSubscription = customerSubscriptions?.[0];
    console.log(
      "--------latestSubscription -------------",
      customerSubscriptions
    );
    const currentPlan = latestSubscription?.attributes?.variant_name ?? null;

    // Get the subscription ID
    const subscriptionId = latestSubscription?.id;

    // Fetch the subscription invoices
    const { data: invoicesData } = await listSubscriptionInvoices({
      filter: { subscriptionId },
    });

    // Retrieve the latest invoice if available
    const latestInvoice =
      invoicesData?.data && invoicesData?.data?.length > 0
        ? invoicesData?.data[0]
        : null;

    // Calculate the current due amount based on invoice status
    let currentDue = 0;
    if (latestInvoice?.attributes?.status !== "paid") {
      currentDue = latestInvoice?.attributes?.total_formatted
        ? parseFloat(latestInvoice.attributes.total_formatted)
        : 0;
    }
    // console.log("--------curr plan ------------", latestSubscription);

    // Extract billing method details
    const billingMethod = {
      type: latestSubscription?.attributes?.card_brand ?? null,
      last4: latestSubscription?.attributes?.card_last_four ?? null,
    };

    // Get the last few invoices (up to 5)
    const lastInvoices = invoicesData?.data.slice(0, 5) ?? [];

    return {
      currentPlan,
      currentDue,
      billingMethod,
      lastInvoices,
    };
  } catch (error) {
    console.error("Error fetching subscription details:", error);
    return null;
  }
}
