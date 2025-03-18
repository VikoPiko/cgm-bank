"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ModeToggle } from "../custom/mode-toggle";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { Button } from "../ui/button";
// import { usePlaidLink } from "react-plaid-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = ({ userId }: { userId: string }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const [linkToken, setLinkToken] = useState("");

  // Fetch link token on load
  // useEffect(() => {
  //   const fetchLinkToken = async () => {
  //     try {
  //       const response = await fetch("/api/plaid/link-token", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ userId }),
  //       });

  //       if (!response.ok) throw new Error("Failed to fetch link token");
  //       const data = await response.json();
  //       setLinkToken(data.link_token);
  //     } catch (err) {
  //       console.error("Error fetching link token:", err);
  //     }
  //   };

  //   if (userId) fetchLinkToken();
  // }, [userId]);

  // const { open, ready } = usePlaidLink({
  //   token: linkToken,
  //   onSuccess: (public_token, metadata) => {
  //     console.log("Public Token:", public_token);
  //     console.log("Account Metadata:", metadata);

  //     fetch("/api/plaid/exchange-token", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ public_token, userId }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log("Bank added:", data))
  //       .catch((err) => console.error("Error exchanging token:", err));
  //   },
  //   onExit: (err, metadata) => {
  //     if (err) console.error("Plaid Link Error:", err);
  //   },
  // });

  // Language options
  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "bg", label: "Български" },
  ];

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 flex shadow-md items-center justify-between dark:bg-[#242424] dark:shadow-stone-700 dark:shadow-lg">
      {/* Left Side */}
      <div className="relative">
        <Button
          // onClick={() => ready && open()}
          // disabled={!ready}
          className="bg-gray-50 text-black hover:bg-blue-600/20 hover:-translate-y-[2px] transition-all ease-in-out duration-150 shadow-md
  dark:text-white dark:bg-[#242424] dark:hover:bg-blue-400/40 border border-gray-300 dark:border-gray-400 outline-none min-w-[123px]"
        >
          {t("addBankButton")}
        </Button>
      </div>

      {/* Centered Logo */}
      <div className="flex-1 flex justify-center hover:scale-105 hover:-translate-y-[2px] transition-all duration-200 ease-in-out max-w-20">
        <Link href="/">
          <Image src="/logo2.svg" width={75} height={40} alt="logo" priority />
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 relative">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-black dark:text-white font-medium px-4 py-2 w-32 rounded-lg transition bg-stone-100 hover:bg-blue-600/20
            hover:-translate-y-[2px] ease-in-out duration-150 dark:bg-[#242424] dark:hover:bg-blue-400/40 border dark:border-stone-400"
            >
              <span className="flex items-center justify-center w-full min-w-[70px] text-center">
                {t("language")}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4 3.75a.75.75 0 01-1.04 0l-4-3.75a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => {
                  setDropdownOpen(false);
                  i18n.changeLanguage(lang.code);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-blue-600/20 transition"
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Mode Toggle */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
