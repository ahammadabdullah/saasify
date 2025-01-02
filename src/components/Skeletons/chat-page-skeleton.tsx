import { MiddlePanelSkeleton } from "./middle-panel-skeleton";
import { RightPanelSkeleton } from "./right-panel-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ChatPageSkeleton() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-[5.7] overflow-hidden">
          <MiddlePanelSkeleton />
        </div>
        <div className="flex-[2] hidden lg:block">
          <RightPanelSkeleton />
        </div>
      </div>
    </div>
  );
}
