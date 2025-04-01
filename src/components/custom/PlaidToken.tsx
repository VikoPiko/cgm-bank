"use client";

import { useEffect } from "react";
import { useUser } from "./UserContext";

interface PlaidTokenProps {
  publicToken: string;
  userId: string;
  addBankToState: (newBank: any) => void;
}

const { refreshUser } = useUser();

const PlaidToken: React.FC<PlaidTokenProps> = ({
  publicToken,
  userId,
  addBankToState,
}) => {
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        if (!publicToken || !userId) {
          console.error("Missing publicToken or userId", {
            publicToken,
            userId,
          });
          return;
        }

        const payload = { public_token: publicToken, userId };

        const res = await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to exchange public token");

        const data = await res.json();
        console.log("Bank added:", data.bank);

        addBankToState(data.bank);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (publicToken && userId) fetchAccessToken();
  }, [publicToken, userId, addBankToState]);

  return <p>Bank is being linked...</p>;
};

export default PlaidToken;
