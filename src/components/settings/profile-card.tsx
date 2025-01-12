"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ChevronDown } from "lucide-react";

export function ProfileCard() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="john@example.com" disabled />
          <p className="text-xs text-muted-foreground">
            Email cannot be updated. Please contact support for assistance.
          </p>
        </div>
        <Collapsible
          open={isChangePasswordOpen}
          onOpenChange={setIsChangePasswordOpen}
          className="space-y-4"
        >
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Change Password
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isChangePasswordOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="w-full">Update Password</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
