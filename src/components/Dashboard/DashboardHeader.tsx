"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModeToggle } from "../custom/mode-toggle";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlaidLink } from "react-plaid-link";
import { NotificationsDropdown } from "../custom/notification-dropdown";
import { Menu } from "lucide-react";

function DashboardHeader({ userId = "" }: { userId?: string }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid/link-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error("Failed to fetch link token");
        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (err) {
        console.error("Error fetching link token:", err);
      }
    };

    if (userId) fetchLinkToken();
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log("Public Token:", public_token);
      console.log("Account Metadata:", metadata);

      fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token, userId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Bank added:", data))
        .catch((err) => console.error("Error exchanging token:", err));
    },
    onExit: (err, metadata) => {
      if (err) console.error("Plaid Link Error:", err);
    },
  });

  // Language options
  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "bg", label: "Български" },
  ];

  return (
    <div className="col-span-12 p-2 sm:p-4 rounded border border-stone-300 shadow-md dark:bg-[#242424] dark:shadow-stone-700 dark:shadow-lg mb-2 sm:mb-3">
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        {/* Left Side */}
        <div>
          <Button
            onClick={() => ready && open()}
            disabled={!ready}
            className="bg-gray-50 text-black hover:bg-blue-600/20 hover:-translate-y-[2px] transition-all ease-in-out duration-150 shadow-md
              dark:text-white dark:bg-[#242424] dark:hover:bg-blue-400/40 border border-gray-300 dark:border-gray-400 outline-none"
          >
            {t("addBankButton") || "Add Bank"}
          </Button>
        </div>

        {/* Centered Logo */}
        <div className="flex-1 flex justify-center hover:scale-105 hover:-translate-y-[2px] transition-all duration-200 ease-in-out">
          <Link href="/dashboard">
            <Image
              src="/logo2.svg"
              width={75}
              height={40}
              alt="logo"
              priority
            />
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <NotificationsDropdown />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-black dark:text-white font-medium px-4 py-2 rounded-lg transition bg-stone-100 hover:bg-blue-600/20
                  hover:-translate-y-[2px] ease-in-out duration-150 dark:bg-[#242424] dark:hover:bg-blue-400/40 border dark:border-stone-400"
              >
                <span className="flex items-center justify-center text-sm">
                  {t("language") || "Language"}
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
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          {/* Logo and Menu Button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/logo2.svg"
                width={50}
                height={25}
                alt="logo"
                priority
              />
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-1">
            <NotificationsDropdown />
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu (Collapsible) */}
        {mobileMenuOpen && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Button
                onClick={() => ready && open()}
                disabled={!ready}
                size="sm"
                className="w-full bg-gray-50 text-black hover:bg-blue-600/20 transition-all ease-in-out duration-150 shadow-md
                  dark:text-white dark:bg-[#242424] dark:hover:bg-blue-400/40 border border-gray-300 dark:border-gray-400 outline-none"
              >
                {t("addBankButton") || "Add Bank"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="w-full flex items-center justify-between text-black dark:text-white bg-stone-100 hover:bg-blue-600/20
                      dark:bg-[#242424] dark:hover:bg-blue-400/40 border dark:border-stone-400"
                  >
                    <span className="text-xs">
                      {t("language") || "Language"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                        i18n.changeLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className="text-sm"
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;
