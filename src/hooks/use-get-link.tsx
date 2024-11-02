import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { apiClient } from "@/config/api";
import { FundraiserData } from "@/types";

// Custom error type
interface LinkError {
  message: string;
  code?: string;
  status?: number;
}

// Constants
const QUERY_KEY = "link" as const;
const DEFAULT_ERROR_MESSAGE = "Failed to fetch link" as const;

/**
 * Fetches link data from the API
 * @param linkId - The ID of the link to fetch
 * @returns Promise containing the link data
 * @throws {LinkError} When the fetch fails
 */
const fetchLink = async (linkId: string): Promise<FundraiserData> => {
  try {
    const response = await apiClient.get<FundraiserData>(`/links/${linkId}`);

    return response.data;
  } catch (error) {
    const linkError: LinkError = {
      message: DEFAULT_ERROR_MESSAGE,
      status: error instanceof AxiosError ? error.response?.status : undefined,
    };

    if (error instanceof AxiosError) {
      linkError.message =
        error.response?.data?.message || error.message || DEFAULT_ERROR_MESSAGE;
      linkError.code = error.code;
    }

    throw linkError;
  }
};

/**
 * Custom hook for fetching and managing link data
 * @param linkId - The ID of the link to fetch
 * @returns Query object containing link data and status
 */
const useGetLink = (linkId?: string) => {
  return useQuery<FundraiserData, LinkError>({
    queryKey: [QUERY_KEY, linkId],
    queryFn: () => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }

      return fetchLink(linkId);
    },
    enabled: Boolean(linkId),
    retry: (failureCount, error) => {
      // Don't retry on 404 errors
      if (error.status === 404) return false;

      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
};

export default useGetLink;
