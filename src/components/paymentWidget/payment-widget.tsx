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

type PaymentWidgetProps = {
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  handleClick?: () => void;
};

//TODO: Input needs some validation (disable send button), need to check balance when clicking on submit button, need to get token price
// waiting for balance from backend, balance text should be hidden when selected token is empty or wallet is not connected
const PaymentWidget = ({
  headerContent,
  bodyContent,
  footerContent,
  handleClick,
}: PaymentWidgetProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const onClick = () => {
    if (!isConnected) openConnectModal?.();
    handleClick?.();
    //TODO: check balance, select routes, and stuff
  }

  return (
    <Card className="min-w-[375px] max-w-[480px] w-full px-0 py-0 bg-transparent shadow-none md:bg-default-50 md:shadow-md md:rounded-large md:px-5 md:py-4" shadow="md">
      <CardHeader className='px-4 pt-0 md:p-3'>
        {headerContent}
      </CardHeader>
      <CardBody className='px-4 md:p-3'>
        <UserPaymentInput />
        {bodyContent}
      </CardBody>
      <CardFooter className='px-4 md:p-3'>
        <Button
          fullWidth
          className='bg-foreground text-background'
          size="lg"
          onClick={onClick}
        >
          <span className="font-bold">
            {isConnected ? "Send $Amount $Symbol" : "Connect Wallet"}
          </span>
        </Button>
        {footerContent}
      </CardFooter>
    </Card>
  );
};

export default PaymentWidget;