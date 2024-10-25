import { SelectProps } from "@nextui-org/react";

import { ChainSelector } from "./chain-selector";

import useGetChains from "@/hooks/use-get-chains";

type ChainFilterProps = {
  selectedChain: string;
  onChainChange: (chain: string) => void;
  className?: string;
} & Omit<
  SelectProps,
  "onChange" | "onSelectionChange" | "selectedKeys" | "children" | "className"
>;

const ChainFilter = ({
  selectedChain,
  onChainChange,
  ...rest
}: ChainFilterProps) => {
  const handleChainChange = (keys: any) => {
    // If keys is empty (same item clicked), maintain the current selection
    const selectedKey =
      keys.size > 0 ? (Array.from(keys)[0] as string) : selectedChain;

    onChainChange(selectedKey);
  };
  const { data, isLoading } = useGetChains();
  const chainsData =
    data?.chains
      .filter((chain) => !chain.name.includes("Testnet"))
      .map((chain) => ({ ...chain, key: chain.id, label: chain.name })) || [];

  return (
    <ChainSelector
      aria-label="Chain"
      chains={chainsData}
      hasAllSelector
      defaultSelectedKeys={[chainsData[0]?.key]}
      isLoading={isLoading}
      radius="sm"
      selectedKeys={[selectedChain]}
      value={selectedChain}
      variant="bordered"
      onSelectionChange={handleChainChange}
      {...rest}
    />
  );
};

export default ChainFilter;
