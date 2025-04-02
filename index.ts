import {
  Home,
  Banknote,
  History,
  Send,
  BellRing,
  Settings,
  MonitorCog,
  Bell,
  Play,
  ClipboardList,
} from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
    route: "/dashboard",
    // Translateable key
    label: "home",
  },
  {
    icon: Banknote,
    route: "/my-banks",
    label: "myBanks",
  },
  {
    icon: ClipboardList,
    route: "/statements",
    label: "statements",
  },
  {
    icon: Bell,
    route: "/notifications",
    label: "notifications",
  },
  {
    icon: Settings,
    route: "/settings",
    label: "settingsRoute",
  },
];
