import React, { useCallback } from 'react';
import { Button, Spinner, Listbox, ListboxItem } from '@nextui-org/react';
import { useInView } from 'react-intersection-observer';
import useGetTokens from '@/hooks/use-get-tokens';
import { BiErrorAlt } from "react-icons/bi";
import { IoReload } from "react-icons/io5";
import usePaymentWidget from '@/hooks/use-payment-widget';
import TokenListItem from './token-list-item';


type TInfiniteScrollTokenListProps = {
  chainId: number;
  onTokenClick: () => void;
};

const InfiniteScrollTokenList = ({ chainId, onTokenClick }: TInfiniteScrollTokenListProps) => {
  const { selectedToken, setSelectedToken } = usePaymentWidget();
  const {
    data: tokens,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    manualRefetch
  } = useGetTokens(chainId);

  const { ref: lastItemRef, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const loadMoreItems = useCallback(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  React.useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);


  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending') return <div className="p-0 h-[400px] grid place-items-center"><Spinner aria-label="Loading..." color='default' /></div>
  if (status === 'error') {
    return (
      <div className="p-0 h-[400px] grid place-items-center">
        <div className='flex flex-col items-center justify-center gap-2'>
          <BiErrorAlt size='72' className='fill-default-400' />
          <p className="text-l text-default-400">Error fetching tokens...</p>
          <Button color='default' variant='light' className=' text-default-400' size='sm' onClick={manualRefetch}>
            <IoReload className='fill-default-400' size='24' />
            Reload
          </Button>
        </div>
      </div>
    )
  }

  const allTokens = tokens?.pages.flatMap(page => page.data) || [];

  return (
    <Listbox
      aria-label="Available tokens list"
      variant="flat"
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={[selectedToken.tokenAddress + selectedToken.symbol]}
      className="p-0 h-[400px]"
      classNames={{
        list: 'overflow-y-auto'
      }}
    >
      {allTokens.map((token, index) => {
        const isLastItem = index === allTokens.length - 1;
        return (
          <ListboxItem
            key={token.tokenAddress + token.symbol}
            textValue={token.name}
            classNames={{
              selectedIcon: 'hidden',
              base: ['data-[selected]:bg-default/40']
            }}
            onClick={() => {
              onTokenClick();
              setSelectedToken(token);
            }}
          >
            <TokenListItem onTokenClick={onTokenClick} token={token} isLastItem={isLastItem} lastItemRef={lastItemRef} />
          </ListboxItem>
        );
      })}
    </Listbox>
  );
};

export default InfiniteScrollTokenList;