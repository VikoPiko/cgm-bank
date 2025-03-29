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
    label: "Statements",
  },
  // {
  //   icon: History,
  //   route: "/transaction-history",
  //   label: "transactionHistory",
  // },
  // {
  //   icon: Send,
  //   route: "/payment-transfer",
  //   label: "transferFunds",
  // },
  {
    icon: Bell,
    route: "/notifications",
    label: "notificationsRoute",
  },
  {
    icon: Settings,
    route: "/settings",
    label: "settingsRoute",
  },
  {
    icon: MonitorCog,
    route: "/testing",
    label: "testingRoute",
  },
];
