import { useContext } from "react";
import PaymentWidgetContext from "../providers/paymentWidget/paymentWidgetContext";

const usePaymentWidget = () => {
  const {
    selectedChain,
    selectedToken,
    tokenAmount,
    isSearching,
    setSelectedChain,
    setSelectedToken,
    setTokenAmount,
    setIsSearching
  } = useContext(PaymentWidgetContext);

  return {
    selectedChain,
    selectedToken,
    tokenAmount,
    isSearching,
    setSelectedChain,
    setSelectedToken,
    setTokenAmount,
    setIsSearching
  };
};

export default usePaymentWidget;