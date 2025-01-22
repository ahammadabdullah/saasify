import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ActiveSubscription() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Subscription</CardTitle>
        <CardDescription>Your active plan</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-bold">Basic Plan</p>
        <p className="text-sm text-muted-foreground">$9.99/month</p>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </CardContent>
    </Card>
  );
}
