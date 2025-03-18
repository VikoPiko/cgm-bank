"use client";
import React from "react";
import { Button } from "../ui/button";
import HeroImage from "../Test/HeroImage";
import { useTranslation } from "react-i18next";

const Hero = ({ onButtonClick }: { onButtonClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="col-span-12 flex mb-20 items-center font-bold text-7xl translate-x-[100px] translate-y-[200px] ">
      <div>
        <span className="translate-y-[-80px]">
          {t("heroHeader")}
          <p className="text-lg mt-6 w-[390px] text-stone-700 dark:text-gray-200">
            {t("heroSubheader")}
          </p>
        </span>
        <Button
          className="translate-x-[110px] bg-blue-500 hover:bg-blue-700 hover:translate-y-[-4px] transition-all duration-300 ease-in-out text-xl"
          onClick={onButtonClick}
        >
          Get Started!
        </Button>
      </div>
      <HeroImage />
    </div>
  );
};

export default Hero;
