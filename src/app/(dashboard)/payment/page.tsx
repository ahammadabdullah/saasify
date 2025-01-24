"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { PayNowBanner } from "@/components/payment/pay-now-banner";
import { UpgradeCTA } from "@/components/payment/upgrade-cta";
import { ActiveSubscription } from "@/components/payment/active-subscription";
import { CancelSubscription } from "@/components/payment/cancel-subscription";
import { BillingMethod } from "@/components/payment/billing-method";
import { Invoices } from "@/components/payment/invoices";
import useGetCustomer from "@/hooks/use-getCustomer";
import { PaymentPageSkeleton } from "@/components/Skeletons/payment-page-skeleton";
import { getCustomerSubscriptionDetails } from "@/lib/api/payment";
import { useQuery } from "@tanstack/react-query";

export default function PaymentPage() {
  const [customer, isLoading] = useGetCustomer();
  const { data, isLoading: IsFetchLoading } = useQuery({
    queryKey: ["customerInfo", customer?.id],
    queryFn: () => getCustomerSubscriptionDetails("4845363"),
  });
  console.log("-------data----------", data);
  if (isLoading || IsFetchLoading) return <PaymentPageSkeleton />;
  return (
    <ScrollArea className="flex-1">
      <div className="container px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <PayNowBanner currentDue={data?.currentDue} />
            <ActiveSubscription currentPlan={data?.currentPlan} />
            <UpgradeCTA customer={customer} currentPlan={data?.currentPlan} />
            <CancelSubscription />
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            <BillingMethod billingMethod={data?.billingMethod} />
            <Invoices invoices={data?.lastInvoices} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
