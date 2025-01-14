import { WaitlistForm } from "@/components/waitlist/WaitList";
import React from "react";

const WaitListPage = () => {
  return (
    <div className="flex-1 min-h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="h-3/4 py-6 space-y-8  flex flex-col items-center justify-center px-10 md:px-0">
        <div className="space-y-0.5 text-center">
          <h2 className="text-2xl font-bold">Join Our WaitList</h2>
          <p className="text-muted-foreground">
            Be among the first to experience our revolutionary AI SaaS platform.
          </p>
        </div>
        <WaitlistForm />
      </div>
    </div>
  );
};

export default WaitListPage;
