"use client";

import { usePlaidLink } from "react-plaid-link";
import { useEffect, useState } from "react";

interface PlaidButtonProps {
  userId: string;
  setPublicToken: (token: string) => void;
  handleLinking: () => void;
}

const PlaidButton: React.FC<PlaidButtonProps> = ({
  userId,
  setPublicToken,
  handleLinking,
}) => {
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid/link-token", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch link token");
        }

        const data = await response.json();
        setLinkToken(data.link_token);
        console.log(data.link_token);
      } catch (err) {
        console.error("Error fetching link token:", err);
      }
    };

    fetchLinkToken();
  }, []);

  const { open, ready, error } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("Public Token:", public_token);
      console.log("Account Metadata:", metadata);
    },
    onExit: (err, metadata) => {
      if (err) {
        console.error("Plaid Link Error:", err);
        console.log("Plaid exited:", metadata);
      }
    },
    onLoad: () => {
      console.log("Plaid Link loaded successfully.");
    },
  });

  if (error) {
    console.error("Plaid Link error:", error);
  }

  return (
    <button
      onClick={() => {
        handleLinking();
        if (ready) {
          open();
        } else {
          console.log("Plaid Link is not ready yet.");
        }
      }}
      disabled={!ready}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all min-w-[140px] ease-in-out transform hover:scale-105 shadow-lg inline-block duration-200"
    >
      Connect a bank
    </button>
  );
};

export default PlaidButton;
