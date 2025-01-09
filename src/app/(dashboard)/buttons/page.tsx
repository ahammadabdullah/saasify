"use client";
import { BadgesSection } from "@/components/button-filters/BadgesSection";
import { ButtonsSection } from "@/components/button-filters/ButtonsSection";
import { FiltersSection } from "@/components/button-filters/FiltersSections";
import { SearchSection } from "@/components/button-filters/SearchSection";
import PresetCTA from "@/components/middle-panel/Preset-CTA";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function ButtonPage() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <ScrollArea className="h-full w-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ButtonsSection />
          <SearchSection />
          <FiltersSection
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </div>
        <div>
          <BadgesSection />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
