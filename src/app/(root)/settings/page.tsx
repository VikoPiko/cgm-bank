"use client";
import { useEffect, useState } from "react";
import {
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
  Save,
  Plus,
  Info,
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
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { logout } from "@/lib/actions/actions";
import { MinimalUser, useUser } from "@/components/custom/UserContext";
import { UserPreferences } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import Upload from "@/components/custom/UploadThing";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const { user, getPreferences, refreshUser } = useUser();
  const [userData, setUser] = useState<MinimalUser | null>(null);
  const [formData, setFormData] = useState<Partial<MinimalUser> | null>(null);

  const [object, setObject] = useState<UserPreferences>();

  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "bg", label: "Български" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const pref = getPreferences();
      if (user) {
        setFormData(user);
        setUser(user);
        setObject(pref);
      }
    };
    fetchData();
  }, [user]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/prisma/users/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });
      if (response.ok) {
        const updatedPreferences = await response.json();
        setObject(updatedPreferences);
        toast.success("Preferences updated successfully.");
      } else {
        toast.error("Failed to update preferences.");
      }
    } catch (error) {
      toast.error("Error updating user.");
    }
  };

  const handleSwitchToggle = (key: keyof UserPreferences, value: boolean) => {
    setObject((prevPreferences) => {
      if (prevPreferences) {
        return {
          ...prevPreferences,
          [key]: value,
        };
      }
      return prevPreferences;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileSumbit = async () => {
    try {
      const {
        accounts,
        banks,
        notifications,
        transactions,
        preferences,
        ...filteredFormData
      } = formData || {};

      const response = await fetch("/api/prisma/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredFormData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        refreshUser();
        toast.success("Profile updated successfully.");
      } else {
        console.error("Failed to update profile.");
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getEventType = (section: string) => {
    const normalizedSection = section.toLowerCase();

    if (
      normalizedSection === "profile" ||
      normalizedSection === "preferences"
    ) {
      return "Account";
    }
    if (normalizedSection === "security" || normalizedSection === "devices") {
      return "Security";
    }
    return "General";
  };

  const handleSaveSettings = async (section: string) => {
    setSaveLoading(true);

    const notificationData = {
      userId: user?.userId,
      // type: getEventType(section),
      type: section,
      event: `${capitalizeFirstLetter(section)} Changed.`,
      message: `Settings updated, Your ${capitalizeFirstLetter(
        section
      )} settings have been saved successfully.`,
      icon: "Info",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    };

    const newNotif = await fetch(
      "/api/prisma/notifications/add-notifications",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationData),
      }
    );

    toast.success(`TYPE: ${getEventType(section)}`);
    setTimeout(() => {
      setSaveLoading(false);
      if (activeTab === "Security" || activeTab === "Notifications") {
        handleSubmit();
      }
      if (activeTab === "Profile") {
        handleProfileSumbit();
      }
      toast.success(
        `Settings updated, Your ${section} settings have been saved successfully.`
      );
    }, 500);
  };

  if (!object) {
    return <div>Loading Settings....</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-3xl py-10">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </Card>
      </div>
    );
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
                      id: "Profile",
                      label: "Profile",
                      icon: <User className="h-4 w-4" />,
                    },
                    {
                      id: "Security",
                      label: "Security",
                      icon: <Lock className="h-4 w-4" />,
                    },
                    {
                      id: "Notifications",
                      label: "Notifications",
                      icon: <Bell className="h-4 w-4" />,
                    },
                    {
                      id: "Preferences",
                      label: "Preferences",
                      icon: <Globe className="h-4 w-4" />,
                    },
                    {
                      id: "Devices",
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
              {activeTab === "Profile" && (
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
                            src={user?.avatar}
                            alt={user?.firstName}
                          />
                          <AvatarFallback>
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <Upload />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              defaultValue={formData?.firstName}
                              name="firstName"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue={formData?.email}
                              name="email"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              defaultValue={formData?.phoneNumber}
                              name="phoneNumber"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                              id="dob"
                              type="date"
                              defaultValue={formData?.dateOfBirth}
                              name="dateOfBirth"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Textarea
                            id="address"
                            defaultValue={formData?.address1}
                            name="address1"
                            onChange={handleInputChange}
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
              {activeTab === "Security" && (
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
                          </div>
                        </div>
                        <Switch
                          checked={object.twoFactorEnabled}
                          onCheckedChange={(checked) =>
                            handleSwitchToggle("twoFactorEnabled", checked)
                          }
                        />
                      </div>
                      {object?.twoFactorEnabled && (
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
                          checked={object?.loginNotifications}
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
              {activeTab === "Notifications" && (
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
                              checked={object?.transactionAlerts}
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
                              checked={object?.securityAlerts}
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
                              checked={object?.balanceAlerts}
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
                              checked={object?.marketingEmails}
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
                              checked={object?.transactionAlerts}
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
                              checked={object?.securityAlerts}
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
                              checked={object?.promotionalAlerts}
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
                              checked={object?.transactionAlerts}
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
                              checked={object?.securityAlerts}
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
              {activeTab === "Preferences" && (
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
              {activeTab === "Devices" && (
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
