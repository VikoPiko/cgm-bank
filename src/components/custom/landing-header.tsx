"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";

const MainHeader = () => {
  // Navigation links array for reuse
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const navLinks = [
    { href: "/personal", label: "Personal" },
    { href: "/business", label: "Business" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "bg", label: "Български" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-background/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        {/* Left Section: Logo */}
        <Link href={"/"}>
          <div className="flex items-center gap-3">
            <Image src="/logo2.svg" width={65} height={40} alt="CGM" />
            <span className="text-xl font-bold text-black dark:text-white">
              CGM Bank
            </span>
          </div>
        </Link>

        {/* Center Section: Navigation Menu (Desktop only) */}
        <nav className="hidden md:flex gap-8 flex-grow justify-center">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-black dark:text-white font-medium transition-all duration-200 ease-in-out hover:text-primary hover:translate-y-[-3px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Log in
          </Link>

          <Link href="/open-account" className="hidden md:block">
            <Button
              size="sm"
              variant="default"
              className="hover:cursor-pointer"
            >
              Open Account
            </Button>
          </Link>

          {/* Mobile Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button
                size="sm"
                variant="outline"
                className="text-black dark:text-white"
              >
                <Menu className="h-4 w-4 mr-1" />
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 md:hidden">
              {navLinks.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="w-full cursor-pointer">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="md:hidden mt-2">
                <Link
                  href="/open-account"
                  className="w-full cursor-pointer font-medium"
                >
                  Open Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-1 space-x-2">
            <ModeToggle />
            <span className="text-sm select-none hidden lg:block text-black dark:text-white">
              Theme
            </span>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
