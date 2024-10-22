import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useChartData,
  useAggregatedData,
  EmptyChart,
  generateDummyData,
} from "@/lib/chart-utils";
import ChartCard from "@/components/dashboard/charts/chart-card";

const data = generateDummyData(2024, 2026);

type TransactionsCountChartProps = {
  selectedYear: number;
  selectedMonth: number;
  viewMode: "monthly" | "yearly";
};

const TransactionsCountChart = ({
  selectedYear,
  selectedMonth,
  viewMode,
}: TransactionsCountChartProps) => {
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
    return aggregatedData.map((item) => ({
      date: item.date,
      transactionCount: item.tipsCount + item.donationsCount,
    }));
  }, [aggregatedData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-default-100 border border-default-200 p-4 rounded shadow-lg">
          <p className="font-bold text-default-800">{label}</p>
          <p className="text-sm text-default-600">
            Transactions: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard title="Transaction Count" onChainChange={handleChainChange}>
      <div className="w-full h-[400px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                vertical={false}
                className="stroke-foreground/40"
              />
              <XAxis dataKey="date" tick={{ fill: "#888888" }} />
              <YAxis tick={{ fill: "#888888" }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="transactionCount"
                stroke="#9F91CC"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </div>
    </ChartCard>
  );
};

export default TransactionsCountChart;
