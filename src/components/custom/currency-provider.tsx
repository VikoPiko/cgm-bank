import { CurrencyProvider } from "./currency-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}
