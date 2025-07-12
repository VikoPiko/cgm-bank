"use client";

import { useEffect } from "react";
import { useUser } from "./UserContext";

interface PlaidTokenProps {
  publicToken: string;
  userId: string;
  addBankToState: (newBank: any) => void;
}

const PlaidToken: React.FC<PlaidTokenProps> = ({
  publicToken,
  userId,
  addBankToState,
}) => {
  const { refreshUser } = useUser();

  useEffect(() => {
    async function fetchAndProcessBank() {
      try {
        if (!publicToken || !userId) {
          console.error("Missing publicToken or userId", {
            publicToken,
            userId,
          });
          return;
        }

        // Step 1: Exchange public_token for access_token and save bank
        const exchangeRes = await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_token: publicToken, userId }),
        });

        if (!exchangeRes.ok) throw new Error("Failed to exchange public token");

        const exchangeData = await exchangeRes.json();
        const newBank = exchangeData.bank;
        console.log("Bank added:", newBank);
        addBankToState(newBank);

        // Step 2: Create a processor token
        const processorRes = await fetch("/api/create-processor-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!processorRes.ok)
          throw new Error("Failed to create processor token");

        const { processorToken } = await processorRes.json();
        console.log("Processor token:", processorToken);

        // Step 3: Send processor token to Dwolla to add funding source
        const dwollaRes = await fetch("/api/dwolla/add-funding-source", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, processorToken }),
        });

        if (!dwollaRes.ok) {
          const errorData = await dwollaRes.json();
          throw new Error(
            errorData.error || "Failed to add funding source to Dwolla"
          );
        }

        const dwollaData = await dwollaRes.json();
        console.log("Funding source added:", dwollaData);

        // Optional: Refresh user data
        if (refreshUser) {
          await refreshUser();
        }
      } catch (error) {
        console.error("Error linking bank and setting up Dwolla:", error);
      }
    }

    if (publicToken && userId) fetchAndProcessBank();
  }, [publicToken, userId, addBankToState]);

  return <p>Linking your bank and setting up funding source...</p>;
};

export default PlaidToken;
