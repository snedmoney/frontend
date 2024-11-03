import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/config/api";
import { TransactionDataType } from "@/types";

interface TransactionsResponse {
  transaction: TransactionDataType[];
}

// Constants
const QUERY_KEY = "transactions" as const;

/**
 * Fetches transactions for a specific link
 * @param linkId - The ID of the link to fetch transactions for
 * @returns Promise containing the transactions data
 * @throws {Error} When the fetch fails
 */
const fetchTransactions = async (
  linkId: string,
): Promise<TransactionDataType[]> => {
  try {
    const res = await apiClient.get<TransactionsResponse>(
      `/transactions/link/${linkId}`,
    );

    return res.data.transaction;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch transactions");
    }
    throw new Error("Failed to fetch transactions");
  }
};

/**
 * Custom hook for fetching and managing transactions data
 * @param linkId - The ID of the link to fetch transactions for
 * @returns Query object containing transactions data and status
 */
const useGetTransactions = (linkId?: string) => {
  return useQuery<TransactionDataType[], Error>({
    queryKey: [QUERY_KEY, linkId],
    queryFn: () => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }

      return fetchTransactions(linkId);
    },
    enabled: Boolean(linkId),
  });
};

export default useGetTransactions;
