import { useContext } from "react";
import PaymentWidgetContext from "../providers/paymentWidget/paymentWidgetContext";

const usePaymentWidget = () => {
  const {
    selectedChain,
    selectedToken,
    setSelectedChain,
    setSelectedToken,
  } = useContext(PaymentWidgetContext);

  return {
    selectedChain,
    selectedToken,
    setSelectedChain,
    setSelectedToken,
  };
};

export default usePaymentWidget;