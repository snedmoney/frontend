import AverageTransactionSizeChart from "@/components/dashboard/charts/average-transaction-size-chart";
import EarningsChart from "@/components/dashboard/charts/earnings-chart";
import EarningsPieChart from "@/components/dashboard/charts/earnings-pie-chart";
import EarningsTrendChart from "@/components/dashboard/charts/earnings-trend-chart";
import ChartControls from "@/components/dashboard/charts/chart-controls";
import DashboardWidgets from "@/components/dashboard/charts/dashboard-widgets";
import { useChartState } from "@/lib/chart-utils";
import TransactionsCountChart from "@/components/dashboard/charts/transactions-count-chart";
import LatestTransactions from "@/components/dashboard/transactions/latest-transactions";

const Dashboard = () => {
  const {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    viewMode,
    setViewMode,
  } = useChartState();

  return (
    <div className="space-y-6">
      <ChartControls
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <DashboardWidgets
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        viewMode={viewMode}
      />
      <div className="flex flex-col gap-6">
        <div className="lg:col-span-2">
          <EarningsChart
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            viewMode={viewMode}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AverageTransactionSizeChart
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            viewMode={viewMode}
          />
          <TransactionsCountChart
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            viewMode={viewMode}
          />
          <EarningsTrendChart
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            viewMode={viewMode}
          />
          <EarningsPieChart
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            viewMode={viewMode}
          />
        </div>
      </div>
      <LatestTransactions />
    </div>
  );
};

export default Dashboard;
