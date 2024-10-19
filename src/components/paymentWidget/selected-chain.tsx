import usePaymentWidget from "@/hooks/use-payment-widget"
import { Button } from "@nextui-org/button"
import { Skeleton } from "@nextui-org/react"
import { FaCaretDown } from "react-icons/fa6"

const SelectedChain = ({ isLoading, onOpen }: { isLoading: boolean, onOpen: () => void }) => {
  const { selectedChain } = usePaymentWidget();
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[40px]" />
      ) : (
        <Button
          className="inline-flex justify-start items-center gap-1 text-sm cursor-pointer px-0"
          data-hover="false"
          variant="light"
          onClick={onOpen}
        >
          <p className="text-foreground-600 p-0">From </p>
          {Object.keys(selectedChain).length ?
            <>
              <img
                alt={selectedChain?.name}
                height="16"
                src={selectedChain?.iconURL}
                width="16"
              />
              <p className='truncate max-w-full'>{selectedChain?.name}</p>
            </>
            :
            <span className='hover:underline underline-offset-4'>Select chain</span>
          }
          <FaCaretDown className="text-foreground-600" size="8" />
        </Button>
      )}
    </>
  );
}

export default SelectedChain;