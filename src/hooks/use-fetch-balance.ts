import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { parseAbi } from 'viem/utils';
import { formatUnits } from 'viem';
import getPublicClient from '@/config/viemPublicClient';

const erc20ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const fetchTokenBalance = async (chainId: number, tokenAddress: `0x${string}`, walletAddress: `0x${string}`) => {
  try {
    const client = getPublicClient(chainId);

    const calls = [
      {
        abi: parseAbi(erc20ABI),
        functionName: 'balanceOf',
        args: [walletAddress],
        address: tokenAddress,
      },
      {
        abi: parseAbi(erc20ABI),
        functionName: 'decimals',
        args: [],
        address: tokenAddress,
      }
    ];

    const result = await client.multicall({ contracts: calls });

    const balanceResult = result[0];
    const decimalsResult = result[1];

    if (balanceResult.result === undefined || decimalsResult.result === undefined) {
      throw new Error('Failed to fetch balance or decimals');
    }

    const balance = formatUnits(balanceResult.result as bigint, decimalsResult.result as number);

    return balance;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw new Error('Error fetching token balance');
  }
};

const useFetchBalance = (tokenAddress: `0x${string}`) => {
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['tokenBalance', tokenAddress, chainId, walletAddress],
    queryFn: () => fetchTokenBalance(chainId, tokenAddress, walletAddress!),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!chainId && !!tokenAddress && !!walletAddress,
  });
};

export default useFetchBalance;