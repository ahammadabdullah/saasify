"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Banner } from "@/components/banner";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  const { setTheme } = useTheme();
  const searchParams = useSearchParams();
  const [showBanner, setShowBanner] = useState(true);
  const [bannerVariant, setBannerVariant] = useState<{
    variant:
      | "notification"
      | "promotion"
      | "warning"
      | "information"
      | null
      | undefined;
  }>({
    variant: "notification",
  });

  useEffect(() => {
    const banner = searchParams.get("banner");
    if (
      banner &&
      ["notification", "promotion", "warning", "information"].includes(banner)
    ) {
      setBannerVariant({
        variant: banner as
          | "notification"
          | "promotion"
          | "warning"
          | "information",
      });
      setShowBanner(true);
    }
  }, [searchParams]);

  return (
    <div className="z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{title}</span>
          </Link>
        </div>
        <div>
          {showBanner && bannerVariant && (
            <Banner
              variant={bannerVariant.variant}
              message="Check out our latest AI models and improvements."
              dismissable
              onDismiss={() => setShowBanner(false)}
              className="ml-4 flex-grow"
            />
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Settings">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" aria-label="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
