import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import packages from "@/lib/packages";
import Link from "next/link";

interface UpgradeCTAProps {
  customer: {
    id: string;
    email: string;
    name: string;
    lemon_customer_id: string;
  };
  currentPlan: string | null | undefined;
}

export function UpgradeCTA({ customer, currentPlan }: UpgradeCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(customer);
  const plans = packages.filter((p) => p.name !== currentPlan);
  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center"
          >
            <span>Upgrade Options</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-4 sm:p-6  flex justify-around space-y-4 sm:space-y-0 sm:flex-wrap">
            {plans.map((plan, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <CardTitle className="text-lg mb-2">{plan.name}</CardTitle>
                <CardDescription className="mb-2">{plan.price}</CardDescription>
                <ul className="list-disc list-inside mb-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <Button className="w-full sm:w-auto">
                  <Link
                    href={plan.getSubscriptionLink(customer.lemon_customer_id)}
                  >
                    Upgrade to {plan.name}
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
