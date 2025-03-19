import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-background/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6  flex h-16 items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-3">
          <Image src="/logo2.svg" width={65} height={40} alt="CGM" />
          <span className="text-xl font-bold text-black dark:text-white">
            CGM Bank
          </span>
        </div>

        {/* Center Section: Navigation Menu */}
        <nav className="hidden md:flex gap-8 flex-grow justify-center">
          {[
            { href: "/personal", label: "Personal" },
            { href: "/business", label: "Business" },
            { href: "/features", label: "Features" },
            { href: "/about", label: "About" },
          ].map((item) => (
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
        <div className="flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <Button size="sm" variant="outline" className="md:hidden">
            Menu
          </Button>

          {/* Dark Mode Toggle */}
          <ModeToggle />
          <p className="text-sm ml-[-10px] select-none hidden lg:block text-black dark:text-white">
            {" "}
            Theme
          </p>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
