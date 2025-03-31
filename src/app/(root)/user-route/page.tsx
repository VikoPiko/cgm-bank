"use client";
import { PlaidType, useUser } from "@/components/custom/UserContext";
import { Accounts, Banks } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const User = () => {
  const { user, getAccounts, getBanks, plaidData, getPlaidBanks } = useUser();
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [banks, setBanks] = useState<Banks[]>([]);
  const [plaidAccounts, setPlaidAccounts] = useState<PlaidType[] | null>(null);

  useEffect(() => {
    if (user) {
      try {
        const accs = getAccounts();
        const bks = getBanks();
        const plaidAccs = getPlaidBanks();
        console.log(plaidAccs);

        setAccounts(accs || []);
        setBanks(bks || []);
        setPlaidAccounts(plaidAccs || null);
      } catch (error) {
        toast.error(`ERROR: ${error}`);
      }
    }
  }, [user, plaidData]);

  return (
    <div>
      {/* Display user accounts */}
      <div className="border p-4 my-2">
        {accounts.length > 0 ? (
          accounts.map((account, index) => (
            <div key={index}>
              <h1>Account Number: {account.accountNumber}</h1>
              <h1>Routing Number: {account.routingNumber}</h1>
            </div>
          ))
        ) : (
          <h1>No Accounts.</h1>
        )}
      </div>

      {/* Display banks */}
      <div className="border p-4 my-2">
        {banks.length > 0 ? (
          banks.map((bank, index) => (
            <div key={index}>
              <h1>BankID: {bank.bankId}</h1>
            </div>
          ))
        ) : (
          <h1>No Banks.</h1>
        )}
      </div>

      {/* Display Plaid accounts */}
      <div>
        {plaidAccounts && plaidAccounts.length > 0 ? (
          plaidAccounts.map((account, index) => (
            <div key={index} className="border p-4 my-2">
              <h2>Account Name: {account.name}</h2>
              <p>Account ID: {account.account_id}</p>
              <p>
                Available Balance: {account.balances.available}{" "}
                {account.balances.iso_currency_code}
              </p>
              <p>Type: {account.subtype}</p>
              <p>
                Current Balance: {account.balances.current}{" "}
                {account.balances.iso_currency_code}
              </p>
            </div>
          ))
        ) : (
          <h1>No Plaid Accounts.</h1>
        )}
      </div>
    </div>
  );
};

export default User;
