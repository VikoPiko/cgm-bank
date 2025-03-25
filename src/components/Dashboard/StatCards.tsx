"use client";
import { PlaidData } from "@/lib/utils";
import { Accounts, Banks } from "@prisma/client";
import { useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useUser } from "../custom/UserContext";

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-12 md:col-span-4 p-4 rounded border border-stone-300 dark:bg-[#242424] dark:text-white">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-xs sm:text-sm dark:text-white">
            {title}
          </h3>
          <p className="text-2xl sm:text-3xl font-semibold">${value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500 dark:text-stone-300">{period}</p>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="col-span-12 md:col-span-4 p-4 rounded border border-stone-300 dark:bg-[#242424] dark:text-white">
      <div className="flex mb-8 items-start justify-between">
        <div className="w-full">
          <div className="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded mb-2 animate-pulse"></div>
          <div className="h-8 w-32 bg-stone-200 dark:bg-stone-700 rounded animate-pulse"></div>
        </div>
        <div className="h-6 w-16 bg-stone-200 dark:bg-stone-700 rounded animate-pulse"></div>
      </div>
      <div className="h-3 w-20 bg-stone-200 dark:bg-stone-700 rounded animate-pulse"></div>
    </div>
  );
};

function StatCards() {
  const [account, setAccount] = useState<Accounts[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState<Banks[] | null>(null);
  const [plaidBanks, setPlaidBanks] = useState<PlaidData | null>(null);
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/prisma/accounts/get-account");
        console.log("API response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          setAccount(data);
          console.log(data); // Ensure data structure is as expected
        } else {
          console.error("Error: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchBanks = async () => {
      if (!user) return; // Wait for the user data to be available

      try {
        const res = await fetch("/api/prisma/banks/get-banks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.userId }), // Pass userId as an object
        });

        if (res.ok) {
          const banks = await res.json();
          setBanks(banks);
          console.log("Bank data: ", banks);

          // Fetch plaid data if banks are available
          if (banks && banks[0]?.accessToken) {
            const plaidResponse = await fetch("/api/plaid/get-balances", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken: banks[0].accessToken }),
            });

            if (plaidResponse.ok) {
              const plaidData = await plaidResponse.json();
              console.log(plaidData);
              setPlaidBanks(plaidData);
            }
          }
        } else {
          console.error("Error fetching banks", res.statusText);
        }
      } catch (error) {
        console.log("Error fetching banks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchBanks();
  }, [user]);

  if (loading) {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  }
  if (!account) {
    return (
      <div>
        <h1>No Account Data.</h1>
      </div>
    );
  }
  if (!banks) {
    return (
      <div>
        <h1>No Bank Data.</h1>
      </div>
    );
  }

  const localBalance = account[0].availableBalance; // Example: Available balance from your local account
  const plaidBalance =
    plaidBanks?.accounts?.reduce(
      (total, plaidAccount) => total + plaidAccount.balances.available,
      0 // Initial value for total
    ) || 0;

  // const plaidCurrent =
  //   plaidBanks?.accounts?.reduce(
  //     (total, plaidAccount) => total + plaidAccount.balances.current,
  //     0 // Initial value for total
  //   ) || 0;

  // You can also add current balances similarly
  const totalBalance = localBalance + plaidBalance;

  return (
    <>
      <Card
        title="Available Balance"
        value={account[0].availableBalance.toString()}
        pillText="2.75%"
        trend="up"
        period="Last 30 days"
      />
      <Card
        title="Last Transaction"
        value="27.97"
        pillText="1.01%"
        trend="down"
        period="2 Hours ago"
      />
      <Card
        title="Total Balance"
        value={totalBalance.toString()}
        pillText="60.75%"
        trend="up"
        period="Previous 30 days"
      />
    </>
  );
}

export default StatCards;
