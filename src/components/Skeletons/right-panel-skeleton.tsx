import { Skeleton } from "@/components/ui/skeleton";

export function RightPanelSkeleton() {
  return (
    <div className="w-full lg:w-auto lg:border-l bg-background flex flex-col h-full">
      <div className="flex-1 overflow-hidden p-4 space-y-4">
        {/* Tabs */}
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>

        {/* Content area */}
        <Skeleton className="h-[200px] w-full" />

        {/* Code area */}
        <Skeleton className="h-[150px] w-full" />

        {/* Split/Merge button */}
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Expand button */}
      <div className="p-4">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}
