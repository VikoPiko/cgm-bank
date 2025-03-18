"use client";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logout } from "@/lib/actions/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/prisma/users/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <h1>Unable to find user</h1>;
  }

  return (
    <div className="m-5">
      <ModeToggle />
      <Card>
        <CardHeader>
          <CardTitle>
            Name: {user?.firstName} {user?.middleName} {user?.lastName} |
            userId: {user?.userId}
          </CardTitle>
          <CardDescription>{user?.role}</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.avatar && (
            <Image
              src={user.avatar}
              width={100}
              height={100}
              alt="User"
              className="rounded-lg"
            />
          )}
          <div className="mt-2">
            <p>City: {user?.city}</p>
            <p>Address: {user?.address1}</p>
            <p>Date of birth: {user?.dateOfBirth}</p>
            <p>Email: {user?.email}</p>
          </div>
        </CardContent>
        <CardFooter className="gap-4">
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
