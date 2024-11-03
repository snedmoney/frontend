import { useState, useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  DatePicker,
  Button,
  SortDescriptor,
} from "@nextui-org/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

import { formatCurrency } from "@/lib/chart-utils";
import ChainFilter from "@/components/chain-filter";
import TransactionTypeFilter from "@/components/dashboard/transactions/transaction-type-filter";
import NoTransactions from "@/components/dashboard/transactions/no-transactions";
import TransactionStatusBadge from "@/components/dashboard/transactions/transaction-status-badge";
import { formatDate } from "@/lib/utils";

type Transaction = {
  id: string;
  from: string;
  chain: string;
  type: "donation" | "tip";
  amount: number;
  date: CalendarDate;
  status: "Completed" | "In progress";
};

// Generate more mock data for this page
const generateMockTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const currentDate = today(getLocalTimeZone());

  for (let i = 0; i < count; i++) {
    transactions.push({
      id: `${i + 1}`,
      from: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
      chain: Math.random() > 0.5 ? "Ethereum" : "Polygon",
      type: Math.random() > 0.5 ? "donation" : "tip",
      amount: Math.floor(Math.random() * 10000),
      date: currentDate.subtract({ days: Math.floor(Math.random() * 365) }),
      status: Math.random() > 0.2 ? "Completed" : "In progress",
    });
  }

  return transactions;
};

const mockTransactions = generateMockTransactions(50);



const TransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState<CalendarDate | null>(null);
  const [endDate, setEndDate] = useState<CalendarDate | null>(null);
  const [selectedChain, setSelectedChain] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });
  const rowsPerPage = 10;

  const maxDate = today(getLocalTimeZone());

  const filteredItems = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const dateCondition =
        (!startDate || transaction.date >= startDate) &&
        (!endDate || transaction.date <= endDate);
      const chainCondition =
        selectedChain === "all" ||
        transaction.chain.toLowerCase() === selectedChain;
      const typeCondition =
        selectedType === "all" || transaction.type === selectedType;

      return dateCondition && chainCondition && typeCondition;
    });
  }, [startDate, endDate, selectedChain, selectedType]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems
      .sort((a, b) => {
        const cmp = a.date.compare(b.date);

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      })
      .slice(start, end);
  }, [page, filteredItems, sortDescriptor]);

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedChain("all");
    setSelectedType("all");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            color="primary"
            radius="sm"
            variant="light"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DatePicker
            showMonthAndYearPickers
            calendarProps={{ color: "danger" }}
            className="w-full"
            granularity="day"
            label="From Date"
            maxValue={maxDate}
            radius="sm"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            showMonthAndYearPickers
            calendarProps={{ color: "danger" }}
            className="w-full"
            granularity="day"
            label="To Date"
            maxValue={maxDate}
            radius="sm"
            value={endDate}
            onChange={setEndDate}
          />
          <ChainFilter
            className="w-full"
            label="Select chain"
            selectedChain={selectedChain}
            variant="flat"
            onChainChange={setSelectedChain}
          />
          <TransactionTypeFilter
            className="w-full"
            label="Select transaction type"
            selectedType={selectedType}
            variant="flat"
            onTypeChange={setSelectedType}
          />
        </div>
      </div>
      <div className="space-y-4">
        <Table
          aria-label="Transaction history table"
          selectionMode="single"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <TableHeader>
            <TableColumn>FROM</TableColumn>
            <TableColumn>CHAIN</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn key="date" allowsSorting>
              DATE
            </TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn children={undefined} />
          </TableHeader>
          <TableBody emptyContent={<NoTransactions />}>
            {items.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="cursor-pointer"
                onClick={() => {}}
              >
                <TableCell>{transaction.from}</TableCell>
                <TableCell>{transaction.chain}</TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                <TableCell className="capitalize">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>
                  <TransactionStatusBadge status={transaction.status} />
                </TableCell>
                <TableCell>
                  <FaChevronRight className="text-foreground-400" size={16} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredItems.length > rowsPerPage && (
          <div className="flex justify-center">
            <Pagination
              showControls
              page={page}
              total={Math.ceil(filteredItems.length / rowsPerPage)}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
