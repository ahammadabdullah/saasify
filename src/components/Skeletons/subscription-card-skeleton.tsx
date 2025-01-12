import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SubscriptionCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-24 w-full" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
