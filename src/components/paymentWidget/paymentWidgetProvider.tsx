import { useState, ReactNode } from "react";

import PaymentWidgetContext, { Chain, Token } from "./paymentWidgetContext";

type PaymentWidgetProviderProps = {
  children: ReactNode;
};

export const PaymentWidgetProvider = ({
  children,
}: PaymentWidgetProviderProps) => {
  const [selectedChain, setSelectedChain] = useState<Chain>({} as Chain);
  const [selectedToken, setSelectedToken] = useState<Token>({} as Token);
  const [tokenAmount, setTokenAmount] = useState<string | undefined>("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <PaymentWidgetContext.Provider
      value={{
        selectedChain,
        selectedToken,
        tokenAmount,
        isSearching,
        setSelectedChain,
        setSelectedToken,
        setTokenAmount,
        setIsSearching,
      }}
    >
      {children}
    </PaymentWidgetContext.Provider>
  );
};
