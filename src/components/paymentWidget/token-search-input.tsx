import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

const TokenSearchInput = () => {
  return (
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
  )
}

export default TokenSearchInput;