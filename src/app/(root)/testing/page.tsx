"use client";
import Upload from "@/components/custom/UploadThing";
import { useUser } from "@/components/custom/UserContext";
import { Button } from "@/components/ui/button";
import { Accounts, Transactions, TransactionType } from "@prisma/client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { user, getTransactions, getNotifications, getAccounts } = useUser();
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    description: "Desc",
    amount: 0,
    category: "Cat",
    transactionType: "PAYMENT",
    officialName: "Bank",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      try {
        const trans = getTransactions();
        const accs = getAccounts();
        setTransactions(trans);
        setAccounts(accs || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleTransaction = async () => {
    setError(null);

    const firstAccount = accounts[0];
    if (!firstAccount) {
      setError("No account found.");
      return;
    }

    const { amount, transactionType } = newTransaction;
    const newBalance =
      transactionType === "DEPOSIT"
        ? firstAccount.availableBalance + amount
        : firstAccount.availableBalance - amount;

    if (amount > 0 && transactionType !== "DEPOSIT" && newBalance < 0) {
      setError("Insufficient balance for this transaction.");
      return;
    }

    try {
      const response = await fetch(
        "/api/prisma/transactions/create-transaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newTransaction,
            userId: user?.userId,
            accountId: firstAccount.accountNumber,
            date: new Date(),
            pending: false,
            senderBankId: firstAccount.accountNumber,
            receiverBankId: firstAccount.routingNumber,
            balanceAfter: newBalance,
            channel: "Notification",
            image: "Send",
          }),
        }
      );

      if (response.ok) {
        const createdTransaction = await response.json();

        setTransactions((prev) => [...(prev || []), createdTransaction]);
        const updatedAccount = {
          ...firstAccount,
          availableBalance: newBalance,
        };
        setAccounts([updatedAccount, ...accounts.slice(1)]);

        console.log("Updated account data: ", updatedAccount);
        console.log("Transaction created:", createdTransaction);
      } else {
        setError("Failed to create transaction.");
      }
    } catch (error) {
      setError("Error creating transaction: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-10 min-h-screen">
      <h1>Welcome, {user?.firstName}</h1>

      <div className="border p-5 rounded-lg shadow-md">
        <h2>Create a New Transaction</h2>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTransaction.description}
          onChange={handleChange}
          className="border rounded px-3 py-1 mt-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={handleChange}
          className="border rounded px-3 py-1 mt-2"
        />
        <select
          name="transactionType"
          value={newTransaction.transactionType}
          onChange={handleChange}
          className="border rounded px-3 py-1 mt-2 dark:bg-[#242424] dark:text-white"
        >
          {Object.values(TransactionType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newTransaction.category}
          onChange={handleChange}
          className="border rounded px-3 py-1 mt-2"
        />
        <input
          type="text"
          name="officialName"
          placeholder="Name"
          value={newTransaction.officialName}
          onChange={handleChange}
          className="border rounded px-3 py-1 mt-2"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={handleTransaction}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Create Transaction
        </button>
      </div>
      <div className="mt-5">
        <h2>Your Transactions:</h2>
        {transactions.length > 0 ? (
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li
                key={transaction.transactionId}
                className="border p-3 rounded"
              >
                <p>Description: {transaction.description}</p>
                <p>Amount: ${transaction.amount}</p>
                <p>Category: {transaction.category}</p>
                <p>Status: {transaction.pending ? "Pending" : "Completed"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions available</p>
        )}
      </div>
    </div>
  );
};

export default Page;
