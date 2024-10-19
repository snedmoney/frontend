import { useContext } from "react";
import PaymentWidgetContext from "../providers/paymentWidget/paymentWidgetContext";

const usePaymentWidget = () => {
  const {
    selectedChain,
    selectedToken,
    tokenAmount,
    setSelectedChain,
    setSelectedToken,
    setTokenAmount
  } = useContext(PaymentWidgetContext);

  return {
    selectedChain,
    selectedToken,
    tokenAmount,
    setSelectedChain,
    setSelectedToken,
    setTokenAmount
  };
};

export default usePaymentWidget;