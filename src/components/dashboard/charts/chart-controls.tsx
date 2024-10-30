import React, { useCallback, useMemo } from 'react';
import { generateYearOptions, months } from '@/lib/chart-utils';
import { Select, SelectItem, Tab, Tabs } from '@nextui-org/react';

type ChartControlProps = {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  viewMode: 'monthly' | 'yearly';
  setViewMode: (mode: 'monthly' | 'yearly') => void;
}

const ChartControls: React.FC<ChartControlProps> = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  viewMode,
  setViewMode
}) => {
  const yearOptions = useMemo(() => generateYearOptions(2024), []);

  const handleYearChange = useCallback((keys: any) => {
    const selectedKey = Array.from(keys)[0] as string;
    const year = Number(selectedKey);
    if (!isNaN(year)) {
      setSelectedYear(year);
    }
  }, [setSelectedYear]);

  const handleMonthChange = useCallback((keys: any) => {
    const selectedKey = Array.from(keys)[0] as string;
    const month = Number(selectedKey);
    if (!isNaN(month) && month >= 1 && month <= 12) {
      setSelectedMonth(month);
    }
  }, [setSelectedMonth]);

  return (
    <div className="bg-default-100 p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="order-2 md:order-1 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Select
            label="Year"
            className="w-full md:min-w-[80px] md:max-w-[160px]"
            onSelectionChange={handleYearChange}
            selectedKeys={[selectedYear.toString()]}
            defaultSelectedKeys={[selectedYear.toString()]}
            variant='underlined'
            color='primary'
            size="lg"
          >
            {yearOptions.map(year => (
              <SelectItem key={year.toString()} value={year.toString()} textValue={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </Select>
          {viewMode === 'monthly' && (
            <Select
              label="Month"
              className="w-full md:min-w-[100px] md:max-w-[200px]"
              onSelectionChange={handleMonthChange}
              selectedKeys={[selectedMonth.toString()]}
              defaultSelectedKeys={[selectedMonth.toString()]}
              variant='underlined'
              color='primary'
              size="lg"
            >
              {months.map((month, index) => (
                <SelectItem key={(index + 1).toString()} value={(index + 1).toString()} textValue={month}>
                  {month}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto">
          <Tabs
            selectedKey={viewMode}
            onSelectionChange={(key) => setViewMode(key as 'monthly' | 'yearly')}
            aria-label="View mode"
            color="primary"
            radius="md"
            variant='bordered'
            size='lg'
            classNames={{
              base: "w-full md:w-auto",
              tabList: "w-full md:w-auto",
              tab: "w-full",
            }}
          >
            <Tab key="monthly" title="Monthly" />
            <Tab key="yearly" title="Yearly" />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChartControls;