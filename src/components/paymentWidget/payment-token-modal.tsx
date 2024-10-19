import { Modal, ModalContent, ModalHeader, ModalBody, Divider } from "@nextui-org/react";
import { IoCloseSharp } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import type { Chain } from '@/providers/paymentWidget/paymentWidgetContext';
import InfiniteScrollTokenList from "./infinite-scrolling-token-list";
import TokenSearchInput from "./token-search-input";
import usePaymentWidget from "@/hooks/use-payment-widget";
import ScrollableChainList from "./scrollable-chain-list";

type PaymentTokenModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  chains: Chain[];
  onModalClose: () => void;
}

const PaymentTokenModal = ({ isOpen, onOpenChange, chains, onModalClose }: PaymentTokenModalProps) => {
  const { selectedChain, setSelectedChain } = usePaymentWidget();
  const [innerSelectedChain, setInnerSelectedChain] = useState(selectedChain);
  const onChainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const chainId = e.currentTarget.getAttribute("data-chain")!;
    const chosenChain = chains.find(chain => chain.networkId === parseInt(chainId));
    setInnerSelectedChain(chosenChain!);
  }
  const onTokenClick = () => {
    setSelectedChain(innerSelectedChain);
    onModalClose();
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
          <TokenSearchInput />
          <p className="text-small font-bold pr-3 pt-3 pb-1">
            Select network: {innerSelectedChain?.name}
          </p>
          <ScrollableChainList chains={chains} innerSelectedChain={innerSelectedChain} onChainClick={onChainClick} />
          <p className="text-small font-bold pr-3 pt-3 pb-1">
            Available Tokens
          </p>
        </div>
        <ModalBody className="px-0 py-0 sm:pb-5 sm:px-3">
          <InfiniteScrollTokenList chainId={innerSelectedChain.networkId} onTokenClick={onTokenClick} />
        </ModalBody>
      </ModalContent>
    </Modal >
  )
}

export default PaymentTokenModal;