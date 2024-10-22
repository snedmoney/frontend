import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import ChartCard from "./chart-card";
import {
  formatCurrency,
  useChartData,
  EmptyChart,
  generateDummyData,
} from "@/lib/chart-utils";

const data = generateDummyData(2024, 2026);

const COLORS = ["#9F91CC", "#6A9C89"];

interface EarningsPieChartProps {
  selectedYear: number;
  selectedMonth: number;
  viewMode: "monthly" | "yearly";
}

const EarningsPieChart: React.FC<EarningsPieChartProps> = ({
  selectedYear,
  selectedMonth,
  viewMode,
}) => {
  const [selectedChain, setSelectedChain] = useState("all");
  const filteredData = useChartData(
    data,
    viewMode,
    selectedYear,
    selectedMonth,
  );

  const handleChainChange = (newChain: string) => {
    setSelectedChain(newChain);
    // You can perform additional actions here if needed
  };

  const chartData = useMemo(() => {
    const totals = filteredData.reduce(
      (acc, item) => {
        acc.tips += item.tips;
        acc.donations += item.donations;
        return acc;
      },
      { tips: 0, donations: 0 },
    );

    return [
      { name: "Tips", value: totals.tips },
      { name: "Donations", value: totals.donations },
    ];
  }, [filteredData]);

  const totalEarnings = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-default-100 border border-default-200 p-4 rounded shadow-lg">
          <p className="font-bold text-default-800">{data.name}</p>
          <p className="text-sm text-default-600">
            Amount: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-default-600">
            Percentage: {((data.value / totalEarnings) * 100).toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * 1.1 * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${chartData[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ChartCard title="Earnings Breakdown" onChainChange={handleChainChange}>
      <div className="w-full h-full flex flex-col">
        <div className="flex-grow">
          {chartData.length > 0 && totalEarnings > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            Total Earnings: {formatCurrency(totalEarnings)}
          </p>
        </div>
      </div>
    </ChartCard>
  );
};

export default EarningsPieChart;
