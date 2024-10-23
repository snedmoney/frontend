import clsx from "clsx";

const TransactionStatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={clsx(
        "px-2 py-1 rounded text-xs font-semibold text-gray-600",
        status === "Completed" ? "bg-success" : "bg-primary",
      )}
    >
      {status}
    </span>
  );
};

export default TransactionStatusBadge;
