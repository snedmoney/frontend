import React, { useState, useEffect } from "react";
import { useAccount, usePublicClient, useReadContract } from "wagmi";
import { Address, erc20Abi, parseUnits } from "viem";
import { Button } from "@nextui-org/button";

import abi from "@/config/abi";
import useTransaction from "@/hooks/use-transaction";
import { getWormholeChainId } from "@/lib/wormhole";
import {
  getPancakeswapRouter,
  getPaymentContract,
  getUniswapQuoter,
  getUniswapRouter,
  getUSDT,
  getWxUSDT,
  RouterConfig,
} from "@/lib/contract-address";
import { useSwapV3Quote } from "@/hooks/use-quotation";
import { Token } from "@/providers/paymentWidget/paymentWidgetContext";
import { addressToBytes32, generateRandomBytes32 } from "@/lib/utils";
import TransactionModal from "@/components/transactionModal/transaction-modal";
import { apiClient } from "@/config/api";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  isLoading,
  children,
}) => (
  <Button
    fullWidth
    className="bg-foreground text-background"
    disabled={disabled}
    isLoading={isLoading}
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
  const [isOpen, setIsOpen] = useState(false);
  const { address, chainId } = useAccount();
  const client = usePublicClient();

  const paymentContract = getPaymentContract(chainId);

  const wxUsdt = getWxUSDT(chainId);
  const usdt = getUSDT(chainId);

  // TODO: Replace this with the tokenOut from the config.
  const usdtToken: Token = {
    chainId: chainId as number,
    chainName: "",
    decimals: chainId === 56 ? 18 : 6,
    id: 100,
    logoURI: "Some logo",
    name: "USDT",
    symbol: "USDT",
    address: usdt as Address,
  };

  const wxUsdtToken = wxUsdt as Address;

  const uniswapQuoter = getUniswapQuoter(chainId) as Address;

  const uniswapRouter = getUniswapRouter(chainId) as RouterConfig;

  const pancakeswapRouter = getPancakeswapRouter(chainId) || uniswapRouter;

  const isUniswapEnabled =
    tokenIn && usdtToken && tokenIn.address !== usdtToken.address
      ? true
      : false;

  const { data: uniswapQuoteData, isFetching: isFetchingQuote } =
    useSwapV3Quote("uniswap", {
      tokenIn,
      tokenOut: usdtToken,
      amountIn: amountIn,
      quoter: uniswapQuoter,
      enabled: isUniswapEnabled,
    });

  // Base
  const destinationChainId = 8453;
  // const destinationChainId = 42161;
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

  const txParams = useTransaction();

  const {
    isPending: isPaymentPending,
    isSuccess: isPaymentSuccess,
    writeContract: paymentWriteContract,
    hash,
  } = txParams;

  const [paymentId, setPaymentId] = useState(generateRandomBytes32());

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

  useEffect(() => {
    if (isPaymentSuccess) {
      apiClient.post("/transactions", {
        id: paymentId,
        sourceChainId: chainId,
        sourceTransactionHash: hash,
        type: "tip",
      });

      setPaymentId(generateRandomBytes32());
    }
  }, [isPaymentSuccess]);

  useEffect(() => {
    if (isPaymentPending || isPaymentSuccess) {
      setIsOpen(true);
    }
  }, [isPaymentPending, isPaymentSuccess]);

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

  const handlePayment = async () => {
    if (!decimals || !amountIn || !destinationPaymentContract) {
      return;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const deadline = currentTimestamp + 60 * 20;

    const amountInWei = parseUnits(amountIn, decimals);

    const swapParams: {
      router: Address;
      route: string[];
      fees: number[];
      amountOutMinimum: bigint;
      deadline: bigint;
      swapType: number;
    }[] = [];

    if (isUniswapEnabled && uniswapQuoteData?.route) {
      swapParams.push({
        router: uniswapRouter.address,
        route: uniswapQuoteData.route.path,
        fees: uniswapQuoteData.route.fees,
        amountOutMinimum: uniswapQuoteData.quote,
        deadline: BigInt(deadline),
        swapType: uniswapRouter.swapType,
      });
    }

    if (chainId !== destinationChainId) {
      const quote = uniswapQuoteData?.quote ?? amountInWei;

      const wxUsdtDecimals =
        (await client?.readContract({
          address: wxUsdtToken,
          abi: erc20Abi,
          functionName: "decimals",
        })) ?? 6;

      swapParams.push({
        router: pancakeswapRouter.address,
        route: [usdtToken.address, wxUsdtToken],
        fees: [100],
        amountOutMinimum:
          (quote * 98n) /
          100n /
          BigInt(10 ** (usdtToken.decimals - wxUsdtDecimals)),
        deadline: BigInt(deadline),
        swapType: pancakeswapRouter.swapType,
      });
    }

    const lastSwapParams = swapParams[swapParams.length - 1];
    const tokenOut = lastSwapParams.route[lastSwapParams.route.length - 1];

    const paymentParams = {
      paymentId,
      destAddress: address,
      tokenIn: tokenIn!.address,
      tokenOut: tokenOut,
      amountIn: amountInWei,
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
        <ButtonComponent isLoading={isApprovePending} onClick={handleApprove}>
          Approve {amountIn} {tokenIn.symbol}
        </ButtonComponent>
      ) : (
        <ButtonComponent
          disabled={isFetchingQuote}
          isLoading={isPaymentPending}
          onClick={handlePayment}
        >
          Send {amountIn} {tokenIn.symbol}
        </ButtonComponent>
      )}
      <TransactionModal
        amountIn={amountIn}
        isOpen={isOpen}
        txParams={txParams}
        onClose={() => setIsOpen(false)}
      />
    </React.Fragment>
  );
};

export default PaymentButtonWrapper;