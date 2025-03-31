"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  DollarSign,
  Lock,
  CheckCheck,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notifications } from "@prisma/client";
import { useUser } from "./UserContext";
import RelativeTime from "./RelativeTime";
import moment from "moment";
import * as Icons from "lucide-react";
import { toast } from "sonner";
const LucideIcons = Icons as unknown as Record<string, LucideIcon>;

export function NotificationsDropdown() {
  const { user, getNotifications } = useUser();
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  useEffect(() => {
    if (user) {
      const fetchNotifs = async () => {
        const notifs = await getNotifications();
        setNotifications(notifs);
      };
      fetchNotifs();
    }
  }, [user]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/prisma/notifications/update-all", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: notifications.map((notification) => notification.id),
          isRead: true,
        }),
      });

      if (response.ok) {
        toast.success("All notifications marked as read.");
      } else {
        toast.error("Failed to mark notifications as read.");
      }

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto text-xs"
              onClick={markAllAsRead}
            >
              <CheckCheck className="mr-1 h-3 w-3" />
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <DropdownMenuGroup>
              {notifications.map((notification) => {
                const IconComponent = LucideIcons[notification.icon];
                const createdAt = new Date(notification.createdAt);
                const daysDifference = moment().diff(createdAt, "days");

                return (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start p-0"
                  >
                    <Link
                      href="/notifications"
                      className="w-full px-2 py-2 hover:bg-muted/50"
                    >
                      <div className="flex gap-2">
                        <div
                          className={`flex-shrink-0 rounded-full p-2 ${notification.iconBg}`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${notification.iconColor}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-xs ${
                                !notification.isRead
                                  ? "font-semibold"
                                  : "font-medium"
                              }`}
                            >
                              {notification.event}
                            </p>
                            <span className="text-[10px] text-muted-foreground">
                              {daysDifference <= 7 ? (
                                <RelativeTime
                                  timestamp={notification.createdAt}
                                />
                              ) : (
                                new Date(
                                  notification.createdAt
                                ).toLocaleDateString()
                              )}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="ml-1 h-2 w-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                    </Link>
                    {notifications.length <= 4 && <Separator />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/notifications" className="flex justify-center">
            <span className="text-xs text-primary">View all notifications</span>
            <ArrowRight className="ml-1 h-3 w-3 text-primary" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
