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

type PaymentWidgetProps = {
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  handleClick?: () => void;
};

const PaymentWidget = ({
  headerContent,
  bodyContent,
  footerContent,
  handleClick,
}: PaymentWidgetProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { tokenAmount, selectedToken } = usePaymentWidget();

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
      <CardFooter className="px-4 md:p-3">
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
        {isConnected && (
          <PaymentButtonWrapper
            amountIn={tokenAmount}
            tokenIn={selectedToken}
          />
        )}
        {footerContent}
      </CardFooter>
    </Card>
  );
};

export default PaymentWidget;
