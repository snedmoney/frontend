// ThemeContext.js
import { createContext } from "react";

export type Chain = {
  id: number;
  name: string;
  allowed: boolean;
  iconURL: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  explorerURL: string;
};

export type Token = {
  chainId: number;
  chainName: string;
  decimals: number;
  id: number;
  logoURI: string;
  name: string;
  symbol: string;
  address: string;
};

export type TokenWithBalance = Token & {
  balance?: string;
  amountInUSD?: string;
  price?: number;
};

export type Transaction = {
  type: string;
  status: string;
  sourceTokenAmount: number;
  sourceTotalFiat: number;
  feeInFiat: number;
  destinationTokenAmount: number;
  destinationTokenPriceFiat: number;
  transactionHash: string;
  createdAt: Date;
  updatedAt: Date;
  sourceToken: Token;
  destinationToken: Token;
  sourceChain: Chain;
  destinationChain: Chain;
  walletId: number;
  linkId: number;
  name: string;
  message: string;
}

export type PaymentWidgetContextType = {
  selectedChain: Chain;
  selectedToken: TokenWithBalance;
  isSearching: boolean;
  setSelectedChain: (chain: Chain) => void;
  setSelectedToken: (token: TokenWithBalance) => void;
  tokenAmount?: string;
  setTokenAmount: (amount?: string) => void;
  setIsSearching: (isSearching: boolean) => void;
};

//Later we might need more values for chain switching
const PaymentWidgetContext = createContext<PaymentWidgetContextType>({
  selectedChain: {} as Chain,
  selectedToken: {} as TokenWithBalance,
  tokenAmount: undefined,
  isSearching: false,
  setSelectedChain: () => {},
  setSelectedToken: () => {},
  setTokenAmount: () => {},
  setIsSearching: () => {},
});

export default PaymentWidgetContext;