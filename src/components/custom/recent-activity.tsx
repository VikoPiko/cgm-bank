"use client";
import { Transactions } from "@prisma/client";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
const LucideIcons = Icons as unknown as Record<string, LucideIcon>;

export const RecentActivity = ({
  transactions,
}: {
  transactions: Transactions[];
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource("/api/server-events/updates");

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLoading(false);
      };

      eventSource.onerror = () => {
        console.error("SSE connection lost");
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [user]);

  if (loading) {
    // Render a loading skeleton
    return (
      <div className="border rounded-lg dark:border-stone-700 overflow-hidden">
        <div className="p-4 border-b dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
          <h2 className="font-medium text-gray-400">Recent Activity</h2>
        </div>
        <div className="divide-y dark:divide-stone-700 animate-pulse">
          {/* Skeleton for each transaction */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="p-3 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 space-x-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-700"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-stone-300 dark:bg-stone-600 rounded w-24"></div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-600 rounded w-16"></div>
                </div>
              </div>
              <div className="w-20 h-4 bg-stone-300 dark:bg-stone-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg dark:border-stone-700 overflow-hidden">
      <div className="p-4 border-b dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
        <h2 className="font-medium">Recent Activity</h2>
      </div>
      <div className="divide-y dark:divide-stone-700">
        {transactions.map((transaction, i) => {
          const IconComponent =
            (transaction.image && LucideIcons[transaction.image]) ||
            Icons.HelpCircle;

          return (
            <div
              key={i}
              className="p-3 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                  <IconComponent
                    className={`w-5 h-5 ${
                      transaction.transactionType === "DEPOSIT"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.category}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p
                className={`font-medium ${
                  transaction.transactionType === "DEPOSIT"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.transactionType === "DEPOSIT" ? "+" : "-"}
                {transaction.amount.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
