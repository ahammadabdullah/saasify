import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ActiveSubscriptionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-5 w-24 mb-1" />
        <Skeleton className="h-4 w-20 mb-2" />
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-4 w-full mb-1" />
        ))}
      </CardContent>
    </Card>
  );
}
