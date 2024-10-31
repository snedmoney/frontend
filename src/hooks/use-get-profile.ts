import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../config/api";

import { Profile } from "@/providers/createProfileFlow/createProfileFlowContext";

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
};

export type GetProfileByAddressResponse = {
  user: ProfileResponse;
};

const fetchProfile = async (address?: string) => {
  if (!address) return;

  try {
    const response = await apiClient.get<GetProfileByAddressResponse>(
      `/users/wallet/address/${address}`,
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
    console.log("i got user", response.data);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch profile");
    }
    throw new Error("Failed to fetch profile");
  }
};

const useGetProfile = (address?: string) => {
  const query = useQuery({
    queryKey: ["users", "wallet", "address", address],
    queryFn: () => fetchProfile(address),
    enabled: !!address,
  });

  return {
    ...query,
  };
};

export default useGetProfile;