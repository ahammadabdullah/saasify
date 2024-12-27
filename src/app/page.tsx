"use client";

import dynamic from "next/dynamic";
import { LeftPanel } from "@/components/left-panel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import { MiddlePanelSkeleton } from "@/components/Skeletons/middle-panel-skeleton";
import { RightPanelSkeleton } from "@/components/Skeletons/right-panel-skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TopNavSkeleton } from "@/components/Skeletons/top-nav-skeleton";

const TopNav = dynamic(
  () => import("@/components/top-nav").then((mod) => mod.TopNav),
  { loading: () => <TopNavSkeleton />, ssr: false }
);

const MiddlePanel = dynamic(
  () => import("@/components/middle-panel").then((mod) => mod.MiddlePanel),
  { loading: () => <MiddlePanelSkeleton />, ssr: false }
);

const RightPanel = dynamic(
  () => import("@/components/right-panel").then((mod) => mod.RightPanel),
  { loading: () => <RightPanelSkeleton />, ssr: false }
);

export default function Page() {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isSmallScreen = !isDesktop;
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(
    !isSmallScreen
  );
  const [middlePanelLoaded, setMiddlePanelLoaded] = useState(false);
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false);

  useEffect(() => {
    setLeftPanelCollapsed(!isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    if (middlePanelLoaded && !rightPanelLoaded) {
      setRightPanelLoaded(true);
    }
  }, [middlePanelLoaded, rightPanelLoaded]);

  useEffect(() => {
    if (!middlePanelLoaded) {
      setMiddlePanelLoaded(true);
    }
  }, [middlePanelLoaded]);

  const togglePanel = () => setIsRightPanelVisible(!isRightPanelVisible);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full py-6 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">Welcome to AI SaaS</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">
          Revolutionize Your Business with AI
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
          Our AI-powered solutions help you streamline operations, enhance
          customer experiences, and drive growth.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Get Started
        </button>
      </main>
      <footer className="w-full py-4 bg-gray-800 text-white text-center">
        <p>&copy; 2023 AI SaaS. All rights reserved.</p>
      </footer>
    </div>
  );
}

// return (
//   <div className="flex min-h-screen">
//     <Suspense>
//       <LeftPanel
//         collapsed={leftPanelCollapsed}
//         onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
//       />
//     </Suspense>
//     <div className="flex flex-1 flex-col">
//       <TopNav title="AI SaaS Boilerplate" />
//       <div className="flex flex-1 flex-col">
//         <ResizablePanelGroup direction={"horizontal"} className="flex-1">
//           <ResizablePanel defaultSize={isDesktop ? 60 : 100}>
//             {middlePanelLoaded && <MiddlePanel />}
//           </ResizablePanel>
//           {isDesktop && <ResizableHandle withHandle />}
//           <ResizablePanel
//             defaultSize={isDesktop ? 40 : 0}
//             minSize={isDesktop ? 30 : 0}
//             maxSize={isDesktop ? 70 : 0}
//           >
//             {rightPanelLoaded && (
//               <RightPanel
//                 isSmallScreen={isSmallScreen}
//                 isVisible={isRightPanelVisible}
//                 setIsVisible={setIsRightPanelVisible}
//               />
//             )}
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </div>
//     {isSmallScreen && !isRightPanelVisible && (
//       <Button
//         onClick={togglePanel}
//         className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 bg-primary text-primary-foreground"
//       >
//         <ArrowLeftFromLine />
//       </Button>
//     )}
//   </div>
// );
