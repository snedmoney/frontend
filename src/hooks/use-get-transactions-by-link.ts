import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { apiClient } from "@/config/api";

// TODO: Update this interface based on actual transaction data structure
interface Transaction {
  id: string;
  amount?: number;
  status?: string;
  timestamp?: string;
  // Add other transaction fields as needed
}

interface TransactionsResponse {
  transaction: Transaction[];
}

interface TransactionError {
  message: string;
  code?: string;
  status?: number;
}

// Constants
const QUERY_KEY = "transactions" as const;
const DEFAULT_ERROR_MESSAGE = "Failed to fetch transactions" as const;

/**
 * Fetches transactions for a specific link
 * @param linkId - The ID of the link to fetch transactions for
 * @returns Promise containing the transactions data
 * @throws {TransactionError} When the fetch fails
 */
const fetchTransactions = async (linkId: string): Promise<Transaction[]> => {
  try {
    const { data } = await apiClient.get<TransactionsResponse>(
      `/transactions/link/${linkId}`,
    );

    return data.transaction;
  } catch (error) {
    const transactionError: TransactionError = {
      message: DEFAULT_ERROR_MESSAGE,
      status: error instanceof AxiosError ? error.response?.status : undefined,
    };

    if (error instanceof AxiosError) {
      transactionError.message =
        error.response?.data?.message || error.message || DEFAULT_ERROR_MESSAGE;
      transactionError.code = error.code;
    }

    throw transactionError;
  }
};

/**
 * Custom hook for fetching and managing transactions data
 * @param linkId - The ID of the link to fetch transactions for
 * @returns Query object containing transactions data and status
 */
const useGetTransactions = (linkId?: string) => {
  return useQuery<Transaction[], TransactionError>({
    queryKey: [QUERY_KEY, linkId],
    queryFn: () => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }

      return fetchTransactions(linkId);
    },
    enabled: Boolean(linkId),
    retry: (failureCount, error) => {
      // Don't retry on 404 errors
      if (error.status === 404) return false;

      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    // Refresh data every 30 seconds
    refetchInterval: 30000,
    // Keep data fresh for 1 minute
    staleTime: 60000,
  });
};

export type { Transaction, TransactionError };
export default useGetTransactions;