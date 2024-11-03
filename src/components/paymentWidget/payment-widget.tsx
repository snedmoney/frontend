import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import UserPaymentInput from "./userPaymentInput";
import PaymentButtonWrapper from "./payment-button";

import usePaymentWidget from "@/hooks/use-payment-widget";
import useShareModal from "@/hooks/use-share-modal";
import { TransactionType } from "@/types";

type PaymentWidgetProps = {
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

const PaymentWidget = ({
  headerContent,
  bodyContent,
  footerContent,
  name,
  message,
  destinationChainId,
  destinationWalletAddress,
  linkId,
  handleClick,
  transactionType,
}: PaymentWidgetProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { tokenAmount, selectedToken } = usePaymentWidget();
  const openShareModal = useShareModal();

  console.log(
    `sending from chain ID ${destinationChainId} to address ${destinationWalletAddress} associated with the link ID ${linkId}`,
    name,
  );

  const onClick = () => {
    if (!isConnected) openConnectModal?.();
    handleClick?.();
    //TODO: check balance, select routes, and stuff
  };

  return (
    <Card
      className="min-w-[375px] max-w-[480px] w-full px-0 py-0 bg-transparent shadow-none md:bg-default-50 md:shadow-md md:rounded-large md:px-5 md:py-4"
      shadow="md"
    >
      <CardHeader className="px-4 pt-0 md:p-3">{headerContent}</CardHeader>
      <CardBody className="px-4 md:p-3">
        <UserPaymentInput />
        {bodyContent}
      </CardBody>
      <CardFooter className="flex-col gap-4 px-4 md:p-3">
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
        {footerContent}
      </CardFooter>
    </Card>
  );
};

export default PaymentWidget;
