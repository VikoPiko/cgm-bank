import { PlaidAccount } from "@/lib/utils";

export const AccountCard = ({ account }: { account: PlaidAccount }) => {
  return (
    <div className="p-4 border rounded-lg dark:border-stone-700 hover:shadow-md hover:bg-[#ebebeb] dark:hover:bg-[#242424] hover:translate-y-[-5px]  duration-200 transition-all">
      <h3 className="text-sm text-stone-500 dark:text-stone-300 mb-1">
        {account.name}
      </h3>
      <p className="text-xl font-semibold mb-1">
        ${account.balances.available.toFixed(2)}
      </p>
      <p className="text-xs text-stone-500 dark:text-stone-400">
        Current: ${account.balances.current.toFixed(2)}{" "}
        {account.balances.iso_currency_code}
      </p>
    </div>
  );
};
