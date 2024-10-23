import { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const useTransaction = () => {
  const {
    data: hash,
    isPending: isWritePending,
    writeContract,
    error: writeError,
  } = useWriteContract();

  const {
    isPending: isTxPendingBase,
    isSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const isTxPending = hash ? isTxPendingBase : false;

  const isPending = isWritePending || isTxPending;

  const error = writeError || txError;

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return {
    hash,
    writeContract,
    isSuccess,
    isTxPending,
    isPending,
    error,
  };
};

export default useTransaction;
