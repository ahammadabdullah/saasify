import { SearchInput } from "@/components/presets/search-input";

export const SearchSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Search Inputs</h2>
    <div className="flex flex-wrap gap-4">
      <SearchInput
        variant="left-icon"
        placeholder="Left icon search..."
        className="w-[200px]"
      />
      <SearchInput
        variant="right-icon"
        placeholder="Right icon search..."
        className="w-[200px]"
      />
    </div>
  </div>
);
