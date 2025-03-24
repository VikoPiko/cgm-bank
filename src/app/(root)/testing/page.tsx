"use client";
import { useState, useEffect } from "react";
import { Accounts, Banks } from "@prisma/client";
import { useUser } from "@/components/custom/UserContext";
import { toast } from "sonner";

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

const Testing = () => {
  const [account, setAccount] = useState<Accounts[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState<Banks[] | null>(null);
  const [plaidBanks, setPlaidBanks] = useState<PlaidData | null>(null);
  const user = useUser(); // This will get the current user

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
      } finally {
        setLoading(false);
        console.log(user?.userId);
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
      }
    };

    fetchData();
    fetchBanks();
  }, [user]); // This will trigger the effect when `user` changes

  if (loading) {
    return (
      <div>
        <h1>Loading Account data...</h1>
      </div>
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

  const plaidCurrent =
    plaidBanks?.accounts?.reduce(
      (total, plaidAccount) => total + plaidAccount.balances.current,
      0 // Initial value for total
    ) || 0;

  // You can also add current balances similarly
  const totalBalance = localBalance + plaidCurrent;

  return (
    <div className="min-h-screen">
      <h2>Local Available Balance: {localBalance}</h2>
      <h2>Total Available Balance (Local + Plaid): {totalBalance}</h2>

      {/* Display Plaid Bank Balances */}
      {plaidBanks?.accounts?.map(
        (plaidAccount: PlaidAccount, index: number) => (
          <div key={index}>
            <h3>{plaidAccount.name}</h3>
            <p>
              Available Balance: {plaidAccount.balances.available}{" "}
              {plaidAccount.balances.iso_currency_code}
            </p>
            <p>
              Current Balance: {plaidAccount.balances.current}{" "}
              {plaidAccount.balances.iso_currency_code}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Testing;
