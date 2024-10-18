import { createContext } from "react";

export type Chain = {
  networkId: number;
  name: string;
  allowed: boolean;
  iconURL: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  explorerURL: string;
}

export type Token = {
  chainId: number;
  chainName: string;
  decimals: number;
  id: number;
  logoURI: string;
  name: string;
  symbol: string;
  tokenAddress: string;
};

export type PaymentWidgetContextType = {
  selectedChain: Chain;
  selectedToken: Token;
  setSelectedChain: (chain: Chain) => void;
  setSelectedToken: (token: Token) => void;
};

//Later we might need more values for chain switching
const PaymentWidgetContext = createContext<PaymentWidgetContextType>({
  selectedChain: {} as Chain,
  selectedToken: {} as Token,
  setSelectedChain: () => {},
  setSelectedToken: () => {},
});

export default PaymentWidgetContext;