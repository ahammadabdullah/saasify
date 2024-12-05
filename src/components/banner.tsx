import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const bannerVariants = cva("flex items-center justify-between text-sm", {
  variants: {
    variant: {
      promotion: "bg-primary text-primary-foreground",
      warning: "bg-warning text-warning-foreground",
      notification: "bg-secondary text-secondary-foreground",
      information: "bg-muted",
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
  return (
    <div
      className={cn(
        bannerVariants({ variant }),
        className,
        "flex justify-center flex-row p-2 rounded-lg shadow-md pl-4 "
      )}
      {...props}
    >
      <span>{message}</span>
      {dismissable && (variant === "notification" || variant === "warning") && (
        <Button
          variant="ghost"
          size="icon"
          className="h-auto p-0 "
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
