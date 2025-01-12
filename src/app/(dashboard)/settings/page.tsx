"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ProfileCard } from "@/components/settings/profile-card";
import { SubscriptionCard } from "@/components/settings/subscription-card";
import { AppSettingsCard } from "@/components/settings/app-settings-card";

export default function SettingsPage() {
  return (
    <ScrollArea className="flex-1 p-6 pb-0 overflow-y-auto">
      <div className="container ">
        <div className="space-y-0.5 mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings, subscription and app preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Column - 40% */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileCard />
            <SubscriptionCard />
          </div>

          {/* Right Column - 60% */}
          <div className="lg:col-span-3">
            <AppSettingsCard />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
