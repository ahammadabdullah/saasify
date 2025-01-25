import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PayNowBanner({
  currentDue = 0,
}: {
  currentDue: number | undefined;
}) {
  return (
    <Card>
      {currentDue > 0 ? (
        <>
          <CardHeader>
            <CardTitle>Outstanding Balance</CardTitle>
            <CardDescription>
              Complete your payment to stay up to date.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <p className="text-2xl font-bold mb-4">${currentDue}</p>
            <Button className="w-full">Make Payment</Button>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>All Clear!</CardTitle>
            <CardDescription>
              You have no outstanding payments at the moment.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <p className="text-2xl font-bold mb-4">$0</p>
          </CardContent>
        </>
      )}
    </Card>
  );
}
