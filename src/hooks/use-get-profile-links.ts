import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../config/api";

import { Profile } from "@/providers/createProfileFlow/createProfileFlowContext";
import { AxiosError } from "axios";
import { Chain, Token } from "@/providers/paymentWidget/paymentWidgetContext";

export type Wallet = {
  address: string;
};

export type Link = {
  id: string;
  title: string;
  type: string;
  goalAmount?: number;
  destinationToken: Token;
  destinationChain: Chain;
  destinationWallet: Wallet;
};

export type GetProfileByAddressResponse = Link[];

const fetchProfileLinks = async (address?: string) => {
  if (!address) return;

  const response = await apiClient.get<GetProfileByAddressResponse>(
    `/users/address/${address}/links`,
  );

  return response.data;
};

const useGetProfileLinks = (address?: string) => {
  const query = useQuery({
    queryKey: ["users", "address", address, "links"],
    queryFn: () => fetchProfileLinks(address),
    enabled: !!address,
  });

  return {
    ...query,
  };
};

export default useGetProfileLinks;
