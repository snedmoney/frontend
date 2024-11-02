import { formatDateFromISOString } from "@/lib/utils";

const Meta = ({ createdAt }: { createdAt: string }) => {
  let date = formatDateFromISOString(createdAt);

  return (
    <div className="py-3 border-b border-content4 flex gap-3 flex-wrap items-center">
      <p>Created {date}</p>
    </div>
  );
};

export default Meta;