import { Skeleton } from "@/components/ui/skeleton";

export function MiddlePanelSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* Preset CTA Area */}
      <div className="border-b h-[180px]">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Custom Area */}
      <div className="flex-grow border-b">
        <Skeleton className="h-full w-full" />
      </div>

      {/* AI Chat Area */}
      <div className="h-[180px] md:h-[200px]">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
