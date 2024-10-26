import { Avatar } from "@nextui-org/react";

export const TransactionFlow = () => {
  return (
    <div className="rounded-lg border-2">
      <div className="flex gap-3 items-center p-4">
        <Avatar
          className="self-center min-w-fit"
          src="https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"
        />
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span className="text-medium  text-neutral-400">From</span>
            <span className="text-medium  font-bold">ETH</span>
          </div>
          <div className="flex flex-col">
            <span className="text-medium ">0.0069 ETH</span>
            <span className="text-medium  font-bold text-right">$690</span>
          </div>
        </div>
      </div>

      <div className="border-neutral-200 border-1" />
      <div className="flex gap-3 items-center p-4">
        <Avatar
          className="self-center min-w-fit"
          src="https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png"
        />
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span className="text-medium  text-neutral-400">To</span>
            <span className="text-medium  font-bold">USDT</span>
          </div>
          <div className="flex flex-col">
            <span className="text-medium ">0.420 USDT</span>
            <span className="text-medium  font-bold text-right">$420</span>
          </div>
        </div>
      </div>
    </div>
  );
};
