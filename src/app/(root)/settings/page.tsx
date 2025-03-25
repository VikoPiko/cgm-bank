"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Shield,
  User,
  Lock,
  Bell,
  Eye,
  EyeOff,
  ChevronRight,
  Globe,
  Moon,
  Sun,
  Smartphone,
  CreditCard,
  LogOut,
  ArrowLeft,
  Save,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { logout } from "@/lib/actions/actions";
import { useUser } from "@/components/custom/UserContext";
import { UserPreferences } from "@prisma/client";
import test from "node:test";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const testUser = useUser();

  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "bg", label: "Български" },
  ];

  const twofac = Boolean(preferences?.twoFactorEnabled) ? "True" : "False";

  useEffect(() => {
    console.log("ran");
    async function fetchPreferences() {
      if (testUser?.userId) {
        try {
          const res = await fetch("/api/prisma/users/preferences", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: testUser?.userId }),
          });

          if (res.ok) {
            const data = await res.json();
            setPreferences(data.preferences);
            console.log(data.preferences);
            toast.success("Preferences loaded.");
          } else {
            toast.error("Failed to load preferences");
          }
        } catch (error) {
          console.log("Error fetching preferences:", error);
          toast.error("Failed to load preferences");
        }
      }
    }

    fetchPreferences();
  }, [testUser]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/prisma/users/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      if (response.ok) {
        const updatedPreferences = await response.json();
        setPreferences(updatedPreferences);
        toast.success("Preferences updated successfully.");
      } else {
        toast.error("Failed to update preferences.");
      }
    } catch (error) {
      toast.error("Error updating user.");
    }
  };

  const handleSwitchToggle = (key: keyof UserPreferences, value: boolean) => {
    setPreferences((prevPreferences) => {
      if (prevPreferences) {
        return {
          ...prevPreferences,
          [key]: value,
        };
      }
      return prevPreferences;
    });
  };

  const handleSaveSettings = (section: string) => {
    setSaveLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSaveLoading(false);
      handleSubmit();
      toast.success(
        `Settings updated, Your ${section} settings have been saved successfully.`
      );
    }, 500);
  };

  if (!preferences) {
    return <div>Loading preferences....</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Settings Sidebar */}
            <Card className="h-fit">
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  {[
                    {
                      id: "profile",
                      label: "Profile",
                      icon: <User className="h-4 w-4" />,
                    },
                    {
                      id: "security",
                      label: "Security",
                      icon: <Lock className="h-4 w-4" />,
                    },
                    {
                      id: "notifications",
                      label: "Notifications",
                      icon: <Bell className="h-4 w-4" />,
                    },
                    {
                      id: "preferences",
                      label: "Preferences",
                      icon: <Globe className="h-4 w-4" />,
                    },
                    {
                      id: "devices",
                      label: "Devices & Cards",
                      icon: <Smartphone className="h-4 w-4" />,
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-muted ${
                        activeTab === item.id ? "bg-muted font-medium" : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                  <Separator />
                  <button
                    className="flex items-center gap-3 px-4 py-3 text-sm text-destructive transition-colors hover:bg-muted"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Settings Content */}
            <div className="space-y-6">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and profile settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src={testUser?.avatar}
                            alt={testUser?.firstName}
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          Change Photo
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              defaultValue={testUser?.firstName}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue={testUser?.email}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              defaultValue={testUser?.phoneNumber}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                              id="dob"
                              type="date"
                              defaultValue="1990-01-01"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Textarea
                            id="address"
                            defaultValue={testUser?.address1}
                            className="max-h-20"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={() => handleSaveSettings("profile")}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="current-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">
                            Two-Factor Authentication
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                            <p>
                              User: {twofac} : ID: {testUser?.userId}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={preferences?.twoFactorEnabled}
                          onCheckedChange={(checked) =>
                            handleSwitchToggle("twoFactorEnabled", checked)
                          }
                        />
                      </div>
                      {preferences?.twoFactorEnabled && (
                        <div className="rounded-md bg-muted p-4">
                          <div className="font-medium">
                            Two-factor authentication is enabled
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            You'll be asked for a verification code when you
                            sign in on a new device.
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button variant="outline" size="sm">
                              Setup Authenticator App
                            </Button>
                            <Button variant="outline" size="sm">
                              View Recovery Codes
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Login Notifications
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">
                            Email me when someone logs into my account
                          </div>
                          <div className="text-sm text-muted-foreground">
                            You'll receive an email notification when your
                            account is accessed from a new device or location
                          </div>
                        </div>
                        <Switch
                          checked={preferences?.loginNotifications}
                          onCheckedChange={(checked) =>
                            handleSwitchToggle("loginNotifications", checked)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={() => handleSaveSettings("security")}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="email">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="push">
                          Push Notifications
                        </TabsTrigger>
                        <TabsTrigger value="sms">SMS</TabsTrigger>
                      </TabsList>
                      <TabsContent value="email" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                Transaction Alerts
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Receive emails about your transactions,
                                deposits, and withdrawals
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.transactionAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("transactionAlerts", checked)
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Security Alerts</h3>
                              <p className="text-sm text-muted-foreground">
                                Receive emails about security events like
                                password changes and login attempts
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.securityAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("securityAlerts", checked)
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Balance Alerts</h3>
                              <p className="text-sm text-muted-foreground">
                                Receive emails when your account balance falls
                                below a threshold
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.balanceAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("balanceAlerts", checked)
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Marketing Emails</h3>
                              <p className="text-sm text-muted-foreground">
                                Receive emails about new features, promotions,
                                and offers
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.marketingEmails}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("marketingEmails", checked)
                              }
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="push" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                Transaction Notifications
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Receive push notifications for transactions in
                                real-time
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.transactionAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("transactionAlerts", checked)
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                Security Notifications
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Receive push notifications for security events
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.securityAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("securityAlerts", checked)
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                Promotional Notifications
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Receive push notifications about offers and
                                promotions
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.promotionalAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("promotionalAlerts", checked)
                              }
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="sms" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                Transaction SMS Alerts
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Receive SMS messages for transactions above a
                                certain amount
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.transactionAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("transactionAlerts", checked)
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                Security SMS Alerts
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Receive SMS messages for important security
                                events
                              </p>
                            </div>
                            <Switch
                              checked={preferences?.securityAlerts}
                              onCheckedChange={(checked) =>
                                handleSwitchToggle("securityAlerts", checked)
                              }
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={() => handleSaveSettings("notification")}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Preferences Settings */}
              {activeTab === "preferences" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Customize your app experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Language</h3>
                      <div className="space-y-2">
                        <Label htmlFor="language">
                          Select your preferred language
                        </Label>
                        <Select
                          defaultValue={i18n.language} // Set initial value to the current i18n language
                          onValueChange={(value) => i18n.changeLanguage(value)} // Change language dynamically
                        >
                          <SelectTrigger id="language">
                            <SelectValue
                              placeholder={t("language") || "Select language"}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Appearance</h3>
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <RadioGroup
                          value={theme} // Connect the current theme to the RadioGroup
                          onValueChange={setTheme} // Switch theme on selection change
                          className="grid grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="light"
                              id="light"
                              className="sr-only"
                            />
                            <Label
                              htmlFor="light"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                            >
                              <Sun className="mb-3 h-6 w-6" />
                              Light
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="dark"
                              id="dark"
                              className="sr-only"
                            />
                            <Label
                              htmlFor="dark"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                            >
                              <Moon className="mb-3 h-6 w-6" />
                              Dark
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="system"
                              id="system"
                              className="sr-only"
                            />
                            <Label
                              htmlFor="system"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                            >
                              <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full border-2">
                                <div className="h-2.5 w-5 rounded-full bg-foreground" />
                              </div>
                              System
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Date & Time Format
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select defaultValue="mm/dd/yyyy">
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm/dd/yyyy">
                                MM/DD/YYYY
                              </SelectItem>
                              <SelectItem value="dd/mm/yyyy">
                                DD/MM/YYYY
                              </SelectItem>
                              <SelectItem value="yyyy/mm/dd">
                                YYYY/MM/DD
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time-format">Time Format</Label>
                          <Select defaultValue="12h">
                            <SelectTrigger id="time-format">
                              <SelectValue placeholder="Select time format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12h">
                                12-hour (AM/PM)
                              </SelectItem>
                              <SelectItem value="24h">24-hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={() => handleSaveSettings("preferences")}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Devices & Cards Settings */}
              {activeTab === "devices" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Devices & Cards</CardTitle>
                    <CardDescription>
                      Manage your connected devices and payment cards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Connected Devices</h3>
                      <div className="space-y-3">
                        {[
                          {
                            device: "iPhone 13 Pro",
                            location: "New York, USA",
                            lastActive: "Active now",
                            current: true,
                          },
                          {
                            device: "MacBook Pro",
                            location: "New York, USA",
                            lastActive: "Last active 2 hours ago",
                            current: false,
                          },
                          {
                            device: "Windows PC",
                            location: "Chicago, USA",
                            lastActive: "Last active 3 days ago",
                            current: false,
                          },
                        ].map((device, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Smartphone className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  {device.device}
                                  {device.current && (
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {device.location} • {device.lastActive}
                                </div>
                              </div>
                            </div>
                            {!device.current && (
                              <Button variant="outline" size="sm">
                                Sign Out
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Payment Cards</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Card
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {[
                          {
                            type: "Visa",
                            name: "Personal Credit Card",
                            number: "**** **** **** 4587",
                            expiry: "05/25",
                            primary: true,
                          },
                          {
                            type: "Mastercard",
                            name: "Business Credit Card",
                            number: "**** **** **** 7621",
                            expiry: "09/26",
                            primary: false,
                          },
                        ].map((card, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  {card.name}
                                  {card.primary && (
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                      Primary
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {card.type} {card.number} • Expires{" "}
                                  {card.expiry}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!card.primary && (
                                <Button variant="outline" size="sm">
                                  Set as Primary
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={() => handleSaveSettings("devices")}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
