import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useAccount } from 'wagmi';
import UserPaymentInput from "./userPaymentInput";
import { useConnectModal } from '@rainbow-me/rainbowkit';

type PaymentWidgetProps = {
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const PaymentWidget = ({ headerContent, bodyContent, footerContent }: PaymentWidgetProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <Card className="max-w-[450px] w-full bg-default-50 px-5 py-4" shadow="md">
      <CardHeader>
        {headerContent}
        {/* {title ? title : <p className="sm:text-2xl text-lg">Support $CreatorName</p>} */}
      </CardHeader>
      <CardBody>
        <UserPaymentInput />
        {bodyContent}
      </CardBody>
      <CardFooter>
        <Button color="primary" fullWidth radius='full' size='lg' onClick={!isConnected ? () => openConnectModal?.() : undefined}>
          <span className='font-bold'>{isConnected ? 'Send $Amount $Symbol' : 'Connect Wallet'}</span>
        </Button>
        {footerContent}
      </CardFooter>
    </Card>
  );
}

export default PaymentWidget;