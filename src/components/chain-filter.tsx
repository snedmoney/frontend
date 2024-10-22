import { Select, SelectItem, SelectProps } from "@nextui-org/react";

type ChainFilterProps = {
  selectedChain: string;
  onChainChange: (chain: string) => void;
  className?: string;
} & Omit<
  SelectProps,
  "onChange" | "onSelectionChange" | "selectedKeys" | "children" | "className"
>;

const chains = [
  { key: "all", label: "All Chains" },
  { key: "ethereum", label: "Ethereum" },
  { key: "polygon", label: "Polygon" },
  // Add more chains as needed
];

const ChainFilter = ({
  selectedChain,
  onChainChange,
  className,
  ...rest
}: ChainFilterProps) => {
  const handleChainChange = (keys: any) => {
    // If keys is empty (same item clicked), maintain the current selection
    const selectedKey =
      keys.size > 0 ? (Array.from(keys)[0] as string) : selectedChain;
    onChainChange(selectedKey);
  };

  return (
    <Select
      value={selectedChain}
      onSelectionChange={handleChainChange}
      aria-label="Chain"
      defaultSelectedKeys={[chains[0].key]}
      className={className}
      variant="bordered"
      selectedKeys={[selectedChain]}
      {...rest}
    >
      {chains.map((chain) => (
        <SelectItem key={chain.key} value={chain.key}>
          {chain.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ChainFilter;
