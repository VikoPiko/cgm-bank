import React from "react";

interface AccountCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  darkMode?: boolean; // Enable dark mode for selected cards
  btnDescription: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  subtitle,
  price,
  features,
  darkMode = false,
  btnDescription,
}) => {
  return (
    <div
      className={`rounded-md shadow-lg w-[360px] h-[450px] flex flex-col p-6 transition-all hover:translate-y-[-5px] duration-300 ${
        darkMode
          ? "bg-blue-500 text-white dark:bg-[#363636] hover:bg-blue-600 dark:hover:bg-[#484848]"
          : "bg-white dark:bg-white dark:backdrop-blur-md text-black hover:bg-gray-50 dark:hover:bg-gray-50/90"
      }`}
    >
      <div className="flex-grow">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p
          className={`text-md ${
            darkMode ? "text-stone-200 " : "text-stone-500 dark:text-gray-500 "
          }`}
        >
          {subtitle}
        </p>
        <h1 className="text-3xl font-semibold my-2">{price}</h1>
        <ul className="space-y-2 text-lg">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-green-500">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button stays at the bottom */}
      <button
        className={`mt-4 w-full py-2 rounded-md transition ${
          darkMode
            ? "bg-white text-black hover:bg-gray-200"
            : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-[#363636] dark:hover:bg-[#484848]"
        }`}
      >
        {btnDescription}
      </button>
    </div>
  );
};

export default AccountCard;
