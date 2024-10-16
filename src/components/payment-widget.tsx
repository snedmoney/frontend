import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useAccount } from 'wagmi';
const PaymentWidget = () => {
  const { isConnected } = useAccount();
  return (
    <Card className="max-w-[450px] w-full bg-default-50 px-5 py-4" shadow="md">
      <CardHeader className="">
        <p className="text-lg">Support $CreatorName</p>
      </CardHeader>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
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