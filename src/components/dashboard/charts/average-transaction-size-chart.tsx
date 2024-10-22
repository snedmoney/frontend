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

interface AverageTransactionSizeChartProps {
  selectedYear: number;
  selectedMonth: number;
  viewMode: "monthly" | "yearly";
}

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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
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
            <Bar
              dataKey="avgTipSize"
              stackId="a"
              name="Average Tip"
              fill="#9F91CC"
            />
            <Bar
              dataKey="avgDonationSize"
              stackId="a"
              name="Average Donation"
              fill="#6A9C89"
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
