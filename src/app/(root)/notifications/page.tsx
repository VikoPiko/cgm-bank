"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Bell,
  ArrowLeft,
  Check,
  Lock,
  AlertTriangle,
  Info,
  DollarSign,
  Gift,
  Filter,
  CheckCheck,
  Trash2,
} from "lucide-react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/components/custom/UserContext";
import { Notifications } from "@prisma/client";
import { toast } from "sonner";
import RelativeTime from "@/components/custom/RelativeTime";
import { icons } from "lucide-react";
import moment from "moment";

const LucideIcons = Icons as unknown as Record<string, LucideIcon>;

export default function NotificationsPage() {
  // Sample notification data
  // useEffect(() => {
  //   if (user) {
  //     const notif = getNotifications() || [];
  //     setNotifs(notif);
  //   }
  // }, [user]);
  const { user, getNotifications } = useUser();
  const [notifs, setNotifs] = useState<Notifications[]>([]);

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource("/api/server-events/updates");

      const notification = getNotifications();
      setNotifs(notification);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setNotifs(data.notifications || []);
      };

      eventSource.onerror = () => {
        console.error("SSE connection lost");
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [user]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(
        "/api/prisma/notifications/update-notification",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: notificationId, isRead: true }),
        }
      );
      if (response.ok) {
        toast.success("Notification read.");
      } else {
        toast.error("Failed to read");
      }

      setNotifs((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Filter notifications based on active tab and unread filter
  const filteredNotifications = notifs.filter((notification) => {
    if (showUnreadOnly && notification.isRead) return false;
    if (activeTab === "all") return true;
    return notification.type === activeTab;
  });

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifs(
      notifs.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifs(
      notifs.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifs([]);
  };

  // Count unread notifications
  const unreadCount = notifs.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="unread-only"
                    checked={showUnreadOnly}
                    onCheckedChange={setShowUnreadOnly}
                  />
                  <label htmlFor="unread-only" className="text-sm font-medium">
                    Unread only
                  </label>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={markAllAsRead} className="gap-2">
                      <CheckCheck className="h-4 w-4" />
                      <span>Mark all as read</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={clearAllNotifications}
                      className="gap-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Clear all notifications</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="transaction">Transactions</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="promotion">Promotions</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              <Card>
                <CardContent className="p-0">
                  {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No notifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {showUnreadOnly
                          ? "You have no unread notifications."
                          : "You don't have any notifications yet."}
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y">
                      {filteredNotifications.map((notification) => {
                        const IconComponent = LucideIcons[notification.icon]; // Access dynamically
                        const createdAt = new Date(notification.createdAt);
                        const daysDifference = moment().diff(createdAt, "days");

                        return (
                          <li
                            key={notification.id}
                            className={`p-4 hover:bg-muted/50 transition-colors ${
                              !notification.isRead ? "bg-muted/30" : ""
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`flex-shrink-0 rounded-full p-2 ${notification.iconBg}`}
                              >
                                {IconComponent ? (
                                  <IconComponent
                                    className={`h-5 w-5 ${notification.iconColor}`}
                                  />
                                ) : (
                                  <Icons.AlertTriangle className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p
                                    className={`text-sm font-medium ${
                                      !notification.isRead
                                        ? "font-semibold"
                                        : ""
                                    }`}
                                  >
                                    {notification.event}
                                  </p>
                                  {/* <span className="text-xs text-muted-foreground">
                                    {new Date(
                                      notification.createdAt
                                    ).toLocaleDateString()}
                                  </span> */}
                                  <span className="text-xs text-muted-foreground">
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
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                              </div>
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex-shrink-0"
                                  onClick={() =>
                                    handleMarkAsRead(notification.id)
                                  }
                                >
                                  <Icons.Check className="h-4 w-4" />
                                  <span className="sr-only">Mark as read</span>
                                </Button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">
              Notification Preferences
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Transaction Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about deposits, withdrawals, and large
                        transactions
                      </p>
                    </div>
                    <Switch defaultChecked id="transaction-alerts" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Security Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about login attempts, password changes, and
                        suspicious activity
                      </p>
                    </div>
                    <Switch defaultChecked id="security-alerts" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Account Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about statements, balance thresholds, and
                        account changes
                      </p>
                    </div>
                    <Switch defaultChecked id="account-updates" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions & Offers</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new products, rewards, and special
                        offers
                      </p>
                    </div>
                    <Switch id="promotions" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-muted-foreground">
                    You can also manage notification delivery methods in your{" "}
                    <Link href="#" className="text-primary hover:underline">
                      account settings
                    </Link>
                    .
                  </div>
                  <Button size="sm">Save Preferences</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// import RelativeTime from "@/components/custom/RelativeTime";
// import React from "react";

// const Notifications = () => {
//   const eventTimestamp = "2025-02-19T01:00:00"; // Replace with an actual timestamp
//   return (
//     <div>
//       <h1>Event occurred</h1>
//       <p>
//         Event happened <RelativeTime timestamp={eventTimestamp} />
//       </p>
//     </div>
//   );
// };

// export default Notifications;
