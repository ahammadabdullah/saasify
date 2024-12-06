import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const searchInputVariants = cva(
  "flex items-center w-full rounded-md border border-input bg-transparent text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "pl-10 pr-3",
        "right-icon": "pl-3 pr-10",
        "left-icon": "pl-10 pr-3",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-xs",
        lg: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof searchInputVariants> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div className="relative">
        {variant === "default" && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        )}
        <Input
          type="search"
          className={cn(searchInputVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {variant === "right-icon" && (
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        )}
        {variant === "left-icon" && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput, searchInputVariants };
