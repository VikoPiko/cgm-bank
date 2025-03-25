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
} from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
    route: "/dashboard",
    // Translateable key
    label: "home",
  },
  {
    icon: Play,
    route: "/actions",
    label: "Actions",
  },
  {
    icon: Banknote,
    route: "/my-banks",
    label: "myBanks",
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
