import { WaitlistPageSkeleton } from "@/components/Skeletons/waitlist-skeleton";
import dynamic from "next/dynamic";
import React from "react";

const WaitlistForm = dynamic(
  () =>
    import("@/components/waitlist/WaitList").then((mod) => mod.WaitlistForm),
  { ssr: false, loading: () => <WaitlistPageSkeleton /> }
);

const WaitListPage = () => {
  return (
    <div className="flex-1 min-h-[calc(100vh-70px)] ">
      <div className="h-full py-6 space-y-8  flex flex-col items-center justify-center px-10 md:px-0">
        {/* <div className="space-y-0.5 text-center">
          <h2 className="text-2xl font-bold">Join Our WaitList</h2>
          <p className="text-muted-foreground">
            Be among the first to experience our revolutionary AI SaaS platform.
          </p>
        </div> */}
        <WaitlistForm />
      </div>
    </div>
  );
};

export default WaitListPage;
