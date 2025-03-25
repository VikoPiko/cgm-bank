"use client";
import StatCards from "./StatCards";
import Graph from "./Graph";
import DoughnutCard from "../MyBanks/DoughnutChart";
import { useTranslation } from "react-i18next";
import Accounts from "./Accounts";

const Grid = () => {
  const { t } = useTranslation();

  return (
    // <div className="px-2 sm:px-3 grid gap-2 sm:gap-3 grid-cols-12 mb-4">
    <div>
      {/* <DashboardHeader/> */}
      {/* <StatCards /> */}
      <Accounts />
      {/* <Graph />
      <DoughnutCard /> */}
    </div>
  );
};

export default Grid;
