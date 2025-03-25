import { CreditCard, DollarSign, PiggyBank } from "lucide-react";

export const RecentActivity = () => {
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
