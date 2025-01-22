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

const upgradePlans = [
  {
    name: "Pro",
    price: "$19.99/month",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    name: "Enterprise",
    price: "$49.99/month",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  },
];

export function UpgradeCTA() {
  const [isOpen, setIsOpen] = useState(false);

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
            {upgradePlans.map((plan, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <CardTitle className="text-lg mb-2">{plan.name}</CardTitle>
                <CardDescription className="mb-2">{plan.price}</CardDescription>
                <ul className="list-disc list-inside mb-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <Button className="w-full sm:w-auto">
                  Upgrade to {plan.name}
                </Button>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
