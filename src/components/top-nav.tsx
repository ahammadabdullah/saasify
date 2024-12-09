"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Bell, Sun, Moon, Monitor, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Banner } from "@/components/banner";
import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopNavProps {
  title: string;
}

interface Notification {
  id: number;
  message: string;
  time: string;
}

export function TopNav({ title }: TopNavProps) {
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const [showBanner, setShowBanner] = useState(true);
  const [bannerAlign, setBannerAlign] = useState<"left" | null | "centered">(
    "left"
  );
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
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "New AI model released!", time: "2 hours ago" },
    { id: 2, message: "Your subscription will renew soon.", time: "1 day ago" },
    { id: 3, message: "Check out our latest blog post.", time: "3 days ago" },
  ]);

  useEffect(() => {
    const banner = searchParams.get("banner");
    const bannerAlign = searchParams.get("banner-align");
    if (bannerAlign && ["left", "centered"].includes(bannerAlign)) {
      setBannerAlign(bannerAlign as "left" | "centered");
    }
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

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const getThemeIcon = () => {
    if (theme === "light") return <Moon className="h-5 w-5" />;
    if (theme === "dark") return <Monitor className="h-5 w-5" />;
    return <Sun className="h-5 w-5" />;
  };

  const getNextTheme = () => {
    if (theme === "light") return "dark";
    if (theme === "dark") return "system";
    return "light";
  };

  const removeNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{title}</span>
          </Link>
        </div>
        <div
          className={`${
            bannerAlign === "centered" ? " flex-grow flex justify-center" : ""
          }`}
        >
          {showBanner && bannerVariant && (
            <Banner
              variant={bannerVariant.variant}
              message="Check out our latest AI models and improvements."
              dismissable
              onDismiss={() => setShowBanner(false)}
              className={`ml-4 ${bannerAlign === "left" ? "flex-grow" : ""}`}
            />
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none">Notifications</h4>
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No new notifications.
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {notification.message}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={cycleTheme}
                  aria-label="Toggle theme"
                >
                  {getThemeIcon()}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {getNextTheme()} theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="ghost" size="icon" aria-label="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
