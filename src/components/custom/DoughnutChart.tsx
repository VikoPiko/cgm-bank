"use client";

import { useTheme } from "next-themes";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { theme } = useTheme();
  // Set legend text color based on the theme - TODO - make customizable later
  const legendTextColor = theme === "dark" ? "#cccccc" : "#121212";

  const data = {
    datasets: [
      {
        label: "Banks",
        data: [1250, 2500, 3750],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Bank 1", "Bank 2", "Bank 3"],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "65%",
        plugins: {
          legend: {
            display: true,
            align: "center",
            position: "right",
            labels: {
              color: legendTextColor,
            },
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
