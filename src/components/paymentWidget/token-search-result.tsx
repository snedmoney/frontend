import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";

import TokenListItem from "./token-list-item";

import usePaymentWidget from "@/hooks/use-payment-widget";
import useSearchTokens from "@/hooks/use-search-tokens";

type TokenSearchResultProps = {
  onTokenClick: () => void;
  chainId: number;
  searchInput: string | null;
  setSearchInput: (searchInput: string) => void;
};

const TokenSearchResult = ({
  onTokenClick,
  chainId,
  searchInput,
  setSearchInput,
}: TokenSearchResultProps) => {
  const { setSelectedToken, isSearching, setIsSearching } = usePaymentWidget();
  const { data: searchResult = [], isLoading } = useSearchTokens(
    chainId,
    searchInput ?? "",
  );

  // if (isError) {
  //   return (
  //     <div className="p-0 h-[400px] grid place-items-center" aria-label='no tokens found'>
  //       <div className='flex flex-col items-center justify-center gap-2'>
  //         <VscSearchStop size='84' className='fill-default-400' />
  //         <p className="text-l text-default-400">No tokens found for "{searchInput}"</p>
  //       </div>
  //     </div>
  //   )
  // }
  if (isLoading)
    return (
      <div className="p-0 h-[400px] grid place-items-center">
        <Spinner aria-label="Loading..." color="default" />
      </div>
    );

  return (
    <Listbox
      disallowEmptySelection
      aria-label="Available tokens list"
      className="p-0 h-[400px]"
      classNames={{
        list: "h-full gap-2",
      }}
      selectionMode="single"
      variant="flat"
    >
      {searchResult?.length > 0 ? (
        searchResult?.map((token) => (
          <ListboxItem
            key={token.id}
            classNames={{
              selectedIcon: "hidden",
              base: ["data-[selected]:bg-default/40"],
            }}
            className='h-auto'
            textValue={token.name}
            onClick={() => {
              onTokenClick();
              setSelectedToken(token);
              setIsSearching(false);
              setSearchInput("");
            }}
          >
            <TokenListItem token={token} onTokenClick={onTokenClick} />
          </ListboxItem>
        ))
      ) : (
        <ListboxItem
          key="search-tokens"
          classNames={{
            selectedIcon: "hidden",
            base: [
              "bg-transparent",
              "data-[selectable=true]:focus:bg-transparent",
              "data-[hover=true]:bg-transparent",
            ],
          }}
          textValue="search tokens"
        >
          <div className="p-0">
            <div className="flex flex-col items-center justify-center gap-2">
              {searchResult.length === 0 && !isLoading && searchInput && (
                <>
                  <VscSearchStop className="fill-default-400" size="84" />
                  <p className="text-l text-default-400">
                    No tokens found for &quot;{searchInput}&quot;
                  </p>
                </>
              )}
              {isSearching && !searchInput && (
                <>
                  <BiSearch className="fill-default-400" size="72" />
                  <p className="text-l text-default-400">
                    Search token name or symbol
                  </p>
                </>
              )}
            </div>
          </div>
        </ListboxItem>
      )}
    </Listbox>
  );
};

export default TokenSearchResult;