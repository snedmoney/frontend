import clsx from "clsx";

const statusToColorMap: Record<string, string> = {
  pending: "bg-warning",
  in_progress: "bg-primary",
  completed: "bg-success",
  failed: "bg-danger",
};
const TransactionStatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={clsx(
        "px-2 py-1 rounded text-xs font-semibold text-gray-600",
        statusToColorMap[status]
      )}
    >
      {status}
    </span>
  );
};

export default TransactionStatusBadge;