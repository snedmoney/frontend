import { PropsWithChildren, ReactNode, useState } from "react";

import ChainFilter from "@/components/chain-filter";

type ChartCardProps = {
  title: string;
  children: ReactNode;
  onChainChange?: (chain: string) => void;
};

const ChartCard = ({
  title,
  children,
  onChainChange,
}: PropsWithChildren<ChartCardProps>) => {
  const [selectedChain, setSelectedChain] = useState<string>("all");

  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    if (onChainChange) {
      onChainChange(chain);
    }
  };

  return (
    <div className="w-full bg-default-100 text-default-900 rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="w-full sm:w-[200px]">
          <ChainFilter
            selectedChain={selectedChain}
            onChainChange={handleChainChange}
          />
        </div>
      </div>
      <div className="w-full h-[400px]">{children}</div>
    </div>
  );
};

export default ChartCard;
