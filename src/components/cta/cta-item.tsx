import { ReactNode } from "react";

type TCTAItemProps = {
  icon: ReactNode;
  title: string;
  description: ReactNode;
};

export const CTAItem = ({ icon, title, description }: TCTAItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="shrink-0">{icon}</div>
      <div className="flex-auto">
        <h3 className="mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CTAItem;