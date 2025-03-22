import Image from "next/image";
import Link from "next/link";
import React from "react";

const MainFooter = () => {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Image src={"/logo2.svg"} width={50} height={50} alt="CGM" />
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Cookies
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            © 2023 CGM Bank. All rights reserved.
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
