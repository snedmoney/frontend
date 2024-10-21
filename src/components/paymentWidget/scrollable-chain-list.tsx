import type { Chain } from "@/providers/paymentWidget/paymentWidgetContext";

import { Button } from "@nextui-org/button";
import React from "react";

type ScrollableChainListProps = {
  chains: Chain[];
  onChainClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  innerSelectedChain: Chain;
};

const ScrollableChainList = ({
  chains,
  onChainClick,
  innerSelectedChain,
}: ScrollableChainListProps) => {
  return (
    <div className="py-2 gap-1 flex items-center max-w-full overflow-x-scroll">
      {chains?.map((chain) => {
        return (
          <React.Fragment key={chain.networkId}>
            <Button
              isIconOnly
              aria-label={chain.name}
              className="bg-transparent focus:border-foreground data-[selected=true]:border-foreground"
              data-chain={chain.networkId}
              data-selected={chain.networkId === innerSelectedChain.networkId}
              size="lg"
              variant="bordered"
              onClick={onChainClick}
            >
              <img
                alt="chain icon"
                height="24"
                src={chain.iconURL}
                width="24"
              />
            </Button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ScrollableChainList;
