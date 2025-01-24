import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UpgradeCTASkeleton() {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <Skeleton className="h-10 w-full mb-4" />
        {[...Array(2)].map((_, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-10 w-full sm:w-32" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
