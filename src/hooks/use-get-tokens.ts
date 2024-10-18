import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { apiClient } from '../config/api';

export type Token = {
  chainId: number;
  chainName: string;
  decimals: number;
  id: number;
  logoURI: string;
  name: string;
  symbol: string;
  tokenAddress: string;
};

const fetchTokens = async (chainId: number, page: number = 1): Promise<Token[]> => {
  try {
    const response: AxiosResponse<Token[]> = await apiClient.get(`/tokens/chains/${chainId}`, {
      params: {
        page: page,
        per_page: 30
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch tokens');
    }
    throw new Error('Failed to fetch tokens');
  }
};


const useGetTokens = (chainId: Token['chainId']) => {
  return useInfiniteQuery<Token[], Error>({
    queryKey: ['tokens', chainId],
    queryFn: ({ pageParam = 1 }) => fetchTokens(chainId, pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      const currentPage = pages.length;
      return lastPage.length > 0 ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!chainId,
  });
};
export default useGetTokens;