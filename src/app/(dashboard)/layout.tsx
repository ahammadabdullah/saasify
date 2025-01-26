"use client";

import dynamic from "next/dynamic";
import { LeftPanel } from "@/components/left-panel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TopNavSkeleton } from "@/components/Skeletons/top-nav-skeleton";

const TopNav = dynamic(
  () => import("@/components/top-nav").then((mod) => mod.TopNav),
  { loading: () => <TopNavSkeleton />, ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isLayoutLoaded, setIsLayoutLoaded] = useState(false);
  useEffect(() => {
    setIsLayoutLoaded(true);
  }, []);

  useEffect(() => {
    setLeftPanelCollapsed(!isDesktop);
  }, [isDesktop]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`flex max-h-screen `}>
        <Suspense>
          <LeftPanel
            collapsed={leftPanelCollapsed}
            onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          />
        </Suspense>
        <div className="flex flex-1 flex-col">
          <TopNav title="AI SaaS Boilerplate" />
          <div
            className={`flex flex-1 flex-col max-h-[calc(100vh-100px)] ${
              isLayoutLoaded ? "" : "md:ml-72"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
