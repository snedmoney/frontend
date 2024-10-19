import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { apiClient } from '../config/api';
import { useEffect } from 'react';
import type { Token } from '@/providers/paymentWidget/paymentWidgetContext';

const searchTokens = async (chainId: number, searchParam: string): Promise<Token[]> => {
  try {
    const response: AxiosResponse<Token[]> = await apiClient.get(`/tokens/chains/${chainId}`, {
      params: {
        search: searchParam,
      }
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to search tokens');
    }
    throw new Error('Failed to search tokens');
  }
};

const useSearchTokens = (chainId: Token['chainId'], searchParam: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['tokens', chainId, searchParam] });
  }, [chainId, searchParam, queryClient]);

  return useQuery<Token[], Error>({
    queryKey: ['tokens', chainId, searchParam],
    queryFn: () => searchTokens(chainId, searchParam),
    enabled: !!chainId && !!searchParam,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useSearchTokens;