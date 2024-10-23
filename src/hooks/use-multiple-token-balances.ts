import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi } from "viem";
import { formatUnits } from "viem";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/config/api";

type MoralisPrice = {
  usdPrice: number;
  tokenAddress: string;
};

export default function useMultipleTokenBalances(tokens: string[]) {
  const { address } = useAccount();

  const balanceContracts = tokens.map((tokenAddress) => ({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  }));

  const decimalContracts = tokens.map((tokenAddress) => ({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "decimals",
  }));

  const {
    data: balanceData,
    isError: isBalanceError,
    isFetching: isBalanceFetching,
  } = useReadContracts({
    contracts: balanceContracts,
  });

  const {
    data: decimalData,
    isError: isDecimalError,
    isFetching: isDecimalFetching,
  } = useReadContracts({
    contracts: decimalContracts,
  });

  const formatBalance = (balance: bigint, decimals: number): string => {
    const formattedBalance =
      balance && decimals ? formatUnits(balance, decimals) : "";

    const parsedBalance = parseFloat(formattedBalance);

    return parsedBalance === 0 || isNaN(parsedBalance)
      ? ""
      : parsedBalance.toFixed(5);
  };

  const fetchPrices = async (tokens: string[]) => {
    const chunkSize = 25;
    const pricePromises = [];

    for (let i = 0; i < tokens.length; i += chunkSize) {
      const chunk = tokens.slice(i, i + chunkSize);

      pricePromises.push(
        apiClient.post("/price", {
          chain: "0xa4b1",
          tokens: chunk,
        })
      );
    }

    const responses = await Promise.all(pricePromises);
    const allPrices = responses.flatMap(
      (response) => response.data?.tokenPrices ?? []
    );

    return allPrices;
  };

  const {
    data: priceData,
    isError: isPriceError,
    isFetching: isPriceFetching,
  } = useQuery<MoralisPrice[], Error>({
    queryKey: ["tokenPrices", tokens],
    queryFn: () => fetchPrices(tokens),
    enabled: tokens.length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const tokensBalance =
    balanceData && decimalData
      ? balanceData.map((balance, index) => {
          const formattedBalance = formatBalance(
            balance.result as bigint,
            decimalData[index].result as number
          );
          const tokenAddress = tokens[index];
          const tokenPrice = priceData?.find(
            (item) => item.tokenAddress === tokenAddress
          )?.usdPrice;

          const amountInUSD =
            !isNaN(parseFloat(formattedBalance)) && tokenPrice
              ? (parseFloat(formattedBalance) * tokenPrice).toFixed(2)
              : "";

          return {
            address: tokenAddress,
            balance: formattedBalance,
            price: tokenPrice,
            amountInUSD: amountInUSD,
          };
        })
      : [];

  const isError = isBalanceError || isDecimalError || isPriceError;
  const isFetching = isBalanceFetching || isDecimalFetching || isPriceFetching;

  return { tokensBalance, isError, isFetching };
}
