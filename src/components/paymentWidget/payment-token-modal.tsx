import { Modal, ModalContent, ModalHeader, ModalBody, Divider, Spinner } from "@nextui-org/react";
import { IoCloseSharp } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import type { Chain } from '@/providers/paymentWidget/paymentWidgetContext';
import InfiniteScrollTokenList from "./infinite-scrolling-token-list";
import TokenSearchInput from "./token-search-input";
import usePaymentWidget from "@/hooks/use-payment-widget";
import ScrollableChainList from "./scrollable-chain-list";
import { switchChain } from '@wagmi/core';
import { config } from '@/providers/provider';
import TokenSearchResult from "./token-search-result";

type PaymentTokenModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  chains: Chain[];
  onModalClose: () => void;
  isLoadingChains: boolean;
}

const PaymentTokenModal = ({ isOpen, onOpenChange, chains, onModalClose, isLoadingChains }: PaymentTokenModalProps) => {
  const { selectedChain, setSelectedChain, setIsSearching, isSearching } = usePaymentWidget();
  const [innerSelectedChain, setInnerSelectedChain] = useState(selectedChain);
  const [searchInput, setSearchInput] = useState('');

  const onChainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const chainId = e.currentTarget.getAttribute("data-chain")!;
    const chosenChain = chains.find(chain => chain.networkId === parseInt(chainId));
    setInnerSelectedChain(chosenChain!);
  }
  const onTokenClick = async () => {
    setSelectedChain(innerSelectedChain);
    onModalClose();
    //@ts-expect-error types are correct
    await switchChain(config, { chainId: innerSelectedChain.networkId });
  }

  useEffect(() => {
    setInnerSelectedChain(selectedChain);
  }, [selectedChain])

  return (
    <Modal
      className="dark:bg-default-100 max-w-[420px] mx-0 my-0 grounded-t-lg rounded-b-none sm:rounded-lg"
      classNames={{ backdrop: "bg-black/50", closeButton: "sm:top-2 sm:right-2.5 rounded-none" }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => setIsSearching(false)}
      size='md'
      scrollBehavior="inside"
      radius='none'
      closeButton={<IoCloseSharp size="40" />}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 py-3 px-3 sm:py-4 sm:px-6" >
          <span className="text-medium font-bold">Select pay token</span>
        </ModalHeader>
        <Divider />
        <div className='px-3 sm:px-6 pt-5'>
          <TokenSearchInput setSearchInput={setSearchInput} searchInput={searchInput} />
          <p className="text-small font-bold pr-3 pt-3 pb-1">
            Select network: {innerSelectedChain?.name}
          </p>
          {isLoadingChains ?
            <div className="p-0 py-2 grid place-items-center"><Spinner aria-label="Chains Loading" color='default' /></div>
            :
            <ScrollableChainList chains={chains} innerSelectedChain={innerSelectedChain} onChainClick={onChainClick} />
          }
          <p className="text-small font-bold pr-3 pt-3 pb-1">
            {isSearching ? 'Available Search Tokens' : 'Available Tokens'}
          </p>
        </div>
        <ModalBody className="px-0 py-0 sm:pb-5 sm:px-3">
          {!isSearching ?
            (
              <InfiniteScrollTokenList chainId={innerSelectedChain?.networkId} onTokenClick={onTokenClick} />
            ) : (
              <TokenSearchResult
                chainId={innerSelectedChain?.networkId}
                onTokenClick={onTokenClick}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            )}
        </ModalBody>
      </ModalContent>
    </Modal >
  )
}

export default PaymentTokenModal;