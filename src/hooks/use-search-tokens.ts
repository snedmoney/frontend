import type { Token } from "@/providers/paymentWidget/paymentWidgetContext";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

import { apiClient } from "../config/api";

type SearchTokensResponse = {
  tokens: Token[];
};

const searchTokens = async (
  chainId: number,
  searchParam: string,
): Promise<Token[]> => {
  try {
    const response: AxiosResponse<SearchTokensResponse> = await apiClient.get(
      `/tokens/chains/${chainId}/search`,
      {
        params: {
          query: searchParam,
        },
      },
    );

    return response.data.tokens;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to search tokens");
    }
    throw new Error("Failed to search tokens");
  }
};

const useSearchTokens = (chainId: Token["chainId"], searchParam: string) => {
  const [debouncedSearchParam, setDebouncedSearchParam] = useState(searchParam);
  const queryClient = useQueryClient();

  const debouncedSetSearchParam = useCallback(
    debounce((value: string) => {
      setDebouncedSearchParam(value);
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedSetSearchParam(searchParam);
  }, [searchParam, debouncedSetSearchParam]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["tokens", chainId, debouncedSearchParam],
    });
  }, [chainId, debouncedSearchParam, queryClient]);

  return useQuery<Token[], Error>({
    queryKey: ["tokens", chainId, debouncedSearchParam],
    queryFn: () => searchTokens(chainId, debouncedSearchParam),
    enabled: !!chainId && debouncedSearchParam.length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useSearchTokens;
