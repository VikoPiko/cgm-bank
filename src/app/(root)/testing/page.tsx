"use client";
import { useState, useEffect } from "react";
import type { Accounts, Banks } from "@prisma/client";
import { useUser } from "@/components/custom/UserContext";
import { toast } from "sonner";
import StatCards from "@/components/Dashboard/StatCards";
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  BarChart3,
  PiggyBank,
  Clock,
} from "lucide-react";

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

const AccountSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg dark:border-stone-700 animate-pulse">
      <div className="h-5 w-32 bg-stone-200 dark:bg-stone-700 rounded mb-3"></div>
      <div className="h-7 w-24 bg-stone-200 dark:bg-stone-700 rounded mb-2"></div>
      <div className="h-4 w-40 bg-stone-200 dark:bg-stone-700 rounded"></div>
    </div>
  );
};

const AccountCard = ({ account }: { account: PlaidAccount }) => {
  return (
    <div className="p-4 border rounded-lg dark:border-stone-700 hover:shadow-md transition-shadow">
      <h3 className="text-sm text-stone-500 dark:text-stone-300 mb-1">
        {account.name}
      </h3>
      <p className="text-xl font-semibold mb-1">
        ${account.balances.available.toFixed(2)}
      </p>
      <p className="text-xs text-stone-500 dark:text-stone-400">
        Current: ${account.balances.current.toFixed(2)}{" "}
        {account.balances.iso_currency_code}
      </p>
    </div>
  );
};

const RecentActivity = () => {
  return (
    <div className="border rounded-lg dark:border-stone-700 overflow-hidden">
      <div className="p-4 border-b dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
        <h2 className="font-medium">Recent Activity</h2>
      </div>
      <div className="divide-y dark:divide-stone-700">
        {[
          {
            name: "Netflix Subscription",
            amount: -13.99,
            date: "Today",
            icon: <CreditCard className="text-blue-500" />,
          },
          {
            name: "Salary Deposit",
            amount: 2750.0,
            date: "Yesterday",
            icon: <DollarSign className="text-green-500" />,
          },
          {
            name: "Grocery Store",
            amount: -64.37,
            date: "Mar 22",
            icon: <CreditCard className="text-blue-500" />,
          },
          {
            name: "Transfer to Savings",
            amount: -500.0,
            date: "Mar 20",
            icon: <PiggyBank className="text-purple-500" />,
          },
        ].map((transaction, i) => (
          <div
            key={i}
            className="p-3 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                {transaction.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.name}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {transaction.date}
                </p>
              </div>
            </div>
            <p
              className={`font-medium ${
                transaction.amount > 0 ? "text-green-600" : ""
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [account, setAccount] = useState<Accounts[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState<Banks[] | null>(null);
  const [plaidBanks, setPlaidBanks] = useState<PlaidData[] | null>(null);
  const user = useUser();

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
            Welcome back{user ? `, ${user.firstName || "User"}` : ""}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-12 gap-4 mb-8">
          {loading ? (
            <>
              <div className="col-span-12 md:col-span-4">
                <div className="h-[140px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="h-[140px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="h-[140px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
              </div>
            </>
          ) : (
            <StatCards />
          )}
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
                    <div className="p-4 border rounded-lg dark:border-stone-700 hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
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
                { name: "Transfer", icon: <ArrowUpRight /> },
                { name: "Pay Bills", icon: <DollarSign /> },
                { name: "Insights", icon: <BarChart3 /> },
                { name: "History", icon: <Clock /> },
              ].map((action, i) => (
                <button
                  key={i}
                  className="p-4 border rounded-lg dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 flex flex-col items-center justify-center gap-2 transition-colors"
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
}
