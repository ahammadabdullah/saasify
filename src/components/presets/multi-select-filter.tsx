"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";

const multiSelectFilterVariants = cva(
  "w-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring flex items-center justify-between",
  {
    variants: {
      variant: {
        default:
          "bg-white border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-10 px-5 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MultiSelectFilterProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectFilterVariants> {
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string[];
  onValueChange: (value: string[]) => void;
}

const MultiSelectFilter = React.forwardRef<
  HTMLButtonElement,
  MultiSelectFilterProps
>(
  (
    {
      className,
      variant,
      size,
      options,
      placeholder,
      value = [],
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (currentValue: string) => {
      const newValue = value.includes(currentValue)
        ? value.filter((v) => v !== currentValue)
        : [...value, currentValue];
      onValueChange(newValue);
    };

    const selectedLabels = React.useMemo(() => {
      if (value.length === 0) return "";
      const selected = options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label);

      let result = selected.join(", ");
      if (result.length > 20) {
        result = result.slice(0, 20).trim();
        const lastCommaIndex = result.lastIndexOf(",");
        if (lastCommaIndex !== -1) {
          result = result.slice(0, lastCommaIndex);
        }
        result += "...";
      }
      return result;
    }, [value, options]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            role="combobox"
            aria-expanded={open}
            className={cn(
              multiSelectFilterVariants({ variant, size, className })
            )}
            {...props}
          >
            <span className="truncate mr-2">
              {selectedLabels || placeholder || "Select options..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search options..." />
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
MultiSelectFilter.displayName = "MultiSelectFilter";

export { MultiSelectFilter, multiSelectFilterVariants };
