import { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

import { AuthContext } from "./authContext";

import { apiClient } from "@/config/api";

const AUTH_MESSAGE = `Welcome to Sned! By signing this message, you authorize Sned to view your wallet address, request transaction approvals, and display your account balance. We cannot initiate transactions, access your private keys, or transfer funds without your explicit consent. You can disconnect your wallet at any time. Sign to verify ownership and proceed.`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const { isConnected, isDisconnected } = useAccount();
  const { signMessage, isSuccess, data } = useSignMessage();

  useEffect(() => {
    if (!token && isConnected) {
      signMessage({ message: AUTH_MESSAGE });
    }
  }, [isConnected]);

  useEffect(() => {
    if (isDisconnected) {
      localStorage.removeItem("token");
    }
  }, [isDisconnected]);
  useEffect(() => {
    async function process() {
      if (isSuccess && data) {
        apiClient.post("/authorize", { signature: data }).then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
          }
        });
      }
    }
    process();
  }, [isSuccess, data]);

  const value = {
    token,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
