import type { Chain } from "@/providers/paymentWidget/paymentWidgetContext";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiClient } from "../config/api";

export type GetChainsResponse = {
  chains: Chain[];
  page: number;
  per_page: number;
  count: number;
};
const fetchChains = async (): Promise<GetChainsResponse> => {
  try {
    const response: AxiosResponse<GetChainsResponse> = await apiClient.get(
      "/chains?per_page=100",
    );
    const order = [
      "Ethereum",
      "Arbitrum",
      "Optimism",
      "Base",
      "BNB Smart Chain",
      "Polygon",
      "Avalanche C-Chain",
      "Fantom Opera",
      "Klaytn",
      "Aurora",
    ];

    response.data?.chains
      .filter((chain) => chain.allowed)
      .sort((a: Chain, b: Chain) => {
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
      throw new Error(error.message || "Failed to fetch chains");
    }
    throw new Error("Failed to fetch chains");
  }
};

const useGetChains = () => {
  return useQuery<GetChainsResponse>({
    queryKey: ["chains"],
    queryFn: fetchChains,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export default useGetChains;
