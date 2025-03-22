"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, DollarSign, Lock, CheckCheck, ArrowRight } from "lucide-react";

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

export function NotificationsDropdown() {
  // Sample notification data (simplified version of the full page)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "transaction",
      title: "Payment Processed",
      description: "Your payment of $125.00 was processed.",
      timestamp: "Just now",
      read: false,
      icon: <DollarSign className="h-4 w-4" />,
      iconColor: "text-green-600",
    },
    {
      id: 2,
      type: "security",
      title: "New Device Login",
      description: "Account accessed from a new device.",
      timestamp: "2 hours ago",
      read: false,
      icon: <Lock className="h-4 w-4" />,
      iconColor: "text-amber-600",
    },
    {
      id: 3,
      type: "account",
      title: "Direct Deposit Received",
      description: "You received a direct deposit of $3,250.00.",
      timestamp: "Yesterday",
      read: true,
      icon: <DollarSign className="h-4 w-4" />,
      iconColor: "text-green-600",
    },
  ]);

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
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
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start p-0"
                >
                  <Link
                    href="/notifications"
                    className="w-full px-2 py-2 hover:bg-muted/50"
                  >
                    <div className="flex gap-2">
                      <div className={`mt-0.5 ${notification.iconColor}`}>
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-xs ${
                              !notification.read
                                ? "font-semibold"
                                : "font-medium"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {notification.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {notification.description}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="ml-1 h-2 w-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </Link>
                  {notification.id !== notifications.length && <Separator />}
                </DropdownMenuItem>
              ))}
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
