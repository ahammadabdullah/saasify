import { Skeleton } from "@/components/ui/skeleton";

export function TopNavSkeleton() {
  return (
    <div className="z-30 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        {/* Title area */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-40" />
        </div>

        {/* Banner area */}
        <div className="flex-grow flex justify-center">
          <Skeleton className="h-8 w-3/4" />
        </div>

        {/* Action buttons area */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Notification button */}
          <Skeleton className="h-10 w-10 rounded-full" />

          {/* Theme toggle button */}
          <Skeleton className="h-10 w-10 rounded-full" />

          {/* Logout button */}
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
