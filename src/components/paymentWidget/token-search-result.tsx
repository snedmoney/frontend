import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import TokenListItem from "./token-list-item";
import usePaymentWidget from "@/hooks/use-payment-widget";
import useSearchTokens from "@/hooks/use-search-tokens";
import { BiSearch } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";


type TokenSearchResultProps = {
  onTokenClick: () => void;
  chainId: number;
  searchInput: string | null;
  setSearchInput: (searchInput: string) => void;
};

const TokenSearchResult = ({ onTokenClick, chainId, searchInput, setSearchInput }: TokenSearchResultProps) => {
  const { setSelectedToken, isSearching, setIsSearching } = usePaymentWidget();
  const { data: searchResult = [], isLoading } = useSearchTokens(chainId, searchInput ?? '');
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
  if (isLoading) return <div className="p-0 h-[400px] grid place-items-center"><Spinner aria-label="Loading..." color='default' /></div>

  return (
    <Listbox
      aria-label="Available tokens list"
      variant="flat"
      disallowEmptySelection
      selectionMode="single"
      className="p-0 h-[400px]"
      classNames={{
        list: 'h-full'
      }}
    >
      {searchResult.length > 0 ? (
        searchResult.map(token => (
          <ListboxItem
            key={token.id}
            textValue={token.name}
            classNames={{
              selectedIcon: 'hidden',
              base: ['data-[selected]:bg-default/40']
            }}
            onClick={() => {
              onTokenClick();
              setSelectedToken(token);
              setIsSearching(false);
              setSearchInput('');
            }}
          >
            <TokenListItem onTokenClick={onTokenClick} token={token} />
          </ListboxItem>
        ))
      ) : (
        <ListboxItem
          key="search-tokens"
          textValue='search tokens'
          classNames={{
            selectedIcon: 'hidden',
            base: ['bg-transparent', 'data-[selectable=true]:focus:bg-transparent', 'data-[hover=true]:bg-transparent'],
          }}>
          <div className="p-0">
            <div className='flex flex-col items-center justify-center gap-2'>
              {searchResult.length === 0 && !isLoading && searchInput &&
                <>
                  <VscSearchStop size='84' className='fill-default-400' />
                  <p className="text-l text-default-400">No tokens found for "{searchInput}"</p>
                </>
              }
              {isSearching && !searchInput &&
                <>
                  <BiSearch size='72' className='fill-default-400' />
                  <p className="text-l text-default-400">Search token name or symbol</p>
                </>
              }
            </div>
          </div>
        </ListboxItem>
      )}
    </Listbox>
  );
};

export default TokenSearchResult;