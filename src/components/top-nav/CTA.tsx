"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Bell, Sun, Moon, Monitor, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useGetUser from "@/hooks/use-getUser";
import useSupabaseClient from "@/lib/supabase/client";
interface Notification {
  id: number;
  message: string;
  time: string;
}
const Cta = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "New AI model released!", time: "2 hours ago" },
    { id: 2, message: "Your subscription will renew soon.", time: "1 day ago" },
    { id: 3, message: "Check out our latest blog post.", time: "3 days ago" },
  ]);
  const [user] = useGetUser();
  const { theme, setTheme } = useTheme();

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
  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        toast({
          title: "Success",
          description: "Successfully logged out",
        });
        router.push("/signin");
      } else {
        toast({
          title: "Error",
          description: "Failed to log out",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
      });
    }
  };

  return (
    <>
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Logout"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user?.email || "User"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default Cta;
