import React, { useMemo, useState } from "react";
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
  formatCurrency,
  useChartData,
  useAggregatedData,
  EmptyChart,
  generateDummyData,
} from "@/lib/chart-utils";
import ChartCard from "@/components/dashboard/charts/chart-card";

// Generate dummy data for 3 years
const data = generateDummyData(2024, 2026);

type AverageTransactionSizeChartProps = {
  selectedYear: number;
  selectedMonth: number;
  viewMode: "monthly" | "yearly";
};

const AverageTransactionSizeChart: React.FC<
  AverageTransactionSizeChartProps
> = ({ selectedYear, selectedMonth, viewMode }) => {
  const [selectedChain, setSelectedChain] = useState<string>("all");
  const filteredData = useChartData(
    data,
    viewMode,
    selectedYear,
    selectedMonth,
  );
  const aggregatedData = useAggregatedData(
    filteredData,
    viewMode,
    selectedYear,
  );

  const handleChainChange = (newChain: string) => {
    setSelectedChain(newChain);
    // You can perform additional actions here if needed
  };

  const chartData = useMemo(() => {
    return aggregatedData.map((item) => {
      const tipsCount = item.tipsCount || 1; // Avoid division by zero
      const donationsCount = item.donationsCount || 1; // Avoid division by zero

      return {
        date: item.date,
        avgTipSize: item.tips / tipsCount,
        avgDonationSize: item.donations / donationsCount,
        totalAvgSize: item.tips / tipsCount + item.donations / donationsCount,
      };
    });
  }, [aggregatedData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-default-100 border border-default-200 p-4 rounded shadow-lg">
          <p className="font-bold text-default-800">{label}</p>
          {payload.map((pld: any) => (
            <p key={pld.dataKey} className="text-sm text-default-600">
              <span style={{ color: pld.fill }}>{pld.name}: </span>
              {formatCurrency(pld.value)}
            </p>
          ))}
          <p className="text-sm font-semibold text-default-800 mt-2">
            Total: {formatCurrency(payload[0].payload.totalAvgSize)}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartCard
      title={`Average Transaction Size (USD)`}
      onChainChange={handleChainChange}
    >
      {chartData.length > 0 ? (
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid className="stroke-foreground/40" vertical={false} />
            <XAxis
              className="text-xs"
              dataKey="date"
              tick={{ fill: "#888888" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "#888888" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="avgTipSize"
              fill="#9F91CC"
              name="Average Tip"
              stackId="a"
            />
            <Bar
              dataKey="avgDonationSize"
              fill="#6A9C89"
              name="Average Donation"
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyChart />
      )}
    </ChartCard>
  );
};

export default AverageTransactionSizeChart;
