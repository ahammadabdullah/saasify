import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PayNowBanner({
  currentDue,
}: {
  currentDue: number | undefined;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay Now</CardTitle>
        <CardDescription>Your payment is due</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <p className="text-2xl font-bold mb-4">${currentDue}</p>
        <Button className="w-full">Pay Now</Button>
      </CardContent>
    </Card>
  );
}
