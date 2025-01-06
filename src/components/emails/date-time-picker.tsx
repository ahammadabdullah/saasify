"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
        <div className="p-3 border-t">
          <input
            type="time"
            value={date ? format(date, "HH:mm") : ""}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":");
              const newDate = date ? new Date(date) : new Date();
              newDate.setHours(parseInt(hours), parseInt(minutes));
              handleSelect(newDate);
            }}
            className="w-full border rounded p-2"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
