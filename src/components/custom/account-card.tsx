"use client";
import { PlaidAccount } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useCurrency } from "./currency-context";
import AnimatedCounter from "./animated-counter";
import { useEffect, useState } from "react";

const toCamelCase = (str: string) =>
  str
    .replace(/\s(.)/g, (match, group1) => group1.toUpperCase())
    .replace(/^(.)/, (match, group1) => group1.toLowerCase())
    .replace(/\s/g, "");

export const AccountCard = ({ account }: { account: PlaidAccount }) => {
  const { convert, currencySymbol } = useCurrency();
  const { t } = useTranslation();
  const [usdToBgnRate, setUsdToBgnRate] = useState(1);

  useEffect(() => {
    const fetchUsdToBgn = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await res.json();
        setUsdToBgnRate(data.rates["BGN"] ?? 1);
      } catch {
        setUsdToBgnRate(1);
      }
    };
    fetchUsdToBgn();
  }, []);

  const baseAvailable = (account.balances.available ?? 0) * usdToBgnRate;
  const baseCurrent = (account.balances.current ?? 0) * usdToBgnRate;

  return (
    <div className="p-4 border rounded-lg dark:border-stone-700 hover:shadow-md hover:bg-[#ebebeb] dark:hover:bg-[#242424] hover:translate-y-[-5px]  duration-200 transition-all">
      <h3 className="text-sm text-stone-500 dark:text-stone-300 mb-1">
        {t(toCamelCase(account.name), { defaultValue: account.name })}
      </h3>

      <AnimatedCounter
        amount={Number(convert(Number(baseAvailable.toFixed(2))).toFixed(2))}
        currencySymbol={currencySymbol}
      />

      <p className="text-xs text-stone-500 dark:text-stone-400">
        {t("current")}:{" "}
        {Number(convert(Number(baseCurrent.toFixed(2))).toFixed(2))}{" "}
        {currencySymbol}
      </p>
    </div>
  );
};
