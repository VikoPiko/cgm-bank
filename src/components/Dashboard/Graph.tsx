"use client";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { useTheme } from "next-themes";

const data = [
  { name: "Jan", Returning: 275, New: 41 },
  { name: "Feb", Returning: 620, New: 96 },
  { name: "Mar", Returning: 202, New: 192 },
  { name: "Apr", Returning: 500, New: 50 },
  { name: "May", Returning: 355, New: 400 },
  { name: "Jun", Returning: 875, New: 200 },
  { name: "Jul", Returning: 700, New: 205 },
];

function Graph() {
  const { resolvedTheme } = useTheme();

  // Define colors based on the theme
  const isDarkMode = resolvedTheme === "dark";
  const gridColor = isDarkMode ? "#2e2e2e" : "#e4e4e7";
  const textColor = isDarkMode ? "#e4e4e7" : "#18181b";
  const newColor = isDarkMode ? "#4ade80" : "#18181b"; // Green in dark mode, black in light mode
  const returningColor = isDarkMode ? "#c084fc" : "#5b21b6"; // Purple in dark mode, dark purple in light mode

  return (
    <div className="col-span-12 md:col-span-8 overflow-hidden rounded border border-stone-300 dark:bg-[#242424] dark:text-white">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Spendings
        </h3>
      </div>

      <div className="h-48 sm:h-64 px-2 sm:px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid stroke={gridColor} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-[10px] sm:text-xs font-thin"
              tick={{ fill: textColor }}
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-[10px] sm:text-xs font-semibold"
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor }}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs"
              contentStyle={{
                backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
                color: textColor,
              }}
            />
            <Line
              type="monotone"
              dataKey="New"
              stroke={newColor}
              fill={newColor}
            />
            <Line
              type="monotone"
              dataKey="Returning"
              stroke={returningColor}
              fill={returningColor}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graph;
