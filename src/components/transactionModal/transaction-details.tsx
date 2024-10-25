import { Avatar, Chip, Link, Textarea } from "@nextui-org/react";

import { FaLink } from "react-icons/fa6";
import TransactionStatusBadge from "../dashboard/transactions/transaction-status-badge";

const TransactionMessage = () => (
  <div className="flex gap-3">
    <Avatar
      className="min-w-fit "
      src="https://media.tenor.com/hu4sl_5rDXcAAAAM/cat-catcry.gif"
    />
    <Textarea
      isReadOnly
      className="w-full"
      defaultValue="Lol thanks for your cash"
      labelPlacement="outside"
      minRows={2}
      placeholder="Lol thanks for your cash"
      variant="flat"
    />
  </div>
);

export const TransactionDetails = () => {
  return (
    <div className="px-1">
      <div className="flex flex-col gap-2 py-2">
        <span className="font-bold">Transaction Hash</span>
      </div>
      <div className="py-2 flex items-center justify-between">
        <span className="font-bold">From link</span>
        <Link
          isExternal
          showAnchorIcon
          anchorIcon={<FaLink />}
          color="warning"
          href="https://github.com/nextui-org/nextui"
        >
          Tip
        </Link>
      </div>
      <div className="py-2 flex items-center justify-between">
        <span className="font-bold">Status</span>
        <TransactionStatusBadge status="pending" />
      </div>
      <div className="py-2 flex items-center justify-between">
        <span className="font-bold">Gas price</span>
        <div className="flex flex-col items-end">
          <span className="font-bold">0.69 ETH</span>
          <span className="font-normal">$69</span>
        </div>
      </div>
      <div className="flex flex-col py-2 gap-2">
        <span className="font-bold">Message</span>
        <TransactionMessage />
      </div>
    </div>
  );
};
