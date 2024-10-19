import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useAccount } from 'wagmi';
import UserPaymentInput from "./userPaymentInput";

type PaymentWidgetProps = {
  title?: React.ReactNode;
}

const PaymentWidget = ({ title }: PaymentWidgetProps) => {
  const { isConnected } = useAccount();

  return (
    <Card className="max-w-[450px] w-full bg-default-50 px-5 py-4" shadow="md">
      <CardHeader>
        {title ? title : <p className="sm:text-2xl text-lg">Support $CreatorName</p>}
      </CardHeader>
      <CardBody>
        <UserPaymentInput />
      </CardBody>
      <CardFooter>
        <Button color="primary" fullWidth radius='full' size='lg'>
          <span className='font-bold'>{isConnected ? 'Send $Amount $Symbol' : 'Connect Wallet'}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PaymentWidget;