import { formatCurrency } from "@/lib/chart-utils";
import { FaChevronRight } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import NoTransactions from "./no-transactions";
import TransactionStatusBadge from "./transaction-status-badge";

type Transaction = {
  id: string;
  from: string;
  chain: string;
  type: "donation" | "tip";
  amount: number;
  date: string;
  status: "Completed" | "In progress";
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    from: "0x1234...5678",
    chain: "Ethereum",
    type: "donation",
    amount: 2300,
    date: "Apr 23, 2023",
    status: "Completed",
  },
  {
    id: "2",
    from: "0x8765...4321",
    chain: "Polygon",
    type: "tip",
    amount: 670,
    date: "Apr 23, 2023",
    status: "Completed",
  },
  {
    id: "3",
    from: "0xabcd...efgh",
    chain: "Ethereum",
    type: "donation",
    amount: 234,
    date: "Apr 18, 2023",
    status: "Completed",
  },
  {
    id: "4",
    from: "0xijkl...mnop",
    chain: "Polygon",
    type: "tip",
    amount: 5000,
    date: "Apr 15, 2023",
    status: "In progress",
  },
  {
    id: "5",
    from: "0xqrst...uvwx",
    chain: "Ethereum",
    type: "donation",
    amount: 2300,
    date: "Apr 15, 2023",
    status: "Completed",
  },
  {
    id: "1",
    from: "0x1234...5678",
    chain: "Ethereum",
    type: "donation",
    amount: 2300,
    date: "Apr 23, 2023",
    status: "Completed",
  },
  {
    id: "2",
    from: "0x8765...4321",
    chain: "Polygon",
    type: "tip",
    amount: 670,
    date: "Apr 23, 2023",
    status: "Completed",
  },
  {
    id: "3",
    from: "0xabcd...efgh",
    chain: "Ethereum",
    type: "donation",
    amount: 234,
    date: "Apr 18, 2023",
    status: "Completed",
  },
  {
    id: "4",
    from: "0xijkl...mnop",
    chain: "Polygon",
    type: "tip",
    amount: 5000,
    date: "Apr 15, 2023",
    status: "In progress",
  },
  {
    id: "5",
    from: "0xqrst...uvwx",
    chain: "Ethereum",
    type: "donation",
    amount: 2300,
    date: "Apr 15, 2023",
    status: "Completed",
  },
];

const LatestTransactions = () => {
  return (
    <div className="bg-default-100 text-foreground p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Latest Transactions</h2>
        </div>
        <a href="/user/history" className="text-primary-600 hover:underline">
          View all
        </a>
      </div>
      <Table aria-label="Latest transactions table">
        <TableHeader>
          <TableColumn>FROM</TableColumn>
          <TableColumn>CHAIN</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn children={undefined}></TableColumn>
        </TableHeader>
        <TableBody emptyContent={<NoTransactions />}>
          {mockTransactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              onClick={() => {}}
              className="cursor-pointer"
            >
              <TableCell>{transaction.from}</TableCell>
              <TableCell>{transaction.chain}</TableCell>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell>{formatCurrency(transaction.amount)}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <TransactionStatusBadge status={transaction.status} />
              </TableCell>
              <TableCell>
                <FaChevronRight
                  size={16}
                  className="text-default-400 cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LatestTransactions;
