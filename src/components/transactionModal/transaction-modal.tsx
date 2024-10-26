import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

import { IoCloseSharp } from "react-icons/io5";
import { TransactionDetails } from "./transaction-details";
import { TransactionFlow } from "./transaction-flow";

type TransactionModalProps = {
  isOpen: boolean;
};

export const TransactionModal = ({ isOpen }: TransactionModalProps) => {
  return (
    <Modal
      className="dark:bg-default-100 max-w-[480px] mx-0 my-0 rounded-t-lg rounded-b-none sm:rounded-b-lg"
      classNames={{
        backdrop: "bg-black/50",
        closeButton: "sm:top-2 sm:right-2.5 rounded-none",
        base: "h-[90dvh] sm:h-auto",
      }}
      closeButton={<IoCloseSharp size="40" />}
      isOpen={isOpen}
      radius="none"
      scrollBehavior="inside"
      size="md"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 py-3 px-3 sm:py-4 sm:px-6">
          <span className="text-medium font-bold">Transaction preview</span>
        </ModalHeader>
        <Divider />
        <div className="px-3 sm:px-6 pt-5" />
        <ModalBody className="px-10 py-0 sm:pb-5 sm:px-7">
          <TransactionFlow />
          <TransactionDetails />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
