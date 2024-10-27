import { Avatar } from "@nextui-org/react";

import usePaymentWidget from "@/hooks/use-payment-widget";

type TransactionFlowProps = {
  amountIn: string;
};

export const TransactionFlow = ({ amountIn }: TransactionFlowProps) => {
  const { selectedToken } = usePaymentWidget();

  const amount =
    amountIn && selectedToken.price
      ? +amountIn * +selectedToken.price
      : undefined;

  return (
    <div className="rounded-lg border-2">
      <div className="flex gap-3 items-center p-4">
        <Avatar className="self-center min-w-fit" src={selectedToken.logoURI} />
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span className="text-medium  text-neutral-400">From</span>
            <span className="text-medium  font-bold">
              {selectedToken.symbol}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-medium ">
              {amountIn} {selectedToken.symbol}
            </span>
            <span className="text-medium  font-bold text-right">
              ${amount && !isNaN(amount) ? amount.toFixed(2) : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
