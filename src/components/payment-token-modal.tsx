import { Modal, ModalContent, ModalHeader, ModalBody, Divider, Input, Button, Listbox, ListboxItem } from "@nextui-org/react";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import type { Chain } from '@/hooks/use-get-chains';

type PaymentTokenModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedChainId: number;
  setSelectedChainId: (chain: number) => void;
  chains: Chain[];
}

const PaymentTokenModal = ({ isOpen, onOpenChange, selectedChainId, setSelectedChainId, chains }: PaymentTokenModalProps) => {
  const [modalSelectedChainId, setModalSelectedChainId] = useState(selectedChainId);
  const onChainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const chainId = e.currentTarget.getAttribute("data-chain")!;
    setModalSelectedChainId(parseInt(chainId));
    //fetch tokens
  }
  const selectedChainInfo = chains?.find(chain => chain.networkId === modalSelectedChainId);
  const onTokenClick = () => {
    setSelectedChainId(modalSelectedChainId);
  }

  return (
    <Modal
      className="dark:bg-default-100 max-w-[420px] mx-0 my-0 grounded-t-lg rounded-b-none sm:rounded-lg"
      classNames={{ backdrop: "bg-black/50", closeButton: "sm:top-2 sm:right-2.5 rounded-none" }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='md'
      scrollBehavior="inside"
      radius='none'
      closeButton={<IoCloseSharp size="40" />}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 py-3 px-3 sm:py-4 sm:px-6" >
            <span className="text-medium font-bold">Select pay token</span>
          </ModalHeader>
          <Divider />
          <div className='px-3 sm:px-6 pt-5'>
            <Input className="bg-default-100 mb-3 dark:bg-default-200" classNames={{
              input: [
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              inputWrapper: [
                'bg-default-100',
                "dark:bg-default-200",
                "group-data-[focus=true]:bg-default-100",
                "group-data-[focus=true]:dark:bg-default-200"
              ],
            }}
              placeholder='Search token name or address'
              type='search'
              size='lg'
              color='default'
              radius='sm'
              startContent={<FaSearch color='bg-default-200' size='14' />}
            />
            <p className="text-small font-bold pr-3 pt-3 pb-1">
              Select network: {selectedChainInfo?.name}
            </p>
            <div className="py-2 flex gap-1 items-center max-w-full overflow-x-scroll">
              {chains?.map(chain => {
                return (
                  <React.Fragment key={chain.name}>
                    <Button isIconOnly aria-label="Like" variant='bordered' size='lg' className="bg-transparent focus:border-foreground" onClick={onChainClick} data-chain={chain.networkId}>
                      <img src={chain.iconURL} width='24' height='24' />
                    </Button>
                  </React.Fragment>
                )
              })}
            </div>
            <p className="text-small font-bold pr-3 pt-3 pb-1">
              Select Token:
            </p>
          </div>
          <ModalBody className="px-0 py-0 sm:pb-5 sm:px-3">
            <Listbox
              aria-label="Tokens List"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={["text"]}
              className="p-0"
              classNames={{
                list: 'overflow-y-scroll'
              }}
              emptyContent={<div>nothing ser</div>}
            // onSelectionChange={setSelectedKeys}
            >
              <ListboxItem className='py-0 px-3 data-[selected=true]:bg-default/40' key="text" textValue='ff' classNames={{
                selectedIcon: 'hidden',
              }} onClick={onTokenClick}>
                <div className='flex justify-between items-center rounded-md gap-2 py-3'>
                  <span>TokenIcon</span>
                  <div className='flex flex-col flex-1 pl-2'>
                    <div>Token</div>
                    <div className='text-foreground-600 text-xs'>abcd</div>
                  </div>
                  <div className='flex flex-col'>
                    <div>TokenName</div>
                    <div className='text-foreground-600 text-xs text-right'>abcd</div>
                  </div>
                </div>
              </ListboxItem>
            </Listbox>
          </ModalBody>
        </>
      </ModalContent>
    </Modal >
  )
}

export default PaymentTokenModal;