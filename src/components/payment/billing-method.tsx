import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export function BillingMethod({
  billingMethod,
}: {
  billingMethod:
    | {
        type: string | null;
        last4: string | null;
        renewAt: string | null;
      }
    | undefined;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Billing Method</CardTitle>
        <CardDescription>Manage your payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center">
            <CreditCard className="h-6 w-6 mr-2" />
            <div>
              {billingMethod?.type ? (
                <>
                  <p className="font-medium">
                    {billingMethod?.type} ending in {billingMethod?.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {billingMethod?.renewAt
                      ? new Date(billingMethod.renewAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </>
              ) : (
                <p className="font-bold">No payment method found</p>
              )}
            </div>
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
