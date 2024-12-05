"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Star,
  ChevronDown,
  Menu,
  ChevronRight,
  Navigation,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useMediaQuery } from "@/hooks/use-media-query";

const navigation = [
  {
    name: "Nav Variants",
    icon: Navigation,
    children: [
      { name: "Promotion", href: "/?banner=promotion" },
      { name: "Notification", href: "/?banner=notification" },
      { name: "Warning", href: "/?banner=warning" },
      { name: "Information", href: "/?banner=information" },
    ],
    href: "/?banner=promotion",
  },
  // { name: "Settings", href: "/settings", icon: Settings },
];

interface LeftPanelProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function LeftPanel({ collapsed, onToggle }: LeftPanelProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div
      className={cn(
        "flex h-screen flex-col justify-between border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? (isDesktop ? "w-16" : "w-0") : "w-64",
        !isDesktop && "fixed left-0 top-0 z-40"
      )}
    >
      <div className="flex flex-col">
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <Star className="h-6 w-6" />
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
              <ChevronRight className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {navigation.map((item) =>
            item.children ? (
              <Collapsible className="overflow-x-hidden" key={item.name}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full",
                      collapsed ? "justify-center" : "justify-start"
                    )}
                    onClick={() => {
                      if (collapsed) {
                        onToggle();
                      }
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && (
                      <>
                        <span className="ml-2">{item.name}</span>
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                {!collapsed && (
                  <CollapsibleContent className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Button
                        key={child.name}
                        variant="ghost"
                        asChild
                        className="w-full justify-start"
                      >
                        <Link href={child.href}>{child.name}</Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            ) : (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className={cn(
                  "w-full",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.name}</span>}
                </Link>
              </Button>
            )
          )}
        </nav>
      </div>
      <div className="border-t p-4">
        <Button
          size={collapsed ? "icon" : "default"}
          variant="secondary"
          className="w-full"
          title="Upgrade Plan"
        >
          <Star className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Upgrade Plan</span>}
        </Button>
      </div>
    </div>
  );
}
