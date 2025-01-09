import { FilterSelect } from "@/components/presets/filter-select";
import { MultiSelectFilter } from "@/components/presets/multi-select-filter";

interface FiltersSectionProps {
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}

export const FiltersSection = ({
  selectedValues,
  setSelectedValues,
}: FiltersSectionProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Filters</h2>
    <div className="flex flex-wrap gap-4">
      <FilterSelect
        variant="ghost"
        placeholder="Ghost filter"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        className="w-[200px]"
      />
      <FilterSelect
        variant="outline"
        placeholder="Outline filter"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        className="w-[200px]"
      />
      <FilterSelect
        variant="solid"
        placeholder="Solid filter"
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
  </div>
);
