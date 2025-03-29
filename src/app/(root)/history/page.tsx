"use client";

import { useUser } from "@/components/custom/UserContext";
import { Transactions, UserPreferences } from "@prisma/client";
import { useEffect, useState } from "react";

const History = () => {
  const { user, getTransactions, getPreferences } = useUser();
  const [transactions, setTransactions] = useState<Transactions[]>([]); // Initialize with an empty array
  const [preferences, setPreferences] = useState<UserPreferences>(); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchTransactions = async () => {
      const txs = await getTransactions();
      const pref = await getPreferences();
      setTransactions(txs || []);
      setPreferences(pref);
      setLoading(false);
    };

    fetchTransactions();
  }, [user]);

  if (!transactions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h2>User Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length ? (
        transactions.map((tx) => (
          <div key={tx.transactionId}>
            <p>
              {tx.description} : - : ${tx.amount}
            </p>
          </div>
        ))
      ) : (
        <p>No Transactions</p>
      )}
      <h1>TWOF: {preferences?.twoFactorEnabled === true ? "True" : "False"}</h1>
    </div>
  );
};

export default History;
