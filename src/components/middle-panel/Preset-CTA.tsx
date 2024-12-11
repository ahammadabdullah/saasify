import { useState } from "react";
import { SearchInput } from "@/components/presets/search-input";
import { FilterSelect } from "@/components/presets/filter-select";
import { CustomButton } from "@/components/presets/custom-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MultiSelectFilter } from "../presets/multi-select-filter";

const PresetCTA = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <div className="border-b h-[180px] ">
      <ScrollArea className=" h-full w-screen lg:w-full">
        <div className="flex flex-col p-4 space-y-4 overflow-x-auto">
          {/* Search bars row */}
          <div className="flex space-x-4">
            <SearchInput
              variant="left-icon"
              placeholder="Search..."
              className="w-[200px]"
            />
            <SearchInput
              variant="right-icon"
              placeholder="Search..."
              className="w-[200px]"
            />
          </div>

          {/* Filters row */}
          <div className="flex space-x-4">
            <FilterSelect
              variant="ghost"
              placeholder="Filter 1 (Ghost)"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              className="w-[200px]"
            />
            <FilterSelect
              variant="outline"
              placeholder="Filter 2 (Outline)"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              className="w-[200px]"
            />
            <FilterSelect
              variant="solid"
              placeholder="Filter 3 (Solid)"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              className="w-[200px]"
            />
            <MultiSelectFilter
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              className="w-[200px]"
              placeholder="Multi Select..."
              value={selectedValues}
              onValueChange={setSelectedValues}
            />
          </div>

          {/* Buttons row */}
          <div className="flex space-x-4">
            <CustomButton variant="ghost" className="w-[150px]">
              Export
            </CustomButton>
            <CustomButton variant="outline" className="w-[150px]">
              Import
            </CustomButton>
            <CustomButton variant="default" className="w-[150px]">
              Settings
            </CustomButton>
            <CustomButton variant="secondary" className="w-[150px]">
              Analytics
            </CustomButton>
            <CustomButton variant="destructive" className="w-[150px]">
              Delete
            </CustomButton>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default PresetCTA;
