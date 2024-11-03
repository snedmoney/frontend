import SupportWord from "./support-word";

import { TransactionDataType } from "@/types";

type SupportWordsProps = {
  transactions: TransactionDataType[];
};

const SupportWords = ({ transactions }: SupportWordsProps) => {
  return (
    <div className="py-4 border-b border-content4">
      <h2 className="mb-3">Words of support ({transactions.length})</h2>
      <p>Please donate to share words of support.</p>
      {transactions.map((transaction) => (
        <SupportWord key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default SupportWords;
