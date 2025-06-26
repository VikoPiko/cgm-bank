"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type CurrencyContextType = {
  selectedCurrency: string;
  setSelectedCurrency: Dispatch<SetStateAction<string>>;
  currencySymbol: string;
  convert: (amount: number) => number;
};

const CurrencyContext = createContext<CurrencyContextType>({
  selectedCurrency: "BGN",
  setSelectedCurrency: () => {},
  currencySymbol: "лв.",
  convert: (amount: number) => amount,
});

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState("BGN");
  const [currencySymbol, setCurrencySymbol] = useState("лв.");
  const [exchangeRate, setExchangeRate] = useState(1);

  const fetchRate = async (currency: string) => {
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/BGN");
      const data = await res.json();
      return data.rates[currency] ?? 1;
    } catch {
      return 1;
    }
  };

  useEffect(() => {
    const updateCurrency = async () => {
      const rate = await fetchRate(selectedCurrency);
      setExchangeRate(rate);

      switch (selectedCurrency) {
        case "USD":
          setCurrencySymbol("$");
          break;
        case "EUR":
          setCurrencySymbol("€");
          break;
        case "GBP":
          setCurrencySymbol("£");
          break;
        case "TRY":
          setCurrencySymbol("₺");
          break;
        default:
          setCurrencySymbol("лв.");
      }
    };

    updateCurrency();
  }, [selectedCurrency]);

  const convert = (amount: number) => amount * exchangeRate;

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        currencySymbol,
        convert,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};
