"use client";

import { AppSettingsCardSkeleton } from "@/components/Skeletons/app-settings-card-skeleton";
import { ProfileCardSkeleton } from "@/components/Skeletons/profile-card-skeleton";
import { SubscriptionCardSkeleton } from "@/components/Skeletons/subscription-card-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

import dynamic from "next/dynamic";

const ProfileCard = dynamic(
  () =>
    import("@/components/settings/profile-card").then((mod) => mod.ProfileCard),
  { loading: () => <ProfileCardSkeleton />, ssr: false }
);
const SubscriptionCard = dynamic(
  () =>
    import("@/components/settings/subscription-card").then(
      (mod) => mod.SubscriptionCard
    ),
  { loading: () => <SubscriptionCardSkeleton />, ssr: false }
);
const AppSettingsCard = dynamic(
  () =>
    import("@/components/settings/app-settings-card").then(
      (mod) => mod.AppSettingsCard
    ),
  { loading: () => <AppSettingsCardSkeleton />, ssr: false }
);

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
