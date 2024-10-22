import type { Token } from "@/providers/paymentWidget/paymentWidgetContext";

type TokenListItemProps = {
  token: Token;
  onTokenClick: () => void;
  lastItemRef?: React.Ref<HTMLDivElement>;
  isLastItem?: boolean;
};

const TokenListItem = ({
  token,
  lastItemRef,
  isLastItem,
}: TokenListItemProps) => {
  return (
    <div
      key={token.id}
      ref={isLastItem ? lastItemRef : undefined}
      className="flex justify-between items-center rounded-md gap-2 py-3"
    >
      <span>
        <img alt="token logo" height="32" src={token.logoURI} width="32" />
      </span>
      <div className="flex flex-col flex-1 pl-2 min-w-0">
        <div className="truncate max-w-full">{token.symbol}</div>
        <div className="text-foreground-600 text-xs truncate max-w-full">
          {token.name}
        </div>
      </div>
      <div className="flex flex-col">
        {/* <div>{token.tokenAddress.slice(0, 6)}...{token.tokenAddress.slice(-4)}</div> */}
        <div className="text-foreground-600 text-xs text-right">1234</div>
        <div className="text-foreground-600 text-xs text-right">1234</div>
      </div>
    </div>
  );
};

export default TokenListItem;
