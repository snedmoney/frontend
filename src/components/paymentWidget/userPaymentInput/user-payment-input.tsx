import {
  Card,
  CardBody,
  Input,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useChainId, useBalance, useAccount } from "wagmi";
import { formatUnits } from "viem";

import PaymentTokenModal from "../payment-token-modal";
import SelectedChain from "../selected-chain";
import SelectedToken from "../selected-token";
import CustomConnectButton from "../custom-connect-button";
import useFetchBalance from "@/hooks/use-fetch-balance";
import useGetChains from "@/hooks/use-get-chains";
import usePaymentWidget from "@/hooks/use-payment-widget";

const UserPaymentInput = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const chainId = useChainId();
  const { data, isLoading } = useGetChains();
  const initialChain = data?.chains.find((chain) => chain.id === chainId);
  const { selectedToken, setTokenAmount, tokenAmount, setSelectedChain } =
    usePaymentWidget();
  const { data: fetchedBalance, isLoading: isTokenBalanceLoading } =
    useFetchBalance(selectedToken.address as `0x${string}`);
  const [balance, setBalance] = useState("");
  const ETHTokenAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  const { address: walletAddress } = useAccount();
  const { data: ETHBalance, isLoading: isETHBalanceLoading } = useBalance({
    address: walletAddress,
  });

  useEffect(() => {
    if (!isLoading) setSelectedChain(initialChain!);
  }, [isLoading, chainId]);

  useEffect(() => {
    if (selectedToken.address === ETHTokenAddress) {
      if (ETHBalance) {
        setBalance(formatUnits(ETHBalance.value, ETHBalance.decimals));
      }
    } else {
      if (fetchedBalance) {
        setBalance(fetchedBalance);
      }
    }
  }, [selectedToken.address, ETHBalance, fetchedBalance]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(e.target.value);
  };

  const handleBalanceClick = () => {
    setTokenAmount(balance);
  };

  const error_condition = false;

  return (
    <>
      <Card radius="sm" shadow="sm">
        <CardBody className="w-full px-4 py-5 sm:p-5 bg-default-200">
          <div className="flex justify-between gap-2 items-center">
            <SelectedChain isLoading={isLoading} onOpen={onOpen} />
            <CustomConnectButton />
          </div>
          <div className="flex content-between gap-2">
            <SelectedToken onOpen={onOpen} />
            {/* //TODO: input needs validation and display error message */}
            <Input
              className="remove-stepper"
              classNames={{
                input: [
                  "text-right",
                  "text-2xl",
                  "font-bold",
                  `${error_condition && "border-danger border-1"}`,
                ],
                innerWrapper: ["focus:bg-transparent"],
                inputWrapper: [
                  "bg-transparent",
                  "pr-0",
                  "shadow-none",
                  "group-data-[focus=true]:bg-transparent",
                  "data-[hover=true]:bg-transparent",
                ],
              }}
              color="default"
              placeholder="0.0"
              radius="none"
              size="lg"
              type="number"
              value={tokenAmount || ""}
              onChange={handleInputChange}
            />
          </div>
          {error_condition && <p className="text-right text-danger">err msg</p>}
          <div className="flex justify-between items-center">
            <div className="text-foreground-500 font-bold text-sm flex items-center gap-2">
              <div>Balance:</div>
              {isETHBalanceLoading || isTokenBalanceLoading ? (
                <Skeleton className="rounded-full w-[80px] h-[16px]" />
              ) : (
                <>
                  <span
                    className="text-md hover:cursor-pointer"
                    onClick={handleBalanceClick}
                  >
                    {balance.slice(0, 8)}
                  </span>
                  <span className="text-md"> {selectedToken?.symbol}</span>
                </>
              )}
            </div>
            <p className="text-right text-foreground-500">-</p>
          </div>
        </CardBody>
      </Card>
      <PaymentTokenModal
        chains={data?.chains!}
        isLoadingChains={isLoading}
        isOpen={isOpen}
        onModalClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default UserPaymentInput;
