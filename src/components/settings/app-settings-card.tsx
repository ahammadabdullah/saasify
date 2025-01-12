"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function AppSettingsCard() {
  const [usageBasedPricing, setUsageBasedPricing] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Settings</CardTitle>
        <CardDescription>
          Configure your application preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Usage (Last 30 days)</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Premium Models</span>
                <span>50 / 500</span>
              </div>
              <Progress value={10} />
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Usage-based pricing allows you to pay for extra requests beyond
              your plan limits.
            </AlertDescription>
          </Alert>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="usage-pricing">Enable usage-based pricing</Label>
              <p className="text-sm text-muted-foreground">
                Automatically charge for additional usage
              </p>
            </div>
            <Switch
              id="usage-pricing"
              checked={usageBasedPricing}
              onCheckedChange={setUsageBasedPricing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
