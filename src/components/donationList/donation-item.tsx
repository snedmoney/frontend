import { Avatar } from "@nextui-org/avatar";
import { FaHandHoldingHeart } from "react-icons/fa";

const DonationItem = () => {
  return (
    <div className="mt-4 first:mt-0 flex gap-3 items-start">
      <Avatar
        showFallback
        className="shrink-0"
        icon={<FaHandHoldingHeart size={20} />}
        size="md"
        src="https://images.unsplash.com/broken"
      />
      <div>
        <h4>Jane Doe</h4>
        <div className="flex items-center gap-2">
          <strong>$300</strong>
          <span className="relative ps-2.5 before:absolute before:content-[''] before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-secondary">
            4 mos
          </span>
        </div>
      </div>
    </div>
  );
};

export default DonationItem;