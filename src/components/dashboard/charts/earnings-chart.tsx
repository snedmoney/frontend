import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  useChartData,
  useAggregatedData,
  CustomTooltip,
  EmptyChart,
  generateDummyData,
} from "@/lib/chart-utils";
import ChartCard from "@/components/dashboard/charts/chart-card";
import { useState } from "react";

const data = generateDummyData(2024, 2026);

type EarningsChartProps = {
  selectedYear: number;
  selectedMonth: number;
  viewMode: "monthly" | "yearly";
};

const EarningsChart = ({
  selectedYear,
  selectedMonth,
  viewMode,
}: EarningsChartProps) => {
  const [selectedChain, setSelectedChain] = useState("all");

  const filteredData = useChartData(
    data,
    viewMode,
    selectedYear,
    selectedMonth,
  );
  const chartData = useAggregatedData(filteredData, viewMode, selectedYear);

  const handleChainChange = (newChain: string) => {
    setSelectedChain(newChain);
    // You can perform additional actions here if needed
  };

  return (
    <ChartCard title="Earnings (USD)" onChainChange={handleChainChange}>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} className="stroke-foreground/40" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: "#888888" }}
            />
            <YAxis
              className="text-xs"
              tickFormatter={(value) => `$${value}`}
              tick={{ fill: "#888888" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="tips" stackId="a" fill="#9F91CC" name="Total Tips" />
            <Bar
              dataKey="donations"
              stackId="a"
              fill="#6A9C89"
              name="Total Donations"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyChart />
      )}
    </ChartCard>
  );
};

export default EarningsChart;
