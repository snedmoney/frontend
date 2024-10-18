import { Card, CardBody, Input, Button, useDisclosure, Skeleton } from "@nextui-org/react";
import { FaCaretDown } from "react-icons/fa6";
import PaymentTokenModal from '../payment-token-modal';
import { useState, useEffect } from "react";
import useGetChains from "@/hooks/use-get-chains";
import useGetTokens from "@/hooks/use-get-tokens";

const UserPaymentInput = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: chains, isLoading } = useGetChains();
  const [selectedChainId, setSelectedChainId] = useState(chains?.[0].networkId);
  const selectedChainInfo = chains?.find(chain => chain.networkId === selectedChainId);
  const { data: tokens } = useGetTokens(selectedChainId!);
  console.log(tokens)
  useEffect(() => {
    if (!isLoading)
      setSelectedChainId(chains?.[0].networkId);
  }, [isLoading])

  return (
    <>
      <Card radius='sm' shadow='sm'>
        <CardBody className="w-full px-4 py-5 sm:p-5 bg-default-200">
          {isLoading ? <Skeleton className="w-full h-[40px]"/> :
            <Button className="inline-flex justify-start items-center gap-1 text-sm cursor-pointer px-0" data-hover='false' onClick={onOpen} variant='light'>
              <p className="text-foreground-600 p-0">From </p>
              <img src={selectedChainInfo?.iconURL} height='16' width='16' alt={selectedChainInfo?.name} />
              <p>{selectedChainInfo?.name}</p>
              <FaCaretDown size="8" className="text-foreground-600" />
            </Button>
          }
          <div className="flex content-between gap-2">
            <Button className="flex items-center gap-0" data-hover='false' onClick={onOpen} variant='light'>
              <span>Icon</span>
              <span className="pl-1 text-xl"><b>ETH</b></span>
              <span className="pl-1 text-foreground-600"><FaCaretDown size='12' /></span>
            </Button>
            {/* //TODO: input needs validation and display error message */}
            <Input className="remove-stepper" classNames={{
              input: [
                "text-right",
                "text-2xl",
                "font-bold"
              ],
              innerWrapper: ['focus:bg-transparent'],
              inputWrapper: [
                "bg-transparent",
                "pr-0",
                "shadow-none",
                "group-data-[focus=true]:bg-transparent",
              ],
            }} placeholder='0.0' type='number' size='lg' color='default' />
          </div>
          <p className="text-right text-foreground-600">$1234</p>
        </CardBody>
      </Card>
      <PaymentTokenModal isOpen={isOpen} onOpenChange={onOpenChange} selectedChainId={selectedChainId ?? 1} setSelectedChainId={setSelectedChainId} chains={chains!} />
    </>
  );
}

export default UserPaymentInput;