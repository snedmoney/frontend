import type { Token } from "@/providers/paymentWidget/paymentWidgetContext";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { apiClient } from "../config/api";
import { Profile } from "@/providers/createProfileFlow/createProfileFlowContext";

const updateProfile = async (
  userId?: bigint,
  updatedUser?: Partial<Profile>,
) => {
  if (!userId) return;

  try {
    const response: AxiosResponse = await apiClient.patch(`/users/${userId}`, {
      ...updatedUser,
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch profile");
    }
    throw new Error("Failed to fetch profile");
  }
};

const useUpdateProfile = (userId?: bigint) => {
  const mutation = useMutation({
    mutationFn: (data: Partial<Profile>) => updateProfile(userId, data),
  });

  return {
    ...mutation,
  };
};

export default useUpdateProfile;