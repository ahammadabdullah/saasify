import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BillingMethodSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-2" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-full sm:w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
