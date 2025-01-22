"use client";

import { useState } from "react";
import { TopNav } from "@/components/top-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { PayNowBanner } from "@/components/payment/pay-now-banner";
import { UpgradeCTA } from "@/components/payment/upgrade-cta";
import { ActiveSubscription } from "@/components/payment/active-subscription";
import { CancelSubscription } from "@/components/payment/cancel-subscription";
import { BillingMethod } from "@/components/payment/billing-method";
import { Invoices } from "@/components/payment/invoices";

export default function PaymentPage() {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ScrollArea className="flex-1">
      <div className="container px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <PayNowBanner />
            <UpgradeCTA />
            <ActiveSubscription />
            <CancelSubscription />
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            <BillingMethod />
            <Invoices />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
