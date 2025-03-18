"use client";
import React from "react";
import { StatCards } from "./StatCards";
import { Graph } from "./Graph";
import DashboardHeader from "./DashboardHeader";
import DoughnutCard from "../MyBanks/DoughnutChart";
import { useTranslation } from "react-i18next";

const Grid = () => {
  const { t } = useTranslation();
  return (
    <div className="px-3 grid gap-3 grid-cols-12 mb-4">
      {/* <DashboardHeader/> */}
      <StatCards />
      <Graph />
      <DoughnutCard />
    </div>
  );
};

export default Grid;
