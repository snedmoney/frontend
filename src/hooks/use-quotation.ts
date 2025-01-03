import { useQuery } from "@tanstack/react-query";
import { parseUnits, decodeFunctionResult, encodeFunctionData } from "viem";
import { Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { useDebounce } from "use-debounce";

import usePaymentWidget from "./use-payment-widget";

import QUOTER_ABI from "@/config/quoter-abi";
import { getWethAddress } from "@/lib/contract-address";
import {
  Token,
  TokenWithBalance,
} from "@/providers/paymentWidget/paymentWidgetContext";

interface QuoteParams {
  tokenIn?: Token;
  tokenOut?: Token;
  amountIn?: string;
  quoter: Address;
  enabled: boolean;
}

type Route = {
  path: string[];
  fees: number[];
};

export function encodePath(path: string[], fees: number[]): `0x${string}` {
  if (path.length !== fees.length + 1) {
    throw new Error("path/fee lengths do not match");
  }

  let encoded = "0x";

  for (let i = 0; i < fees.length; i++) {
    encoded += path[i].slice(2);
    encoded += fees[i].toString(16).padStart(6, "0");
  }
  encoded += path[path.length - 1].slice(2);

  return encoded as `0x${string}`;
}

async function fetchQuote(
  client: ReturnType<typeof usePublicClient>,
  selectedToken: TokenWithBalance,
  { quoter, tokenIn, tokenOut, amountIn }: Required<QuoteParams>,
) {
  const chainId = await client!.getChainId();

  const wethAddress = getWethAddress(chainId) as Address;

  const routes: Route[] = [
    { path: [tokenIn.address, tokenOut.address], fees: [3000] },
    {
      path: [tokenIn.address, wethAddress, tokenOut.address],
      fees: [3000, 3000],
    },
  ];

  const amountInWei = parseUnits(amountIn, tokenIn.decimals);

  let bestQuote = BigInt(0);
  let bestRoute: Route | undefined = undefined;

  const errors = [];

  if (amountInWei > 0n) {
    for (const route of routes) {
      try {
        const path = encodePath(route.path, route.fees);

        const data = encodeFunctionData({
          abi: QUOTER_ABI,
          functionName: "quoteExactInput",
          args: [path, amountInWei],
        });

        const { data: result } = await client!.call({
          to: quoter,
          data,
        });

        const [amountOut] = decodeFunctionResult({
          abi: QUOTER_ABI,
          functionName: "quoteExactInput",
          data: result as Address,
        }) as [bigint];

        if (amountOut > bestQuote) {
          bestQuote = amountOut;
          bestRoute = route;
        }
      } catch (error) {
        errors.push(error);
      }
    }
  }

  if (errors.length === routes.length) {
    console.error("Error in finding quote", errors);

    const amountOut =
      amountIn && selectedToken.price ? +amountIn * +selectedToken.price : 0;

    const parsedAmountOut = parseUnits(amountOut.toString(), tokenOut.decimals);

    const quote = parsedAmountOut - (parsedAmountOut * BigInt(3)) / BigInt(100);

    return {
      route: routes[0],
      quote: quote,
    };
  }

  return {
    quote: bestQuote,
    route: bestRoute,
  };
}

export function useSwapV3Quote(key: String, params: QuoteParams) {
  const { chainId } = useAccount();
  const client = usePublicClient();
  const { selectedToken } = usePaymentWidget();

  const [debouncedParams] = useDebounce(params, 500);

  const fetchQuoteFn = async () => {
    if (
      debouncedParams.tokenIn?.address &&
      debouncedParams.tokenOut?.address &&
      debouncedParams.amountIn &&
      chainId &&
      client
    ) {
      return fetchQuote(
        client,
        selectedToken,
        debouncedParams as Required<QuoteParams>,
      );
    }
  };

  return useQuery({
    queryKey: [`${key}V3Quote`, debouncedParams],
    queryFn: fetchQuoteFn,
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true,
    enabled:
      !!debouncedParams.tokenIn?.address &&
      !!debouncedParams.tokenOut?.address &&
      !!debouncedParams.amountIn &&
      !!chainId &&
      debouncedParams.enabled &&
      !!client,
  });
}