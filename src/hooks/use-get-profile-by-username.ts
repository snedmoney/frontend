import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../config/api";

import { Profile } from "@/providers/createProfileFlow/createProfileFlowContext";
import { AxiosError } from "axios";

export type Wallet = {
  address: string;
};

export type PaymentMethod = {
  chain: {
    allowed: boolean;
    name: string;
    id: number;
  } | null;
  token: {
    id: number;
    address: string;
    name: string;
  } | null;
};

export type Social = {
  id: number;
  name: string;
  url: string;
};

export type ProfileResponse = Profile & {
  paymentMethods: PaymentMethod[];
  socials: Social[];
  wallets: Wallet[];
};

export type GetProfileByAddressResponse = {
  user: ProfileResponse;
};

const fetchProfileByUsername = async (username?: string) => {
  if (!username) return;

  const response = await apiClient.get<GetProfileByAddressResponse>(
    `/users/username/${username.toLocaleLowerCase()}`,
  );

  const paymentMethods = response.data.user.paymentMethods;

  if (paymentMethods.length) {
    const chainId = paymentMethods[0].chain?.id || 1;
    const tokenAddress = paymentMethods[0]?.token?.address || "";

    response.data.user.paymentMethod = {
      chainId,
      tokenAddress,
    };
  }

  const socials = response.data.user?.socials;

  if (socials?.length) {
    let socialAccounts: Record<string, string> = {};

    socials.forEach((social) => {
      const name = social.name.toLowerCase();

      socialAccounts[name] = social.url;
    });
    response.data.user.socialAccounts = socialAccounts;
  }

  return response.data;
};

const useGetProfileByUsername = (username?: string) => {
  const query = useQuery({
    queryKey: ["users", "username", username],
    queryFn: () => fetchProfileByUsername(username),
    enabled: !!username,
  });

  return {
    ...query,
  };
};

export default useGetProfileByUsername;
