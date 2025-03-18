import {
  Home,
  Banknote,
  History,
  Send,
  BellRing,
  Settings,
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
    icon: BellRing,
    route: "/notifications",
    label: "notificationsRoute",
  },
  {
    icon: Settings,
    route: "/settings",
    label: "settingsRoute",
  },
];
