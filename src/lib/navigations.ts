import { Navigation, Star } from "lucide-react";

export const navigationData = [
  {
    type: "cluster",
    name: "Navigation",
    items: [
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
      {
        name: "Nav Alignment Variants",
        icon: Navigation,
        children: [
          { name: "Left", href: "/?banner-align=left" },
          { name: "Centered", href: "/?banner-align=centered" },
        ],
        href: "/?banner-align=left",
      },
    ],
  },
  {
    type: "cluster",
    name: "Navigation 2",
    items: [
      {
        name: "Nav Variants 2",
        icon: Navigation,
        children: [
          { name: "Promotion", href: "/?banner=promotion" },
          { name: "Notification", href: "/?banner=notification" },
          { name: "Warning", href: "/?banner=warning" },
          { name: "Information", href: "/?banner=information" },
        ],
        href: "/?banner=promotion",
      },
      {
        name: "Nav Alignment Variants",
        icon: Navigation,
        children: [
          { name: "Left", href: "/?banner-align=left" },
          { name: "Centered", href: "/?banner-align=centered" },
        ],
        href: "/?banner-align=left",
      },
    ],
  },
  {
    type: "dropdown",
    name: "Simple Dropdown",
    icon: Star,
    children: [
      { name: "Option 1", href: "/?option1" },
      { name: "Option 2", href: "/?option2" },
    ],
    href: "/?options",
  },
  {
    type: "Options",
    name: "Options",
    href: "/?options",
    children: [
      { name: "Option 1", href: "/?option1" },
      { name: "Option 2", href: "/?option2" },
    ],
  },
];
