"use client";
import { Role } from "@prisma/client";
import { createContext, useContext, useState, useEffect } from "react";

// UserContext.tsx (or wherever you define the context)
export type MinimalUser = {
  role: Role;
  userId: string;
  email: string;
  address1: string;
  firstName: string;
  lastName: string;
  middleName: string;
  city: string;
  phoneNumber: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  country: string;
  avatar: string;
};

interface UserContextType {
  user: MinimalUser | null;
  refreshUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MinimalUser | null>(null);

  const fetchUser = async () => {
    const response = await fetch("/api/prisma/users/me");
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Example of how your useUser hook should return a full user
export function useUser() {
  const [user, setUser] = useState<MinimalUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/prisma/users/me");
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  return user;
}
