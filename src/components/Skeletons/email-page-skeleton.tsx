import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export function EmailPageSkeleton() {
  return (
    <ScrollArea className="flex-1 p-4 md:p-6">
      {/* Email Template Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>

      {/* Email Form Skeleton */}
      <div className="space-y-6">
        {/* Test Email Input */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-full md:w-20" />
          </div>
        </div>

        {/* Subject Input */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Content Tabs */}
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
          <Skeleton className="h-[200px] md:h-[300px] w-full" />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </ScrollArea>
  );
}
