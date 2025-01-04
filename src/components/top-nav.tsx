"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Banner } from "@/components/banner";
import { useSearchParams } from "next/navigation";

import Cta from "./top-nav/CTA";

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  const searchParams = useSearchParams();
  const [showBanner, setShowBanner] = useState(false);
  const [bannerAlign, setBannerAlign] = useState<"left" | null | "centered">(
    "left"
  );
  const [bannerVariant, setBannerVariant] = useState<{
    variant:
      | "notification"
      | "promotion"
      | "warning"
      | "information"
      | null
      | undefined;
  }>({
    variant: "notification",
  });

  useEffect(() => {
    setShowBanner(true);
  }, []);
  useEffect(() => {
    const banner = searchParams.get("banner");
    const bannerAlign = searchParams.get("banner-align");
    if (bannerAlign && ["left", "centered"].includes(bannerAlign)) {
      setBannerAlign(bannerAlign as "left" | "centered");
    }
    if (
      banner &&
      ["notification", "promotion", "warning", "information"].includes(banner)
    ) {
      setBannerVariant({
        variant: banner as
          | "notification"
          | "promotion"
          | "warning"
          | "information",
      });
      setShowBanner(true);
    }
  }, [searchParams]);

  return (
    <div className="z-30 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4 justify-center lg:justify-start lg:w-max w-full">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{title}</span>
          </Link>
        </div>
        <div
          className={`${
            bannerAlign === "centered" ? " flex-grow flex justify-center" : ""
          }`}
        >
          {showBanner && bannerVariant && (
            <Banner
              variant={bannerVariant.variant}
              message="Check out our latest AI models and improvements."
              dismissable
              onDismiss={() => setShowBanner(false)}
              className={`ml-4 ${bannerAlign === "left" ? "flex-grow" : ""}`}
            />
          )}
        </div>
        <div className="ml-auto hidden lg:flex items-center space-x-4">
          <Cta />
        </div>
      </div>
    </div>
  );
}
