import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { apiClient } from '../config/api';
import { useEffect } from 'react';

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

export type TokensResponse = {
  data: Token[];
  page: number;
  per_page: number;
  count: number;
}

const fetchTokens = async (chainId: number, page: number = 1): Promise<TokensResponse> => {
  try {
    const response: AxiosResponse<TokensResponse> = await apiClient.get(`/tokens/chains/${chainId}`, {
      params: {
        page: page,
        per_page: 20
      }
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch tokens');
    }
    throw new Error('Failed to fetch tokens');
  }
};

const useGetTokens = (chainId: Token['chainId']) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['tokens', chainId] });
  }, [chainId, queryClient]);

  const manualRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['tokens', chainId] });
  };

  const query =  useInfiniteQuery<TokensResponse, Error>({
    queryKey: ['tokens', chainId],
    queryFn: ({ pageParam = 1 }) => fetchTokens(chainId, pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage.data.length > 0 ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!chainId,
    
  });
  return {
    ...query,
    manualRefetch
  }
};

export default useGetTokens;