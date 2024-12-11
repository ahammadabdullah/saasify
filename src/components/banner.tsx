"use client";

import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const bannerVariants = cva("flex items-center justify-between text-sm", {
  variants: {
    variant: {
      promotion: "bg-chart-2 text-accent-foreground",
      warning: "bg-destructive text-destructive-foreground",
      notification: "bg-primary text-primary-foreground",
      information: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "information",
  },
});

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  message: string;
  dismissable?: boolean;
  onDismiss?: () => void;
}

export function Banner({
  className,
  variant,
  message,
  dismissable = false,
  onDismiss,
  ...props
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile popup */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:hidden">
        <div
          className={cn(
            bannerVariants({ variant }),
            "rounded-lg shadow-lg p-4",
            className
          )}
          {...props}
        >
          <span>{message}</span>
          {dismissable && (
            <Button
              variant="ghost"
              size="icon"
              className="h-auto p-0 ml-2"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Desktop banner */}
      <div
        className={cn(
          bannerVariants({ variant }),
          className,
          "hidden md:flex justify-center flex-row p-2 rounded-lg shadow-md pl-4"
        )}
        {...props}
      >
        <span>{message}</span>
        {dismissable &&
          (variant === "notification" || variant === "warning") && (
            <Button
              variant="ghost"
              size="icon"
              className="h-auto p-0 ml-2"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
      </div>
    </>
  );
}
