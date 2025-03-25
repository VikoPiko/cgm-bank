"use client";
import { useState, useEffect } from "react";
import { type Accounts, type Banks } from "@prisma/client";
import { useUser } from "@/components/custom/UserContext";
import { toast } from "sonner";
import { DollarSign, ArrowUpRight, BarChart3, Clock } from "lucide-react";
import { AccountSkeleton } from "@/components/custom/account-skeleton";
import { RecentActivity } from "@/components/custom/recent-activity";
import { AccountCard } from "@/components/custom/account-card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PlaidBalance {
  available: number;
  current: number;
  iso_currency_code: string;
}

interface PlaidAccount {
  account_id: string;
  name: string;
  balances: PlaidBalance;
}

interface PlaidData {
  accounts: PlaidAccount[];
}

const Accounts = () => {
  const [account, setAccount] = useState<Accounts[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState<Banks[] | null>(null);
  const [plaidBanks, setPlaidBanks] = useState<PlaidData[] | null>(null);
  const [open, setOpen] = useState(false);
  const user = useUser();

  const [amount, setAmount] = useState(0.0);
  const [routingNumber, setRoutingNumber] = useState("");

  const handleTransfer = () => {
    // console.log("Amount:", amount, "Routing Number:", routingNumber);
    toast.success(`Successfully sent $${amount} to Account: ${routingNumber}.`);
    setOpen(false); // Close dialog after transfer
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/prisma/accounts/get-account");
        if (response.ok) {
          const data = await response.json();
          setAccount(data);
        } else {
          console.error("Error: ", response.statusText);
          toast.error("Failed to load account data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load account data");
      }
    };

    const fetchBanks = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/prisma/banks/get-banks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.userId }),
        });

        if (res.ok) {
          const banks = await res.json();
          setBanks(banks);

          // Fetch plaid data for all linked Plaid accounts
          const plaidDataPromises = banks.map(async (bank: Banks) => {
            if (bank.accessToken) {
              const plaidResponse = await fetch("/api/plaid/get-balances", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken: bank.accessToken }),
              });

              if (plaidResponse.ok) {
                return await plaidResponse.json();
              }
            }
            return null;
          });

          // Wait for all Plaid data to be fetched
          const allPlaidData = await Promise.all(plaidDataPromises);
          const validPlaidData = allPlaidData.filter((data) => data != null);
          setPlaidBanks(validPlaidData);
        } else {
          console.error("Error fetching banks", res.statusText);
          toast.error("Failed to load bank data");
        }
      } catch (error) {
        console.log("Error fetching banks", error);
        toast.error("Failed to load bank data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchBanks();
  }, [user]);

  // Calculate balances
  const localBalance = account?.[0]?.availableBalance || 0;
  const plaidBalance =
    plaidBanks?.reduce(
      (total, plaidData) =>
        total +
        plaidData.accounts.reduce(
          (accTotal, plaidAccount) =>
            accTotal + plaidAccount.balances.available,
          0
        ),
      0
    ) || 0;

  const totalBalance = localBalance + plaidBalance;

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 dark:text-white">
            Financial Dashboard
          </h1>
          <p className="text-stone-500 dark:text-stone-400">
            Welcome back{" "}
            <span className="text-white">
              {user ? `, ${user.firstName || "User"}` : ""}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Connected Accounts */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                Connected Accounts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  <>
                    <AccountSkeleton />
                    <AccountSkeleton />
                    <AccountSkeleton />
                    <AccountSkeleton />
                  </>
                ) : (
                  <>
                    {/* Local Account */}
                    <div className="p-4 border rounded-lg dark:border-stone-700 hover:shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:translate-y-[-5px]  duration-200 transition-all hover:dark:from-blue-900/40 hover:dark:to-indigo-900/40">
                      <h3 className="text-sm text-stone-500 dark:text-stone-300 mb-1">
                        My Account
                      </h3>
                      <p className="text-xl font-semibold mb-1">
                        ${localBalance.toFixed(2)}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Primary Account
                      </p>
                    </div>

                    {/* Plaid Accounts */}
                    {plaidBanks?.map((plaidData, index) =>
                      plaidData.accounts?.map((plaidAccount, accountIndex) => (
                        <AccountCard
                          key={`${index}-${accountIndex}`}
                          account={plaidAccount}
                        />
                      ))
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                Recent Activity
              </h2>
              {loading ? (
                <div className="h-[300px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
              ) : (
                <RecentActivity />
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-medium mb-4 dark:text-white">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                {
                  name: "Transfer",
                  icon: <ArrowUpRight />,
                  action: () => setOpen(true),
                },
                { name: "Pay Bills", icon: <DollarSign /> },
                { name: "Insights", icon: <BarChart3 /> },
                { name: "History", icon: <Clock /> },
              ].map((action, i) => (
                <button
                  key={i}
                  className="p-4 border rounded-lg dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 flex flex-col items-center justify-center gap-2 transition-colors duration-0"
                  onClick={action.action}
                >
                  <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium dark:text-white">
                    {action.name}
                  </span>
                </button>
              ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Transfer Money</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-white">
                      Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-white">
                      Routing Number
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter routing number"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleTransfer}>Transfer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <h2 className="text-lg font-medium mb-4 dark:text-white">
              Spending Breakdown
            </h2>
            {loading ? (
              <div className="h-[300px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
            ) : (
              <div className="border rounded-lg dark:border-stone-700 p-4">
                <div className="space-y-4">
                  {[
                    {
                      category: "Food & Dining",
                      amount: 420.5,
                      percentage: 35,
                    },
                    {
                      category: "Transportation",
                      amount: 180.25,
                      percentage: 15,
                    },
                    {
                      category: "Entertainment",
                      amount: 240.3,
                      percentage: 20,
                    },
                    { category: "Shopping", amount: 360.45, percentage: 30 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="dark:text-white">{item.category}</span>
                        <span className="font-medium dark:text-white">
                          ${item.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
