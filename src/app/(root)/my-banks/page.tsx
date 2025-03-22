"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Shield,
  Plus,
  ExternalLink,
  MoreHorizontal,
  AlertTriangle,
  Trash2,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define types for our data structure
interface BankAccount {
  id: string;
  name: string;
  type: string;
  number: string;
  balance: number;
  currency: string;
}

interface Bank {
  id: string;
  name: string;
  logo: string;
  status: string;
  lastUpdated: string;
  statusMessage?: string;
  accounts: BankAccount[];
}

// Mock data for banks - in a real app, this would come from your API
const mockBanks: Bank[] = [
  {
    id: "bank-1",
    name: "Chase Bank",
    logo: "/chase.svg",
    status: "connected",
    lastUpdated: "Today at 10:30 AM",
    accounts: [
      {
        id: "acc-1",
        name: "Checking Account",
        type: "checking",
        number: "****4567",
        balance: 2458.2,
        currency: "USD",
      },
      {
        id: "acc-2",
        name: "Savings Account",
        type: "savings",
        number: "****7890",
        balance: 12750.0,
        currency: "USD",
      },
    ],
  },
  {
    id: "bank-2",
    name: "Bank of America",
    logo: "/bankofamerica.svg",
    status: "connected",
    lastUpdated: "Yesterday at 3:15 PM",
    accounts: [
      {
        id: "acc-3",
        name: "Premium Checking",
        type: "checking",
        number: "****1234",
        balance: 3642.75,
        currency: "USD",
      },
      {
        id: "acc-4",
        name: "Credit Card",
        type: "credit",
        number: "****5678",
        balance: -1245.3,
        currency: "USD",
      },
    ],
  },
  {
    id: "bank-3",
    name: "Wells Fargo",
    logo: "/wells-fargo.svg",
    status: "issue",
    lastUpdated: "3 days ago",
    statusMessage: "Reconnection required",
    accounts: [
      {
        id: "acc-5",
        name: "Everyday Checking",
        type: "checking",
        number: "****9012",
        balance: 1875.42,
        currency: "USD",
      },
    ],
  },
];

export default function MyBanks() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("user-123"); // In a real app, get this from auth

  useEffect(() => {
    // Simulate API call to fetch banks
    const fetchBanks = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/banks')
        // const data = await response.json()

        // Using mock data for demonstration
        setTimeout(() => {
          setBanks(mockBanks);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching banks:", error);
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const disconnectBank = (bankId: string) => {
    // In a real app, this would call an API to disconnect the bank
    console.log(`Disconnecting bank: ${bankId}`);
    setBanks(banks.filter((bank) => bank.id !== bankId));
  };

  const refreshBankConnection = (bankId: string) => {
    // In a real app, this would trigger a reconnection flow
    console.log(`Refreshing connection for bank: ${bankId}`);
    // Simulate success
    setBanks(
      banks.map((bank) =>
        bank.id === bankId
          ? {
              ...bank,
              status: "connected",
              statusMessage: undefined,
              lastUpdated: "Just now",
            }
          : bank
      )
    );
  };

  const getTotalBalance = (accounts: BankAccount[]) => {
    return accounts.reduce((total, account) => {
      // For credit accounts, we don't add to the total balance
      if (account.type === "credit") return total;
      return total + account.balance;
    }, 0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">My Banks</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Bank</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a New Bank</DialogTitle>
                    <DialogDescription>
                      Connect a new bank account to manage all your finances in
                      one place.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      We use Plaid to securely connect your bank accounts. Your
                      credentials are never stored on our servers.
                    </p>
                    <Button className="w-full">Connect with Plaid</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-muted-foreground">
              Manage your connected bank accounts and view your balances
            </p>
          </div>

          {loading ? (
            // Loading state
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-8 w-32" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : banks.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Shield className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No banks connected</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Connect your bank accounts to see all your finances in one place
                and get personalized insights.
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Your First Bank</span>
              </Button>
            </div>
          ) : (
            // Banks list
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {banks.map((bank) => (
                <Card
                  key={bank.id}
                  className={
                    bank.status === "issue"
                      ? "border-amber-300 dark:border-amber-500"
                      : ""
                  }
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          <Image
                            src={bank.logo || "/chase.svg"}
                            alt={bank.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {bank.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Last updated: {bank.lastUpdated}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Bank Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          {bank.status === "issue" && (
                            <DropdownMenuItem
                              onClick={() => refreshBankConnection(bank.id)}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Refresh Connection</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => disconnectBank(bank.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Disconnect Bank</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {bank.status === "issue" && (
                      <div className="mt-2 flex items-center gap-2 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-md">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs">{bank.statusMessage}</span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <div className="mt-2 space-y-3">
                      {bank.accounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div>
                            <div className="font-medium text-sm">
                              {account.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {account.number}
                            </div>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              account.type === "credit"
                                ? "text-destructive"
                                : ""
                            }`}
                          >
                            {formatCurrency(account.balance, account.currency)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Balance</span>
                      <span className="text-lg font-bold">
                        {formatCurrency(getTotalBalance(bank.accounts))}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>View All Accounts</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">SecureBank</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2023 SecureBank. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
