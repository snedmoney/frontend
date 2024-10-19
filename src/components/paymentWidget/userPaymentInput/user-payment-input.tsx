import {
  Card,
  CardBody,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import PaymentTokenModal from "../payment-token-modal";
import useGetChains from "@/hooks/use-get-chains";
import usePaymentWidget from "@/hooks/use-payment-widget";
import SelectedChain from "../selected-chain";
import SelectedToken from "../selected-token";

const UserPaymentInput = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { data: chains, isLoading } = useGetChains();
  const { setSelectedChain } = usePaymentWidget();

  useEffect(() => {
    if (!isLoading) setSelectedChain(chains?.[0]!);
  }, [isLoading]);

  return (
    <>
      <Card radius="sm" shadow="sm">
        <CardBody className="w-full px-4 py-5 sm:p-5 bg-default-200">
          <SelectedChain isLoading={isLoading} onOpen={onOpen} />
          <div className="flex content-between gap-2">
            <SelectedToken onOpen={onOpen} />
            {/* //TODO: input needs validation and display error message */}
            <Input
              className="remove-stepper"
              classNames={{
                input: ["text-right", "text-2xl", "font-bold"],
                innerWrapper: ["focus:bg-transparent"],
                inputWrapper: [
                  "bg-transparent",
                  "pr-0",
                  "shadow-none",
                  "group-data-[focus=true]:bg-transparent",
                ],
              }}
              color="default"
              placeholder="0.0"
              size="lg"
              type="number"
            />
          </div>
          <p className="text-right text-foreground-600">$1234</p>
        </CardBody>
      </Card>
      <PaymentTokenModal
        chains={chains!}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onModalClose={onClose}
      />
    </>
  );
};

export default UserPaymentInput;