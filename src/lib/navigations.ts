import {
  AlignJustify,
  Bell,
  Bot,
  CircleAlert,
  Component,
  Construction,
  Home,
  Images,
  LayoutDashboard,
  ListTodo,
  Mail,
  Navigation,
  SquareUser,
  Star,
  Upload,
} from "lucide-react";

export const navigationData = [
  {
    type: "Page",
    name: "Home",
    href: "/home",
    icon: Home,
  },
  // {
  //   type: "dropdown",
  //   name: "Dashboard",
  //   icon: LayoutDashboard,
  //   children: [
  //     { name: "Dashboard 1", href: "/?dashboard" },
  //     { name: "Dashboard 2", href: "/?dashboard" },
  //   ],
  //   href: "/?options",
  // },
  {
    type: "dropdown",
    name: "AI Assistant",
    icon: Bot,
    children: [
      { name: "Left Aligned", href: "/chat/?layout=layout1" },
      { name: "Right Aligned", href: "/chat/?layout=layout2" },
    ],
    href: "/?options",
  },
  {
    type: "cluster",
    name: "Navigation",
    items: [
      {
        name: "Banners",
        icon: Bell,
        children: [
          { name: "Promotion", href: "?banner=promotion" },
          { name: "Notification", href: "?banner=notification" },
          { name: "Warning", href: "?banner=warning" },
          { name: "Information", href: "?banner=information" },
        ],
        href: "/?banner=promotion",
      },
      {
        name: "Banner Alignments",
        icon: AlignJustify,
        children: [
          { name: "Left Aligned", href: "?banner-align=left" },
          {
            name: "Center Aligned",
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
      { name: "Emails", href: "/emails", icon: Mail },
      { name: "Icons", href: "/icons", icon: Images },
      {
        name: "Buttons",
        href: "/buttons",
        icon: Component,
      },
      {
        name: "404",
        href: "/not-found",
        icon: CircleAlert,
      },
      {
        name: "Maintenance",
        href: "/maintenance",
        icon: Construction,
      },
      {
        name: "Profile & Settings",
        href: "/settings",
        icon: SquareUser,
      },
      {
        name: "File Upload",
        href: "/maintenance",
        icon: Upload,
      },
      {
        name: "Wait list",
        href: "/maintenance",
        icon: ListTodo,
      },
    ],
  },
];
