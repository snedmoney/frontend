import { Select, SelectItem, SelectProps } from "@nextui-org/react";

type TransactionTypeFilterProps = {
  selectedType: string;
  onTypeChange: (type: string) => void;
  className?: string;
} & Omit<
  SelectProps,
  "onChange" | "onSelectionChange" | "selectedKeys" | "children" | "className"
>;

const transactionTypes = [
  { key: "all", label: "All Types" },
  { key: "donation", label: "Donation" },
  { key: "tip", label: "Tip" },
  // Add more transaction types as needed
];

const TransactionTypeFilter = ({
  selectedType,
  onTypeChange,
  className,
  ...rest
}: TransactionTypeFilterProps) => {
  const handleTypeChange = (keys: any) => {
    // If keys is empty (same item clicked), maintain the current selection
    const selectedKey =
      keys.size > 0 ? (Array.from(keys)[0] as string) : selectedType;
    onTypeChange(selectedKey);
  };

  return (
    <Select
      value={selectedType}
      onSelectionChange={handleTypeChange}
      aria-label="Transaction Type"
      defaultSelectedKeys={[transactionTypes[0].key]}
      className={className}
      variant="bordered"
      selectedKeys={[selectedType]}
      radius="sm"
      {...rest}
    >
      {transactionTypes.map((type) => (
        <SelectItem key={type.key} value={type.key}>
          {type.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default TransactionTypeFilter;
