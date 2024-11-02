import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
