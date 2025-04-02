import { useEffect, useState } from "react";

type CategoryData = {
  category: string;
  _sum: {
    amount: number;
  };
};

export const SpendingBreakdown = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/server-events/updates");

    eventSource.onmessage = (event) => {
      const latestData = JSON.parse(event.data);
      setCategories(latestData.spendingBreakdown);
      setLoading(false);
    };

    eventSource.onerror = (error) => {
      console.error("Error with SSE connection:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const totalAmount = categories.reduce(
    (total, item) => total + item._sum.amount,
    0
  );

  return (
    <div>
      {loading ? (
        <div className="h-[300px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
      ) : (
        <div className="border rounded-lg dark:border-stone-700 p-4">
          <div className="space-y-4">
            {categories.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-white">{item.category}</span>
                  <span className="font-medium dark:text-white">
                    ${item._sum.amount.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(item._sum.amount / totalAmount) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
