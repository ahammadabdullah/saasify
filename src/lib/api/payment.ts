"use server";

// const getCurrentSubscription = async (customerId: string) => {
//   const res = await fetch(
//     `${process.env.LEMON_URL}/subscriptions?filter[customer_id]=${customerId}`,
//     {
//       headers: {
//         Authorization: `Bearer YOUR_API_KEY`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await res.json();
//   const activeSubscription = data.data.find(
//     (sub: any) => sub.attributes.status === "active"
//   );

//   return activeSubscription
//     ? {
//         planName: activeSubscription.attributes.name,
//         price: activeSubscription.attributes.price,
//         nextBillingDate: activeSubscription.attributes.renews_at,
//       }
//     : null;
// };

// const getBillingMethod = async (customerId: string) => {
//   const res = await fetch(
//     `${process.env.LEMON_URL}/subscriptions?filter[customer_id]=${customerId}`,
//     {
//       headers: {
//         Authorization: `Bearer YOUR_API_KEY`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await res.json();
//   const activeSubscription = data.data.find(
//     (sub: any) => sub.attributes.status === "active"
//   );

//   return activeSubscription
//     ? {
//         paymentMethod: activeSubscription.attributes.payment_method,
//         last4: activeSubscription.attributes.card_last4,
//       }
//     : null; // No active billing method
// };

// const getDueStatus = async (customerId: string) => {
//   const res = await fetch(
//     `${process.env.LEMON_URL}/subscriptions?filter[customer_id]=${customerId}`,
//     {
//       headers: {
//         Authorization: `Bearer YOUR_API_KEY`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await res.json();
//   const overdueSubscription = data.data.find(
//     (sub: any) => sub.attributes.status === "past_due"
//   );

//   return overdueSubscription
//     ? {
//         dueAmount: overdueSubscription.attributes.price,
//         dueDate: overdueSubscription.attributes.ends_at,
//       }
//     : null;
// };
// const getUserBillingDetails = async (customerId: string) => {
//   try {
//     if (!customerId) {
//       throw new Error("Customer ID not found");
//     }

//     const [subscription, billingMethod, dueStatus] = await Promise.all([
//       getCurrentSubscription(customerId),
//       getBillingMethod(customerId),
//       getDueStatus(customerId),
//     ]);
//     return {
//       subscription,
//       billingMethod,
//       dueStatus,
//     };
//   } catch (error) {
//     console.error("Error fetching user billing details:", error);
//     return null;
//   }
// };
import {
  getSubscription,
  listSubscriptionInvoices,
  cancelSubscription,
  updateSubscription,
  lemonSqueezySetup,
  getCustomer,
  listSubscriptions,
} from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({
  apiKey: process.env.LEMON_API_KEY,
});

export async function getCustomerSubscriptionDetails(customerId: string) {
  try {
    const { data: SubscriptionList } = await listSubscriptions();
    const customerSubscriptions = SubscriptionList?.data.filter(
      (subscription) =>
        subscription.attributes.customer_id === parseInt(customerId)
    );
    const latestSubscription = customerSubscriptions?.[0];

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
      currentDue = latestInvoice?.attributes?.total_usd ?? 0;
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
