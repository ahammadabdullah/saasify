import { useState } from "react";
import { SearchInput } from "@/components/presets/search-input";
import { FilterSelect } from "@/components/presets/filter-select";
import { CustomButton } from "@/components/presets/custom-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MultiSelectFilter } from "../presets/multi-select-filter";
import { Mail, Trash2, Pencil, ArrowRight } from "lucide-react";
import { Badge } from "../presets/custom-badge";

const PresetCTA = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <ScrollArea className="p-4">
      <div>
        <ScrollArea className=" h-full w-screen lg:w-full">
          <div className="flex flex-col p-4 space-y-4">
            {/* Buttons row */}
            <h3 className="w-full text-lg font-semibold"> Buttons</h3>

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
            {/* circle shaped buttons */}
            <div className="flex space-x-4">
              <CustomButton variant="default" shape="circle" size="icon">
                <Mail className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="destructive" shape="circle" size="icon">
                <Trash2 className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="outline" shape="circle" size="icon">
                <Pencil className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="secondary" shape="circle" size="icon">
                <Mail className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="ghost" shape="circle" size="icon">
                <Mail className="h-4 w-4" />
              </CustomButton>
            </div>
            {/* square shaped buttons */}
            <div className="flex space-x-4">
              <CustomButton variant="default" shape="square" size="icon">
                <Mail className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="destructive" shape="square" size="icon">
                <Trash2 className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="outline" shape="square" size="icon">
                <Pencil className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="secondary" shape="square" size="icon">
                <Mail className="h-4 w-4" />
              </CustomButton>
              <CustomButton variant="ghost" shape="square" size="icon">
                <Mail className="h-4 w-4" />
              </CustomButton>
            </div>
            {/* Pill shaped buttons */}
            <div className="flex space-x-4">
              <CustomButton variant="default" shape="pill">
                <Mail className="h-4 w-4 mr-2" /> Email
              </CustomButton>
              <CustomButton variant="destructive" shape="pill">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </CustomButton>
              <CustomButton variant="outline" shape="pill">
                <Pencil className="h-4 w-4 mr-2" /> Edit
              </CustomButton>
              <CustomButton variant="secondary" shape="pill">
                Email <Mail className="h-4 w-4 ml-2" />
              </CustomButton>
              <CustomButton variant="ghost" shape="pill">
                Delete <Trash2 className="h-4 w-4 ml-2" />
              </CustomButton>
            </div>
            {/* Diamond shaped buttons */}
            <div className="flex space-x-8 pt-5">
              <CustomButton
                variant="outline"
                shape="diamond"
                className="h-16 w-16"
                size={"default"}
              >
                <ArrowRight className="h-6 w-6 -rotate-45" />
              </CustomButton>
              <CustomButton
                variant="secondary"
                shape="diamond"
                className="h-20 w-20"
                size={"icon"}
              >
                <span className="-rotate-45 text-xs">Click Me</span>
              </CustomButton>
            </div>
            {/* Search bars row */}
            <h3 className="w-full text-lg font-semibold"> Search Inputs</h3>

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
            <h3 className="w-full text-lg font-semibold"> Filters</h3>

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
            {/* badges row */}
            <div className="flex flex-col gap-8 ">
              <div className="flex flex-wrap gap-4 items-center">
                <h3 className="w-full text-lg font-semibold"> Badges</h3>
                <h3 className=" font-semibold w-full">Default</h3>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <h3 className=" font-semibold w-full">Pill Shaped</h3>

                <Badge shape="pill">Default</Badge>
                <Badge variant="secondary" shape="pill">
                  Secondary
                </Badge>
                <Badge variant="destructive" shape="pill">
                  Destructive
                </Badge>
                <Badge variant="outline" shape="pill">
                  Outline
                </Badge>
                <Badge variant="success" shape="pill">
                  Success
                </Badge>
                <Badge variant="warning" shape="pill">
                  Warning
                </Badge>
                <Badge variant="info" shape="pill">
                  Info
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <h3 className=" font-semibold w-full">Square</h3>
                <Badge shape="square">Default</Badge>
                <Badge variant="secondary" shape="square">
                  Secondary
                </Badge>
                <Badge variant="destructive" shape="square">
                  Destructive
                </Badge>
                <Badge variant="outline" shape="square">
                  Outline
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <h3 className=" font-semibold w-full">Diamond</h3>

                <Badge shape="diamond" className="h-8 w-8">
                  <span className="-rotate-45">New</span>
                </Badge>
                <Badge variant="secondary" shape="diamond" className="h-8 w-8">
                  <span className="-rotate-45">2</span>
                </Badge>
                <Badge
                  variant="destructive"
                  shape="diamond"
                  className="h-8 w-8"
                >
                  <span className="-rotate-45">!</span>
                </Badge>
                <Badge variant="outline" shape="diamond" className="h-8 w-8">
                  <span className="-rotate-45">i</span>
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <h3 className=" font-semibold w-full">Size Variants</h3>

                <Badge size="sm">Small</Badge>
                <Badge>Default</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </div>

          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </ScrollArea>
  );
};

export default PresetCTA;
