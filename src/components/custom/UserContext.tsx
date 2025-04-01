"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  Accounts,
  Banks,
  Notifications,
  Role,
  Transactions,
  UserPreferences,
} from "@prisma/client";

// MinimalUser type definition
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
  accounts?: Accounts[];
  banks?: Banks[];
  preferences?: UserPreferences;
  notifications?: Notifications[];
  transactions?: Transactions[];
};

export type PlaidType = {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: number | null;
  };
  mask: string;
  name: string;
  official_name: string;
  persistent_account_id: string;
  subtype: string;
  type: string;
};

interface UserContextType {
  user: MinimalUser | null;
  plaidData: PlaidType[] | null;
  refreshUser: () => void;
  getTransactions: () => Transactions[] | [];
  getPreferences: () => UserPreferences | undefined;
  getNotifications: () => Notifications[] | [];
  getAccounts: () => Accounts[] | undefined;
  getBanks: () => Banks[] | undefined;
  getPlaidBanks: () => PlaidType[] | undefined;
}

// Create UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MinimalUser | null>(null);
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>();
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [plaidData, setPlaidData] = useState<PlaidType[]>([]);

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await fetch("/api/testcall");
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setTransactions(data.userData.transactions);
        setPreferences(data.userData.preferences);
        setNotifications(data.userData.notifications);
        setPlaidData(data.plaidBalances || []);
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getTransactions = () => transactions;
  const getAccounts = () => user?.accounts;
  const getPreferences = () => preferences;
  const getNotifications = () => notifications;
  const getBanks = () => user?.banks;
  const getPlaidBanks = () => (plaidData.length ? plaidData : []);

  return (
    <UserContext.Provider
      value={{
        user,
        plaidData,
        refreshUser: fetchUser,
        getTransactions,
        getNotifications,
        getPreferences,
        getAccounts,
        getBanks,
        getPlaidBanks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to access user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
