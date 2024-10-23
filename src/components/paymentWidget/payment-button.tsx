import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Address, erc20Abi, parseUnits } from "viem";
import { Button } from "@nextui-org/button";

import abi from "@/config/abi";
import useTransaction from "@/hooks/use-transaction";
import { getWormholeChainId } from "@/lib/wormhole";
import { getPaymentContract } from "@/lib/contract-address";
import { useUniswapV3Quote } from "@/hooks/use-quotation";
import { Token } from "@/providers/paymentWidget/paymentWidgetContext";
import { addressToBytes32, generateUUID } from "@/lib/utils";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
}) => (
  <Button
    fullWidth
    className="bg-foreground text-background"
    disabled={disabled}
    radius="full"
    size="lg"
    style={{
      opacity: disabled ? "0.25" : "1",
    }}
    onClick={onClick}
  >
    <span className="font-bold">{children}</span>
  </Button>
);

interface PaymentButtonWrapperProps {
  tokenIn?: Token;
  amountIn?: string;
}

const PaymentButtonWrapper: React.FC<PaymentButtonWrapperProps> = ({
  tokenIn,
  amountIn,
}) => {
  const { address, chainId } = useAccount();

  const paymentContract = getPaymentContract(chainId);

  // TODO: Replace this with the tokenOut from the config.
  const tokenOut: Token = {
    chainId: chainId as number,
    chainName: "Arbitrum",
    decimals: 6,
    id: 100,
    logoURI: "Some logo",
    name: "USDT",
    symbol: "USDT",
    address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
  };

  const { data: quoteData } = useUniswapV3Quote({
    tokenIn,
    tokenOut,
    amountIn: amountIn,
  });

  // Optimism
  const destinationChainId = 10;
  const destinationPaymentContract = getPaymentContract(destinationChainId);
  const wormholeDestinationChainId = getWormholeChainId(destinationChainId);

  const [isApprovalNeeded, setIsApprovalNeeded] = useState<boolean>(false);

  const { data: allowance = BigInt(0), refetch: refetchAllowance } =
    useReadContract({
      address: tokenIn!.address as Address,
      abi: erc20Abi,
      functionName: "allowance",
      account: address,
      query: {
        enabled: !!tokenIn?.address && !!paymentContract,
      },
      args: [address!, paymentContract!],
    });

  const { data: decimals } = useReadContract({
    address: tokenIn!.address as Address,
    abi: erc20Abi,
    functionName: "decimals",
    query: {
      enabled: !!tokenIn?.address && !!paymentContract,
    },
  });

  const {
    isPending: isApprovePending,
    isSuccess: isApprovalSuccess,
    writeContract: approveWriteContract,
  } = useTransaction();

  const {
    isPending: isPaymentPending,
    isSuccess: isPaymentSuccess,
    writeContract: paymentWriteContract,
  } = useTransaction();

  useEffect(() => {
    if (!decimals || !amountIn) return;

    const amount = parseUnits(amountIn, decimals);

    setIsApprovalNeeded(allowance < amount);
  }, [amountIn, allowance, decimals]);

  useEffect(() => {
    if (isApprovalSuccess) {
      refetchAllowance();
    }
  }, [isApprovalSuccess]);

  const handleApprove = () => {
    if (!decimals || !amountIn || !tokenIn) return;

    const amount = parseUnits(amountIn, decimals);

    approveWriteContract({
      address: tokenIn.address as Address,
      abi: erc20Abi,
      functionName: "approve",
      account: address,
      args: [paymentContract!, amount],
    });
  };

  const handlePayment = () => {
    if (
      !decimals ||
      !amountIn ||
      !quoteData?.route ||
      !destinationPaymentContract
    ) {
      return;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const deadline = currentTimestamp + 60 * 20;

    const amountInWei = parseUnits(amountIn, decimals);

    const swapParams = {
      route: quoteData.route.path,
      fees: quoteData.route.fees,
      amountIn: amountInWei,
      amountOutMinimum: quoteData.quote,
      deadline: BigInt(deadline),
    };

    const paymentParams = {
      paymentId: generateUUID(),
      destAddress: address,
      tokenIn: tokenIn!.address,
      tokenOut: tokenOut!.address,
    };

    const bridgeParams = {
      destWormChainId: wormholeDestinationChainId,
      bridgeRecipient: addressToBytes32(destinationPaymentContract),
    };

    paymentWriteContract({
      address: paymentContract!,
      abi,
      functionName: "makePayment",
      account: address,
      args: [swapParams, paymentParams, bridgeParams],
    });
  };

  if (!amountIn || +amountIn === 0 || !tokenIn?.address) {
    return <ButtonComponent disabled>Send</ButtonComponent>;
  }

  return (
    <React.Fragment>
      {isApprovalNeeded ? (
        <ButtonComponent disabled={isApprovePending} onClick={handleApprove}>
          Approve {amountIn} {tokenIn.symbol}
        </ButtonComponent>
      ) : (
        <ButtonComponent disabled={isPaymentPending} onClick={handlePayment}>
          Send {amountIn} {tokenIn.symbol}
        </ButtonComponent>
      )}
    </React.Fragment>
  );
};

export default PaymentButtonWrapper;
