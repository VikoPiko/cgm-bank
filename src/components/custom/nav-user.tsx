"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { User } from "@prisma/client";
import Link from "next/link";
import { MinimalUser } from "./UserContext";
import { UpgradeProDialog } from "./upgrade-pro-dialog";
import { useState } from "react";
import { logout } from "@/lib/actions/actions";

export function NavUser({ user }: { user: MinimalUser }) {
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const { isMobile } = useSidebar();
  const { t } = useTranslation();

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("/api/prisma/users/logout", {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       console.log(t("logoutSuccess"));
  //       window.location.reload();
  //     } else {
  //       console.error(t("logoutFailure"));
  //     }
  //   } catch (error) {
  //     console.error(t("logoutError"), error);
  //   }
  // };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.avatar || "/default-avatar.jpg"}
                    alt={user?.firstName}
                  />
                  <AvatarFallback className="rounded-lg">CGM</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.firstName}
                  </span>
                  <span className="truncate text-xs font-thin dark:text-stone-300 text-stone-600">
                    {user?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.avatar || "/default-avatar.jpg"}
                      alt={user?.firstName}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.firstName}
                    </span>
                    <span className="truncate text-xs dark:text-stone-400 text-stone-500">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setUpgradeDialogOpen(true)}>
                  <Sparkles className="text-blue-600 dark:text-blue-400" />
                  {t("upgradeToPro")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/account">
                  <DropdownMenuItem>
                    <BadgeCheck className="text-blue-600 dark:text-blue-400" />
                    {t("account")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <CreditCard className="text-blue-600 dark:text-blue-400" />
                  {t("billing")}
                </DropdownMenuItem>
                <Link href={"/notifications"}>
                  <DropdownMenuItem>
                    <Bell className="text-blue-600 dark:text-blue-400" />
                    {t("notifications")}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="text-blue-600 dark:text-blue-400" />
                {t("logoutButton")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <UpgradeProDialog
        open={upgradeDialogOpen}
        onOpenChange={setUpgradeDialogOpen}
      />
    </>
  );
}
