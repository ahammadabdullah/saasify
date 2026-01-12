import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import packages from "@/lib/packages";
import Link from "next/link";
import useGetUser from "@/hooks/use-getUser";

export function UpgradeCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useGetUser();
  return (
    <Card>
      <CardContent className="p-4 sm:p-6  flex justify-around space-y-4 sm:space-y-0 sm:flex-wrap">
        {packages.map((plan, index) => (
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
                target="_blank"
                href={plan.getSubscriptionLink(user?.id as string)}
              >
                Upgrade to {plan.name}
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
