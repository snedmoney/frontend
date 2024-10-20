import { Input } from "@nextui-org/react";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";

type TokenSearchInputProps = {
  setIsSearching: (isSearching: boolean) => void;
  setSearchInput: (searchInput: string) => void;
  searchInput: string;
  isSearching: boolean;
}

const TokenSearchInput = ({ setIsSearching, setSearchInput, searchInput, isSearching }: TokenSearchInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onCancelClick = () => {
    setIsSearching(false);
    setSearchInput('');
    if (inputRef.current) {
      console.log(inputRef.current)
      inputRef.current.blur();
    }
  }

  return (
    <div className='flex items-center'>
      <Input
        className="bg-default-100 mb-3 dark:bg-default-200"
        classNames={{
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
        placeholder='Search token name or symbol'
        type='search'
        size='lg'
        color='default'
        radius='sm'
        startContent={<FaSearch color='bg-default-200' size='14' />}
        value={searchInput}
        onClick={() => setIsSearching(true)}
        onChange={handleInputChange}
        ref={inputRef}
      />
      {isSearching &&
        <button
          className='pl-2 pb-3 text-sm text-default-400 underline underline-offset-4 decoration-default-400/60'
          onClick={onCancelClick}
        >
          Cancel
        </button>
      }
    </div>
  );
}

export default TokenSearchInput;