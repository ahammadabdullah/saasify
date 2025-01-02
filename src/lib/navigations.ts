import {
  Bot,
  Home,
  Images,
  LayoutDashboard,
  Navigation,
  Star,
} from "lucide-react";

export const navigationData = [
  {
    type: "Page",
    name: "Home",
    href: "/home",
    icon: Home,
  },
  {
    type: "dropdown",
    name: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { name: "Dashboard 1", href: "/?dashboard" },
      { name: "Dashboard 2", href: "/?dashboard" },
    ],
    href: "/?options",
  },
  {
    type: "dropdown",
    name: "Ai Assistant",
    icon: Bot,
    children: [
      { name: "layout 1", href: "/chat/?layout=layout1" },
      { name: "layout 2", href: "/chat/?layout=layout2" },
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
          { name: "Promotion", href: "?banner=promotion" },
          { name: "Notification", href: "?banner=notification" },
          { name: "Warning", href: "?banner=warning" },
          { name: "Information", href: "?banner=information" },
        ],
        href: "/?banner=promotion",
      },
      {
        name: "Nav Alignment Variants",
        icon: Navigation,
        children: [
          { name: "Left Align", href: "?banner-align=left" },
          {
            name: "Centered Align",
            href: "?banner-align=centered",
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
    type: "page",
    name: "Pages",
    href: "/?options",
    children: [
      { name: "Icons", href: "/icons", icon: Images },
      { name: "Option 2", href: "/?option2" },
    ],
  },
];
