import { Address } from "viem";

// Our payment contract
export const getPaymentContract = (
  chainId: number | undefined,
): Address | undefined => {
  if (!chainId) return;

  const contracts: { [key: number]: Address } = {
    42161: "0x938b5f61ab508650ee02f188eab475e8a618f8a5", // Arbitrum
    10: "0x5300b7878d91268f7555851062e2e454d5fc3228", // Optimism
  };

  return contracts[chainId];
};

// Uniswap Quoter V2
// Address reference: https://docs.uniswap.org/contracts/v3/reference/deployments/optimism-deployments
export const getUniswapQuoter = (
  chainId: number | undefined,
): Address | undefined => {
  if (!chainId) return;

  const contracts: { [key: number]: Address } = {
    42161: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
    10: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  };

  return contracts[chainId];
};

// WETH
export const getWethAddress = (
  chainId: number | undefined,
): Address | undefined => {
  if (!chainId) return;

  const contracts: { [key: number]: Address } = {
    42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    10: "0x4200000000000000000000000000000000000006",
  };

  return contracts[chainId];
};
