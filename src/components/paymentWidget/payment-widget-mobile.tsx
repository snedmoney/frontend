import React, { ComponentProps } from "react";
import { Button } from "@nextui-org/react";
import { useAccount } from "wagmi";
import clsx from "clsx";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import UserPaymentInput from "./userPaymentInput";
import PaymentButtonWrapper from "./payment-button";

import useShareModal from "@/hooks/use-share-modal";
import usePaymentWidget from "@/hooks/use-payment-widget";
import { TransactionType } from "@/types";

type PaymentWidgetMobileProps = ComponentProps<"div"> & {
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  handleClick?: () => void;
  name?: string;
  message?: string;
  destinationChainId?: number;
  destinationWalletAddress?: string;
  transactionType?: TransactionType;
  linkId?: string;
};

const PaymentWidgetMobile = ({
  headerContent,
  bodyContent,
  footerContent,
  className,
  handleClick,
  name,
  message,
  destinationChainId,
  destinationWalletAddress,
  transactionType,
  linkId,
}: PaymentWidgetMobileProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { tokenAmount, selectedToken } = usePaymentWidget();
  const openShareModal = useShareModal();
  const onClick = () => {
    if (!isConnected) openConnectModal?.();
    handleClick?.();
    //TODO: check balance, select routes, and stuff
  };

  return (
    <div className={clsx("w-full", className)}>
      {headerContent}
      <div className="flex flex-col gap-4">
        <UserPaymentInput />
        {bodyContent}
        {!isConnected && (
          <Button
            fullWidth
            className="bg-foreground text-background"
            size="lg"
            onClick={onClick}
          >
            <span className="font-bold">Connect Wallet</span>
          </Button>
        )}
        {isConnected && destinationChainId && destinationWalletAddress && (
          <PaymentButtonWrapper
            amountIn={tokenAmount}
            destinationChainId={destinationChainId}
            destinationWalletAddress={destinationWalletAddress}
            linkId={linkId}
            message={message}
            name={name}
            tokenIn={selectedToken}
            transactionType={transactionType}
          />
        )}
        <Button fullWidth size="lg" variant="bordered" onClick={openShareModal}>
          Share
        </Button>
      </div>
      {footerContent}
    </div>
  );
};

export default PaymentWidgetMobile;
