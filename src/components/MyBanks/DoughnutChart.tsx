"use client";
import DoughnutChart from "../custom/DoughnutChart";
import { FiDollarSign } from "react-icons/fi";

function DoughnutCard() {
  return (
    <div className="col-span-12 md:col-span-4 p-4 rounded border border-stone-300 dark:bg-[#242424] flex flex-col items-center">
      <h3 className="text-stone-500 mb-0 text-sm sm:text-md font-thin dark:text-white flex self-start items-center">
        <FiDollarSign className="text-base sm:text-lg" />
        Bank Balances
      </h3>
      <div className="w-full max-w-[250px] h-[200px] sm:h-[250px] self-center p-1">
        <DoughnutChart />
      </div>
      <p className="text-xs text-stone-500 mt-4 dark:text-white">
        Distribution of Balances
      </p>
    </div>
  );
}

export default DoughnutCard;
