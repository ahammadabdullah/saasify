import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import packages from "@/lib/packages";

export function ActiveSubscription({
  currentPlan,
}: {
  currentPlan: string | null | undefined;
}) {
  const plan = packages.find((p) => p.name === currentPlan);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Subscription</CardTitle>
        <CardDescription>Your active plan</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{plan?.name}</p>
        <p className="text-sm text-muted-foreground">{plan?.price}</p>
        <ul className="list-disc list-inside mt-2 text-sm">
          {plan?.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
