import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function InvoicesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-4">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="pb-4">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="pb-4">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="pb-4">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="pb-4">
                  <Skeleton className="h-4 w-16" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="py-2">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="py-2">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="py-2">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="py-2">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="py-2">
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
