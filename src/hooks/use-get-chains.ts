import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { apiClient } from '../config/api';

export type Chain = {
  networkId: number;
  name: string;
  allowed: boolean;
  iconURL: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  explorerURL: string;
}

const fetchChains = async (): Promise<Chain[]> => {
  try {
    const response: AxiosResponse<Chain[]> = await apiClient.get('/chains');
    const order = [
      "Ethereum",
      "Arbitrum",
      "Optimism",
      "Base",
      "BNB Smart Chain",
      "Polygon",
      "Avalanche C-Chain",
      "Linea",
      "Scroll",
      "Fantom Opera",
      "Blast",
      "Aurora"
    ];

    response.data.sort((a: Chain, b: Chain) => {
      const indexA = order.indexOf(a.name);
      const indexB = order.indexOf(b.name);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return 0;
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch chains');
    }
    throw new Error('Failed to fetch chains');
  }
};


const useGetChains = () => {
  return useQuery<Chain[]>({
    queryKey: ['chains'],
    queryFn: fetchChains,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export default useGetChains;