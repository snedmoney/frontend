import { Avatar, Select, SelectItem, SelectProps } from "@nextui-org/react";

import { Chain } from "@/providers/paymentWidget/paymentWidgetContext";

const all: Chain & { key: string | number } = {
  name: "All Chains",
  key: "all",
  id: 0,
  allowed: false,
  iconURL: "https://cdn-icons-png.flaticon.com/512/3712/3712419.png",
  nativeCurrency: {
    name: "",
    symbol: "",
    decimals: 0,
  },
  explorerURL: "",
};

type ChainSelectorProps = {
  chains: Chain[];
  hasAllSelector?: boolean;
} & Omit<SelectProps, "children">;
export const ChainSelector = ({
  chains,
  hasAllSelector,
  ...field
}: ChainSelectorProps) => {
  const formattedChains = chains?.length
    ? chains?.map((chain) => ({ ...chain, key: chain.id }))
    : [all];
  const data = hasAllSelector ? [all, ...formattedChains] : formattedChains;

  return (
    <Select {...field} className="w-full" variant="bordered">
      {data.map((chain) => (
        <SelectItem key={chain.key} textValue={chain.name}>
          <div className="flex items-center gap-2">
            <Avatar className="min-w-fit" size="sm" src={chain.iconURL} />
            <span className="text-wrap">{chain.name}</span>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};
