"use client";

import { useUser } from "@/components/custom/UserContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Actions = () => {
  const user = useUser(); // Retrieve user info from context
  const [balance, setBalance] = useState<number | null>(null); // Proper type for balance

  const handleDeposit = async (amount: number, action: string) => {
    try {
      if (user?.userId) {
        const response = await fetch("/api/prisma/accounts/update-account", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.userId,
            amount: amount,
          }),
        });

        if (response.ok) {
          const updatedBalance = await response.json(); // Assuming API returns updated balance
          setBalance(updatedBalance.availableBalance);
          toast.success(`$${amount} ${action} Successfully.`);
        } else {
          toast.error(`${action} Failed.`);
        }
      } else {
        toast.error("User not found. Please log in."); // Handle user not found
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while depositing.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Deposit Buttons */}
      <div className="flex flex-row justify-center gap-4">
        <Button onClick={() => handleDeposit(100, "Deposit")}>
          Deposit $100
        </Button>
        <Button onClick={() => handleDeposit(-100, "Withdraw")}>
          Withdraw $100
        </Button>
        <Button onClick={() => handleDeposit(200, "Deposit")}>
          Deposit $200
        </Button>
        <Button onClick={() => handleDeposit(500, "Deposit")}>
          Deposit $500
        </Button>
      </div>

      {/* Display the updated balance */}
      {balance !== null && (
        <p className="text-center mt-4">Updated Balance: ${balance}</p>
      )}
    </div>
  );
};

export default Actions;
