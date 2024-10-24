import usePaymentWidget from "@/hooks/use-payment-widget"
import { type Chain } from "@/providers/paymentWidget/paymentWidgetContext"
import { Button } from "@nextui-org/button"
import { Skeleton } from "@nextui-org/react"
import { FaCaretDown } from "react-icons/fa6"

const SelectedChain = ({ isLoading, onOpen }: { isLoading: boolean, onOpen: () => void }) => {
  const { selectedChain = {} as Chain } = usePaymentWidget();
  return (
    <>
      {isLoading ? (
        <Skeleton className="rounded-full w-[120px] h-[32px]" />
      ) : (
        <Button
          className="inline-flex justify-start items-center gap-1 text-sm cursor-pointer px-0 h-8"
          data-hover="false"
          variant="light"
          onClick={onOpen}
        >
          <p className="text-foreground-500 p-0 font-bold">From </p>
          {Object.keys(selectedChain).length ?
            <>
              <img
                alt={selectedChain?.name}
                height="16"
                src={selectedChain?.iconURL}
                width="16"
              />
              <p className='truncate max-w-full text-foreground-500 font-bold'>{selectedChain?.name}</p>
            </>
            :
            <span className='hover:underline underline-offset-4 text-foreground-500 font-bold'>Select chain</span>
          }
          <FaCaretDown className="text-foreground-500" size="8" />
        </Button>
      )}
    </>
  );
}

export default SelectedChain;