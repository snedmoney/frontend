import { Avatar } from "@nextui-org/avatar";
import { FaHandHoldingHeart } from "react-icons/fa";

import { TransactionDataType } from "@/types";
import { formatDateFromISOString } from "@/lib/utils";

type SupportWordProps = {
  transaction: TransactionDataType;
};

const SupportWord = ({ transaction }: SupportWordProps) => {
  return (
    <div className="my-10 last:mb-0 flex gap-4 items-start">
      <Avatar
        showFallback
        className="shrink-0"
        icon={<FaHandHoldingHeart size={24} />}
        size="md"
        src="https://images.unsplash.com/broken"
      />
      <div>
        <h3>{transaction?.name || "Anonymous"}</h3>
        <div className="flex gap-3 mb-3">
          <p>$250</p>
          <span className="opacity-60 ps-3 relative before:absolute before:content-[''] before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-secondary before:opacity-50">
            {formatDateFromISOString(transaction.createdAt)}
          </span>
        </div>
        {transaction?.message && <p>{transaction.message}</p>}
      </div>
    </div>
  );
};

export default SupportWord;
