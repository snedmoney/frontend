import React, { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  formatCurrency,
  useChartData,
  useAggregatedData,
  EmptyChart,
  generateDummyData,
} from "@/lib/chart-utils";
import ChartCard from "@/components/dashboard/charts/chart-card";

const data = generateDummyData(2024, 2026);

type EarningsTrendChartProps = {
  selectedYear: number;
  selectedMonth: number;
  viewMode: "monthly" | "yearly";
};

const EarningsTrendChart = ({
  selectedYear,
  selectedMonth,
  viewMode,
}: EarningsTrendChartProps) => {
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

  const chartData = useMemo(() => {
    return aggregatedData.map((item) => ({
      date: item.date,
      earnings: item.tips + item.donations,
    }));
  }, [aggregatedData]);

  const CustomAreaChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-default-100 border border-default-200 p-4 rounded shadow-lg">
          <p className="font-bold text-default-800">{label}</p>
          <p className="text-sm text-default-600">
            Earnings: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleChainChange = (newChain: string) => {
    setSelectedChain(newChain);
    // You can perform additional actions here if needed
  };

  return (
    <ChartCard title="Earnings Trend" onChainChange={handleChainChange}>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
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
            <Tooltip content={<CustomAreaChartTooltip />} />
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6A9C89" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6A9C89" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#6A9C89"
              fillOpacity={1}
              fill="url(#colorEarnings)"
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <EmptyChart />
      )}
    </ChartCard>
  );
};

export default EarningsTrendChart;
