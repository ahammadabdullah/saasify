import { PayNowBannerSkeleton } from "./pay-now-banner-skeleton";
import { UpgradeCTASkeleton } from "./upgrade-cta-skeleton";
import { ActiveSubscriptionSkeleton } from "./active-subscription-skeleton";
import { CancelSubscriptionSkeleton } from "./cancel-subscription-skeleton";
import { BillingMethodSkeleton } from "./billing-method-skeleton";
import { InvoicesSkeleton } from "./invoices-skeleton";

export function PaymentPageSkeleton() {
  return (
    <div className="container px-4 py-6 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <PayNowBannerSkeleton />
          <UpgradeCTASkeleton />
          <ActiveSubscriptionSkeleton />
          <CancelSubscriptionSkeleton />
        </div>
        {/* Right Column */}
        <div className="space-y-6">
          <BillingMethodSkeleton />
          <InvoicesSkeleton />
        </div>
      </div>
    </div>
  );
}
