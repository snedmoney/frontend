import { Button } from "@nextui-org/button";
import { FaCaretDown } from "react-icons/fa6";

import usePaymentWidget from "@/hooks/use-payment-widget";

const SelectedToken = ({ onOpen }: { onOpen: () => void }) => {
  const { selectedToken } = usePaymentWidget();

  return (
    <Button
      className="flex-none gap-0 p-0 pt-2"
      data-hover="false"
      variant="light"
      onClick={onOpen}
    >
      {Object.keys(selectedToken).length ? (
        <>
          <img
            alt="selected token icon"
            height="24"
            src={selectedToken.logoURI}
            width="24"
          />
          <span className="pl-1 text-l text-foreground-500">
            <b>{selectedToken.symbol}</b>
          </span>
        </>
      ) : (
        <span className="hover:underline underline-offset-4 text-foreground-500 font-bold">
          Select token
        </span>
      )}
      <span className="pl-1 text-foreground-500">
        <FaCaretDown size="12" />
      </span>
    </Button>
  );
};

export default SelectedToken;
