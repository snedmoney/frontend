import React, { useCallback } from "react";
import { Button, Spinner, Listbox, ListboxItem } from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import { BiErrorAlt } from "react-icons/bi";
import { IoReload } from "react-icons/io5";

import TokenListItem from "./token-list-item";

import usePaymentWidget from "@/hooks/use-payment-widget";
import useGetTokens from "@/hooks/use-get-tokens";
import useMultipleTokenBalances from "@/hooks/use-multiple-token-balances";
import { TokenWithBalance } from "@/providers/paymentWidget/paymentWidgetContext";

type TInfiniteScrollTokenListProps = {
  chainId: number;
  onTokenClick: () => void;
};

const InfiniteScrollTokenList = ({
  chainId,
  onTokenClick,
}: TInfiniteScrollTokenListProps) => {
  const { selectedToken, setSelectedToken } = usePaymentWidget();
  const {
    data: tokens,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    manualRefetch,
  } = useGetTokens(chainId);

  const allTokens = tokens?.pages.flatMap((page) => page.tokens) || [];

  const { tokensBalance, isFetching: isFetchingBalance } =
    useMultipleTokenBalances(
      chainId,
      allTokens.map((t) => t.address),
    );
  const allTokensWithPrice: TokenWithBalance[] = allTokens.map((t, i) => {
    return {
      ...t,
      balance: tokensBalance[i]?.balance,
      amountInUSD: tokensBalance[i]?.amountInUSD,
      price: tokensBalance[i]?.price,
    };
  });

  const sortedTokensWithPrice = allTokensWithPrice.sort((a, b) => {
    let amountA, amountB;

    if (a.amountInUSD && b.amountInUSD) {
      amountA = parseFloat(a.amountInUSD || "0");
      amountB = parseFloat(b.amountInUSD || "0");
    } else {
      amountA = parseFloat(a.balance || "0");
      amountB = parseFloat(b.balance || "0");
    }

    return amountB - amountA;
  });

  const { ref: lastItemRef, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const loadMoreItems = useCallback(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetchingBalance) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  React.useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetchingBalance) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending" || isFetchingBalance)
    return (
      <div className="p-0 h-[400px] grid place-items-center">
        <Spinner aria-label="Loading..." color="default" />
      </div>
    );
  if (status === "error") {
    return (
      <div className="p-0 h-[400px] grid place-items-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <BiErrorAlt className="fill-default-400" size="72" />
          <p className="text-l text-default-400">Error fetching tokens...</p>
          <Button
            className=" text-default-400"
            color="default"
            size="sm"
            variant="light"
            onClick={manualRefetch}
          >
            <IoReload className="fill-default-400" size="24" />
            Reload
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Listbox
      disallowEmptySelection
      aria-label="Available tokens list"
      className="p-0 h-[400px]"
      classNames={{
        list: "overflow-y-auto",
      }}
      selectedKeys={[selectedToken.address + selectedToken.id]}
      selectionMode="single"
      variant="flat"
    >
      {sortedTokensWithPrice.map((token, index) => {
        const isLastItem = index === sortedTokensWithPrice.length - 1;

        return (
          <ListboxItem
            key={token.address + token.id}
            classNames={{
              selectedIcon: "hidden",
              base: ["data-[selected]:bg-default/40"],
            }}
            textValue={token.name}
            onClick={() => {
              onTokenClick();
              setSelectedToken(token);
            }}
          >
            <TokenListItem
              isLastItem={isLastItem}
              lastItemRef={lastItemRef}
              token={token}
              onTokenClick={onTokenClick}
            />
          </ListboxItem>
        );
      })}
    </Listbox>
  );
};

export default InfiniteScrollTokenList;