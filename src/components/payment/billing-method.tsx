import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export function BillingMethod() {
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
              <p className="font-medium">Visa ending in 1234</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
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
