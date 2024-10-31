import { useState, useMemo } from 'react';

export type ChartDataItem = {
  date: string;
  tips: number;
  donations: number;
  tipsCount: number;
  donationsCount: number;
  userIds: string[];
  transactionCount?: number;
};

export const generateDummyData = (startYear: number, endYear: number) => {
  const data = [];
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear, 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Base amount
    let baseAmount = Math.random() * 500 + 100;

    // Add some seasonality
    const month = d.getMonth();
    if (month === 11 || month === 0) { // December and January
      baseAmount *= 1.5; // Increase for holiday season
    } else if (month >= 5 && month <= 7) { // June, July, August
      baseAmount *= 1.2; // Slight increase for summer
    }

    // Add weekly pattern
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday and Saturday
      baseAmount *= 1.3; // Increase for weekends
    }

    // Add yearly growth
    const yearsSinceStart = d.getFullYear() - startYear;
    baseAmount *= (1 + yearsSinceStart * 0.1); // 10% year-over-year growth

    // Generate random counts for tips and donations
    const tipsCount = Math.floor(Math.random() * 10) + 1; // 1 to 10 tips
    const donationsCount = Math.floor(Math.random() * 5) + 1; // 1 to 5 donations

    // Generate random user IDs
    const userIds = Array.from({ length: tipsCount + donationsCount }, () => 
      Math.floor(Math.random() * 1000).toString()
    );

    data.push({
      date: d.toISOString().split('T')[0],
      tips: Math.round(baseAmount * 0.6), // 60% of base amount goes to tips
      donations: Math.round(baseAmount * 0.4), // 40% of base amount goes to donations
      tipsCount: tipsCount,
      donationsCount: donationsCount,
      userIds: userIds
    });
  }

  return data;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export const calculateMetrics = (data: ChartDataItem[]) => {
  const totalEarnings = data.reduce((sum, item) => sum + item.tips + item.donations, 0);
  const transactionCount = data.reduce((sum, item) => sum + item.tipsCount + item.donationsCount, 0);
  const avgAmount = transactionCount > 0 ? totalEarnings / transactionCount : 0;
  const totalUsers = new Set(data.flatMap(item => item.userIds)).size;

  return {
    transactionCount,
    avgAmount,
    totalEarnings,
    totalUsers
  };
};

export const generateYearOptions = (startYear: number): number[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

export const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const useChartData = (data: any[], viewMode: 'monthly' | 'yearly', selectedYear: number, selectedMonth: number) => {
  return useMemo(() => {
    if (viewMode === 'yearly') {
      return data.filter(item => item.date.startsWith(`${selectedYear}`));
    } else {
      const monthStr = selectedMonth.toString().padStart(2, '0');
      return data.filter(item => item.date.startsWith(`${selectedYear}-${monthStr}`));
    }
  }, [data, selectedYear, selectedMonth, viewMode]);
};

export const useAggregatedData = (filteredData: ChartDataItem[], viewMode: 'monthly' | 'yearly', selectedYear: number) => {
  return useMemo(() => {
    if (viewMode === 'yearly') {
      return months.map((month, index) => {
        const monthStr = (index + 1).toString().padStart(2, '0');
        const monthData = filteredData.filter(item => item.date.startsWith(`${selectedYear}-${monthStr}`));
        const tips = monthData.reduce((sum, item) => sum + item.tips, 0);
        const donations = monthData.reduce((sum, item) => sum + item.donations, 0);
        const tipsCount = monthData.reduce((sum, item) => sum + item.tipsCount, 0);
        const donationsCount = monthData.reduce((sum, item) => sum + item.donationsCount, 0);
        return { 
          date: month, 
          tips, 
          donations, 
          tipsCount, 
          donationsCount,
          transactionCount: tipsCount + donationsCount
        };
      });
    } else {
      return filteredData.map(item => ({
        ...item,
        transactionCount: item.tipsCount + item.donationsCount
      }));
    }
  }, [filteredData, selectedYear, viewMode]);
};

export const useTotals = (filteredData: any[]) => {
  return useMemo(() => {
    return filteredData.reduce((acc, item) => {
      acc.tips += item.tips || 0;
      acc.donations += item.donations || 0;
      acc.total += (item.tips || 0) + (item.donations || 0);
      return acc;
    }, { tips: 0, donations: 0, total: 0 });
  }, [filteredData]);
};

export const useChartState = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  return {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    viewMode,
    setViewMode
  };
};

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-default-100 border border-default-200 p-4 rounded shadow-lg" >
        <p className="font-bold text-default-800" > {label} </p>
        {
          payload.map((pld: any) => (
            <p key={pld.dataKey} className="text-sm text-default-600" >
              <span style={{ color: pld.fill }}> {pld.name}: </span>
              {formatCurrency(pld.value)}
            </p>
          ))}
        <p className="text-sm font-semibold text-default-800" >
          Total: {formatCurrency(payload.reduce((sum: number, pld: any) => sum + pld.value, 0))}
        </p>
      </div>
    );
  }
  return null;
};

export const EmptyChart = () => (
  <div className="w-full h-full flex items-center justify-center bg-default-100 rounded-lg" >
    <p className="text-default-600 text-lg" > No data available for the selected period </p>
  </div>
);