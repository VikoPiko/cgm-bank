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

const MainHeader = () => {
  // Navigation links array for reuse
  const navLinks = [
    { href: "/personal", label: "Personal" },
    { href: "/business", label: "Business" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-background/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-3">
          <Image src="/logo2.svg" width={65} height={40} alt="CGM" />
          <span className="text-xl font-bold text-black dark:text-white">
            CGM Bank
          </span>
        </div>

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

          <Link href="/testing" className="hidden md:block">
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
              <Button size="sm" variant="outline">
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
                  href="/testing"
                  className="w-full cursor-pointer font-medium"
                >
                  Open Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-1">
            <ModeToggle />
            <span className="text-sm select-none hidden lg:block text-black dark:text-white">
              Theme
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
