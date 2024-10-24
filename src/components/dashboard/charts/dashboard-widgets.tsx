import React from "react";
import { FaSackDollar } from "react-icons/fa6";
import { HiEye } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import { CiCreditCard2 } from "react-icons/ci";

import {
  useChartData,
  formatCurrency,
  generateDummyData,
  calculateMetrics,
} from "@/lib/chart-utils";

const data = generateDummyData(2024, 2026);

type DashboardWidgetsProps = {
  selectedYear: number;
  selectedMonth: number;
  viewMode: "monthly" | "yearly";
};

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
  selectedYear,
  selectedMonth,
  viewMode,
}) => {
  const filteredData = useChartData(
    data,
    viewMode,
    selectedYear,
    selectedMonth,
  );
  const metrics = calculateMetrics(filteredData);

  const widgets = [
    {
      icon: <CiCreditCard2 className="w-6 h-6" />,
      label: "Transaction Count",
      value: metrics.transactionCount.toLocaleString(),
      change: "2.59%",
      changeColor: "text-success-600",
    },
    {
      icon: <FaSackDollar className="w-6 h-6" />,
      label: "Avg Amount",
      value: formatCurrency(metrics.avgAmount),
      change: "4.35%",
      changeColor: "text-success-600",
    },
    {
      icon: <HiEye className="w-6 h-6" />,
      label: "Total Earnings",
      value: formatCurrency(metrics.totalEarnings),
      change: "0.43%",
      changeColor: "text-success-600",
    },
    {
      icon: <PiUsersThree className="w-6 h-6" />,
      label: "Total Users",
      value: metrics.totalUsers.toLocaleString(),
      change: "0.95%",
      changeColor: "text-danger-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {widgets.map((widget, index) => (
        <div key={index} className="bg-default-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-default-200 p-2 rounded-full">{widget.icon}</div>
            <span className={`text-sm font-medium ${widget.changeColor}`}>
              {widget.change}
            </span>
          </div>
          <div className="text-2xl font-bold mb-1">{widget.value}</div>
          <div className="text-sm text-default-600">{widget.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
