"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useMediaQuery } from "@/hooks/use-media-query";
import { navigationData } from "@/lib/navigations";
import { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useSearchParams } from "next/navigation";
import Cta from "./top-nav/CTA";

interface LeftPanelProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function LeftPanel({ collapsed, onToggle }: LeftPanelProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const searchParams = useSearchParams();

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (href: string) => {
    const url = new URL(href, window.location.origin);
    const queryParams = new URLSearchParams(url.search);
    return Array.from(queryParams.entries()).every(
      ([key, value]) => searchParams.get(key) === value
    );
  };

  const renderNavItem = (item: any) => {
    if (item.type === "Options" && item.children) {
      return (
        <div key={item.name} className="space-y-1">
          {!collapsed && (
            <div className="ml-4 space-y-1">
              {item.children.map((child: any) => {
                const active = isActive(child.href);
                return (
                  <Button
                    key={child.name}
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start",
                      active && "bg-muted animate-active-state"
                    )}
                  >
                    <Link href={child.href}>{child.name}</Link>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      );
    } else if (item.children) {
      return (
        <Collapsible
          key={item.name}
          className="overflow-x-hidden"
          open={openDropdowns[item.name]}
          onOpenChange={() => toggleDropdown(item.name)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full",
                collapsed ? "justify-center" : "justify-start",
                isActive(item.href) && "bg-muted animate-active-state"
              )}
              onClick={() => {
                if (collapsed) {
                  onToggle();
                }
              }}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {!collapsed && (
                <>
                  <span className="ml-2">{item.name}</span>
                  {openDropdowns[item.name] ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent className="ml-4 space-y-1">
              {item.children.map((child: any) => {
                const active = isActive(child.href);
                return (
                  <Button
                    key={child.name}
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start",
                      active && "bg-muted animate-active-state"
                    )}
                  >
                    <Link href={child.href}>{child.name}</Link>
                  </Button>
                );
              })}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    } else {
      const active = isActive(item.href);
      return (
        <Button
          key={item.name}
          variant="ghost"
          asChild
          className={cn(
            "w-full",
            collapsed ? "justify-center" : "justify-start",
            active && "bg-muted animate-active-state"
          )}
        >
          <Link href={item.href}>
            {item.icon && <item.icon className="h-4 w-4" />}
            {!collapsed && <span className="ml-2">{item.name}</span>}
          </Link>
        </Button>
      );
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? (isDesktop ? "w-16" : "w-0") : "w-64",
        !isDesktop && "fixed left-0 top-0 z-50 h-screen"
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-4 py-[32px]">
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">AI SaaS</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            collapsed && "ml-auto",
            !isDesktop && collapsed && "fixed left-4 top-4 z-50"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <span className="bg-background text-foreground p-4 rounded-lg">
              <ChevronRight className="h-4 w-4 " />
            </span>
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-grow px-1">
        <div className="pr-2">
          {navigationData.map((navItem) => (
            <Fragment key={navItem.name}>
              {(navItem.type === "cluster" || navItem.type === "Options") &&
                !collapsed && (
                  <h2 className="my-2 px-4 text-base font-semibold opacity-50">
                    {navItem.name}
                  </h2>
                )}
              {navItem.type === "cluster"
                ? navItem?.items?.map(renderNavItem)
                : renderNavItem(navItem)}
              <div className="my-5" />
            </Fragment>
          ))}
        </div>
      </ScrollArea>
      <div
        className={cn(
          "transition-all duration-1000 ease-in-out flex justify-center gap-6 lg:hidden",
          collapsed ? "hidden" : "w-64 "
        )}
      >
        <Cta />
      </div>
      <div className="mt-auto lg:border-t p-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size={collapsed ? "icon" : "default"}
              variant="secondary"
              className="w-full"
              title="Upgrade Plan"
            >
              {!collapsed && <span>Upgrade Plan</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={`w-48 ${collapsed ? "" : "hidden"} mb-5 `}
            align="start"
            side={"right"}
          >
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Upgrade Plan</h3>
              <p className="text-sm text-muted-foreground">
                Unlock premium features and increase your productivity.
              </p>
              <Button size="sm">View Plans</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

<style jsx global>{`
  .flex-grow > div > div:last-child {
    display: block !important;
    width: 7px !important;
    right: 2px;
  }
  .flex-grow > div > div:last-child > div {
    background-color: hsl(var(--muted-foreground)) !important;
    opacity: 0.2;
  }
  .flex-grow > div > div:last-child:hover > div {
    opacity: 0.4;
  }
`}</style>;
