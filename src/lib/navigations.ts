import { Home, LayoutDashboard, Navigation, Star } from "lucide-react";

export const navigationData = [
  {
    type: "Page",
    name: "Home",
    href: "/playground/home",
    icon: Home,
  },
  {
    type: "dropdown",
    name: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { name: "Dashboard 1", href: "/playground/?dashboard" },
      { name: "Dashboard 2", href: "/playground/?dashboard" },
    ],
    href: "/?options",
  },
  {
    type: "cluster",
    name: "Navigation",
    items: [
      {
        name: "Nav Variants",
        icon: Navigation,
        children: [
          { name: "Promotion", href: "/playground/?banner=promotion" },
          { name: "Notification", href: "/playground/?banner=notification" },
          { name: "Warning", href: "/playground/?banner=warning" },
          { name: "Information", href: "/playground/?banner=information" },
        ],
        href: "/?banner=promotion",
      },
      {
        name: "Nav Alignment Variants",
        icon: Navigation,
        children: [
          { name: "Left Align", href: "/playground/?banner-align=left" },
          {
            name: "Centered Align",
            href: "/playground/?banner-align=centered",
          },
        ],
        href: "/?banner-align=left",
      },
    ],
  },
  // {
  //   type: "cluster",
  //   name: "Navigation 2",
  //   items: [
  //     {
  //       name: "Nav Variants 2",
  //       icon: Navigation,
  //       children: [
  //         { name: "Promotion 2", href: "/?banner=promotion" },
  //         { name: "Notification 2", href: "/?banner=notification" },
  //         { name: "Warning 2", href: "/?banner=warning" },
  //         { name: "Information 2", href: "/?banner=information" },
  //       ],
  //       href: "/?banner=promotion",
  //     },
  //     {
  //       name: "Nav Alignment Variants 2",
  //       icon: Navigation,
  //       children: [
  //         { name: "Left Align 2", href: "/?banner-align=left" },
  //         { name: "Centered Align 2", href: "/?banner-align=centered" },
  //       ],
  //       href: "/?banner-align=left",
  //     },
  //   ],
  // },
  // {
  //   type: "dropdown",
  //   name: "Simple Dropdown",
  //   icon: Star,
  //   children: [
  //     { name: "Option 1", href: "/?option1" },
  //     { name: "Option 2", href: "/?option2" },
  //   ],
  //   href: "/?options",
  // },
  {
    type: "Options",
    name: "Options",
    href: "/?options",
    children: [
      { name: "Option 1", href: "/playground/?option1" },
      { name: "Option 2", href: "/playground/?option2" },
    ],
  },
];
