"use client";
import { ModeToggle } from "@/components/custom/mode-toggle";
import Upload from "@/components/custom/UploadThing";
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/lib/actions/actions";
import type { User } from "@prisma/client";
import { Edit, LogOut, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/prisma/users/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as User);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/prisma/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
        toast.success("Profile updated successfully.");
      } else {
        console.error("Failed to update profile.");
        toast.success("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
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

  if (!user) {
    return (
      <div className="container mx-auto max-w-3xl py-10">
        <Card className="text-center p-8">
          <CardTitle className="text-xl mb-4">User Not Found</CardTitle>
          <CardDescription>
            We couldn't find your user profile. Please try logging in again.
          </CardDescription>
          <CardFooter className="justify-center mt-6">
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-200/30 to-blue-300/25 h-32 relative">
          <div className="absolute -bottom-16 left-6">
            {user?.avatar ? (
              <Image
                src={user.avatar || "/placeholder.svg"}
                width={130}
                height={130}
                alt={`${user.firstName}'s profile`}
                className="rounded-full border-4 border-background h-32 w-32 object-cover"
              />
            ) : (
              <div className="rounded-full bg-muted h-32 w-32 flex items-center justify-center border-4 border-background">
                <span className="text-4xl font-semibold text-muted-foreground">
                  {user.firstName?.charAt(0) || ""}
                  {user.lastName?.charAt(0) || ""}
                </span>
              </div>
            )}
          </div>
        </div>

        <CardHeader className="pt-20">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {user?.firstName} {user?.middleName} {user?.lastName}
              </CardTitle>
              <CardDescription className="flex items-center mt-1">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {user?.role}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  ID: {user?.userId}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="my-4" />

          {editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData?.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData?.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData?.middleName || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData?.email || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData?.city || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address1">Address</Label>
                <Input
                  id="address1"
                  name="address1"
                  value={formData?.address1 || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData?.dateOfBirth || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Email
                </h3>
                <p className="mt-1">{user?.email || "Not provided"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  City
                </h3>
                <p className="mt-1">{user?.city || "Not provided"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Address
                </h3>
                <p className="mt-1">{user?.address1 || "Not provided"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Date of Birth
                </h3>
                <p className="mt-1">{user?.dateOfBirth || "Not provided"}</p>
              </div>
            </div>
          )}

          {editMode && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Profile Picture</h3>
              <Upload />
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-muted/10 px-6 py-4">
          <div>
            {editMode ? (
              <div className="flex gap-2">
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  className="gap-1"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditMode(false)}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setEditMode(true)}
                className="gap-1"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>

          <Button variant="destructive" onClick={logout} className="gap-1">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
