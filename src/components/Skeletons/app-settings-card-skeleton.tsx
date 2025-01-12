import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSettingsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-16 w-full" />
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-48 mb-1" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
