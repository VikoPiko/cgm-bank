"use client";
import React, { useState } from "react";
import { Briefcase, CreditCard, Dock, House, PiggyBank } from "lucide-react";
import AccountCard from "./AccountCards";
import { VelocityText } from "../Test/VelocityText";
import Hero from "./Hero";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import LoginBox from "./LoginBox";
import { useTranslation } from "react-i18next";

const Page = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useTranslation();

  // Page content to render when showLogin is false
  const pageContent = (
    <>
      <div className="col-span-12 flex items-center justify-center mt-36">
        <VelocityText />
      </div>

      <div className="col-span-12 flex justify-center mt-36 mb-5 font-medium text-7xl text-black dark:text-white">
        <h1>Accounts</h1>
      </div>

      <div className="flex space-x-4 col-span-12 items-center justify-center mt-10">
        {/* Light mode (Free Plan) */}
        <AccountCard
          title="Checking Account"
          subtitle="Easy everyday banking"
          price="$0"
          features={[
            "1 user",
            "No Monthly Fee",
            "Free Tranfers & Withdrawals",
            "200$ Sign-up Bonus",
          ]}
          btnDescription="Open Account"
        />

        {/* Dark mode (Basic Plan) */}
        <AccountCard
          title="Savings Account"
          subtitle="For long-term savings"
          price="2.5% APY"
          features={[
            "No monthly fees",
            "High-interest rate",
            "Automatic savings feature",
            "Instant transfers to Checking",
          ]}
          darkMode={true}
          btnDescription="Learn More"
        />

        {/* Light mode (Loans Account) */}
        <AccountCard
          title="Loans Account"
          subtitle="For financing your needs"
          price="Rates from 3.5% APR"
          features={[
            "Flexible repayment terms",
            "Low-interest rates",
            "Instant approval process",
            "No hidden fees",
          ]}
          btnDescription="Contact Us"
        />
      </div>

      {/* Why Choose Us */}
      <div className="col-span-12 flex flex-col items-center text-center mt-32 mb-5 font-medium text-7xl text-black dark:text-white sm:flex-row sm:justify-center md:block">
        <h1>Why Choose Us?</h1>
        <h1 className="mt-4 sm:mt-5 sm:ml-4 font-medium text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 md:block md:items-end dark:bg-gradient-to-r dark:from-blue-400 dark:via-indigo-500 dark:to-purple-600">
          We make the difference.
        </h1>
      </div>

      <hr className="h-1 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 border-0 rounded-full my-6 col-span-12" />
      {/*FOOTER */}
      <div className="col-span-12 flex justify-start mx-4 sm:mx-0 font-medium text-black dark:text-white mt-10 w-full items-center overflow-x-auto">
        <div className="flex flex-wrap justify-center gap-5 w-full">
          <div className="flex-none max-w-full sm:max-w-48 md:max-w-48 text-xs sm:text-sm">
            <Dock />
            <h1 className="font-bold mb-2 mt-2">Checking Accounts</h1>
            <p className="text-sm">
              {t("chooseThe")}{" "}
              <a
                href="/new-home"
                className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline "
              >
                checking account
              </a>{" "}
              that works best for you. See our{" "}
              <a
                href="/new-home"
                className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline "
              >
                CGM Total Checking®
              </a>{" "}
              offer for new customers. Make purchases with your debit card, and
              bank from almost anywhere by phone, tablet or computer and more
              than 15,000 ATMs and more than 4,700 branches.
            </p>
          </div>
          <div className="flex-none max-w-full sm:max-w-48 md:max-w-48 text-xs sm:text-sm">
            <PiggyBank />
            <h1 className="font-bold mb-2 mt-2">Savings Accounts</h1>
            <p className="text-sm">
              It’s never too early to begin saving. Open a{" "}
              <a
                href="/new-home"
                className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline "
              >
                savings account
              </a>{" "}
              or open a Certificate of Deposit (see interest rates) and start
              saving your money.
            </p>
          </div>
          <div className="flex-none max-w-full sm:max-w-48 md:max-w-48 text-xs sm:text-sm">
            <CreditCard />
            <h1 className="font-bold mb-2 mt-2">Credit Cards</h1>
            <p className="text-sm">
              CGM{" "}
              <a
                href="/new-home"
                className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline "
              >
                credit cards
              </a>{" "}
              can help you buy the things you need. Many of our cards offer
              rewards that can be redeemed for cash back or travel-related
              perks. With so many options, it can be easy to find a card that
              matches your lifestyle. Plus, with{" "}
              <a
                href="/new-home"
                className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline "
              >
                Credit Journey
              </a>{" "}
              you can get a free credit score!
            </p>
          </div>
          <div className="flex-none max-w-full sm:max-w-48 md:max-w-48 text-xs sm:text-sm">
            <House />
            <h1 className="font-bold mb-2 mt-2">Mortgages</h1>
            <p className="text-sm">
              Apply for a{" "}
              <a
                href="/new-home"
                className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline "
              >
                mortgage
              </a>{" "}
              or refinance your mortgage with CGM. View today’s mortgage rates
              or calculate what you can afford with our mortgage calculator.
              Visit our Education Center for homebuying tips and more.
            </p>
          </div>
          <div className="flex-none max-w-full sm:max-w-48 md:max-w-48 text-xs sm:text-sm">
            <Briefcase />
            <h1 className="font-bold mb-2 mt-2">CGM For Business</h1>
            <p className="text-sm">
              With CGM for Business you’ll receive guidance from a team of
              business professionals who specialize in helping improve cash
              flow, providing credit solutions, and managing payroll. Choose
              from business checking, small business loans, business credit
              cards, merchant services or visit our business resource center.
            </p>
          </div>
        </div>
      </div>

      {/* OTHERS*/}
      <div className="col-span-12 flex justify-center items-center mt-20 mb-5">
        <div className="text-center">
          <h2 className="font-bold text-3xl text-black dark:text-white mb-4">
            Other Products & Services:
          </h2>
          <p className="text-sm text-black dark:text-white">
            <a
              href="/new-home"
              className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline mr-4"
            >
              Deposit Account Agreements
            </a>
            <a
              href="/new-home"
              className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline mr-4"
            >
              Mobile Banking
            </a>
            <a
              href="/new-home"
              className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline mr-4"
            >
              Online Banking
            </a>
            <a
              href="/new-home"
              className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline mr-4"
            >
              Student Center
            </a>
            <a
              href="/new-home"
              className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline mr-4"
            >
              Zelle®
            </a>
          </p>
        </div>
      </div>

      {/* OTHERS */}
      <div className="col-span-12 flex justify-center items-center mt-20 mb-5">
        <div className="text-center">
          <h2 className="font-bold text-3xl text-black dark:text-white mb-4">
            Other Products & Services:
          </h2>
          <p className="text-sm text-black dark:text-white">
            <a
              href="/new-home"
              className="dark:text-blue-300 text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 underline mr-4"
            >
              Deposit Account Agreements
            </a>
            {/* More links */}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div className="px-3 grid gap-3 grid-cols-12 mb-4 overflow-hidden">
      {/* Hero / Login Section */}
      <AnimatePresence mode="wait">
        {!showLogin ? (
          <>
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="col-span-12"
            >
              <Hero onButtonClick={() => setShowLogin(true)} />
            </motion.div>

            {pageContent}
          </>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="col-span-12"
          >
            <LoginBox onButtonClick={() => setShowLogin(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
