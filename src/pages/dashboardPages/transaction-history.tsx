import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/chart-utils";
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
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import ChainFilter from "@/components/chain-filter";
import TransactionTypeFilter from "@/components/dashboard/transactions/transaction-type-filter";
import NoTransactions from "@/components/dashboard/transactions/no-transactions";

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

const dateFormatter = new DateFormatter("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const formatDate = (date: CalendarDate) => {
  const formatted = dateFormatter.format(date.toDate(getLocalTimeZone()));
  return formatted.replace(/^\w/, (c) => c.toLowerCase());
};

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
          <Button onClick={resetFilters} color="primary" variant="light">
            Reset Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DatePicker
            label="From Date"
            value={startDate}
            onChange={setStartDate}
            showMonthAndYearPickers
            granularity="day"
            maxValue={maxDate}
            className="w-full"
            calendarProps={{ color: "danger" }}
          />
          <DatePicker
            label="To Date"
            value={endDate}
            onChange={setEndDate}
            showMonthAndYearPickers
            granularity="day"
            maxValue={maxDate}
            className="w-full"
            calendarProps={{ color: "danger" }}
          />
          <ChainFilter
            selectedChain={selectedChain}
            onChainChange={setSelectedChain}
            label="Select chain"
            variant="flat"
            className="w-full"
          />
          <TransactionTypeFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            label="Select transaction type"
            variant="flat"
            className="w-full"
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
            <TableColumn children={undefined}></TableColumn>
          </TableHeader>
          <TableBody emptyContent={<NoTransactions />}>
            {items.map((transaction) => (
              <TableRow
                key={transaction.id}
                onClick={() => {}}
                className="cursor-pointer"
              >
                <TableCell>{transaction.from}</TableCell>
                <TableCell>{transaction.chain}</TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                <TableCell className="capitalize">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        transaction.status === "Completed"
                          ? "bg-success text-foreground-400"
                          : "bg-primary text-foreground-400"
                      }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell>
                  <FaChevronRight size={16} className="text-foreground-400" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredItems.length > rowsPerPage && (
          <div className="flex justify-center">
            <Pagination
              total={Math.ceil(filteredItems.length / rowsPerPage)}
              page={page}
              onChange={setPage}
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
