import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filterSelectVariants = cva(
  "w-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        ghost: "bg-transparent border-gray-300 hover:bg-gray-100",
        outline:
          "bg-white border-gray-300 shadow-sm hover:border-gray-400 text-gray-900",
        solid: "bg-gray-800 text-white border-gray-600 hover:bg-gray-700",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-xs",
        lg: "h-10",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

export interface FilterSelectProps
  extends React.ComponentPropsWithoutRef<typeof Select>,
    VariantProps<typeof filterSelectVariants> {
  options: { value: string; label: string }[];
  className?: string;
  placeholder?: string;
}

const FilterSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  FilterSelectProps
>(({ className, variant, size, options, placeholder, ...props }, ref) => {
  return (
    <Select {...props}>
      <SelectTrigger
        ref={ref}
        className={cn(filterSelectVariants({ variant, size, className }))}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={`${variant === "ghost" && "bg-transparent"} ${
          variant === "outline"
            ? "shadow-sm bg-primary text-primary-foreground"
            : ""
        }`}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
FilterSelect.displayName = "FilterSelect";

export { FilterSelect, filterSelectVariants };
