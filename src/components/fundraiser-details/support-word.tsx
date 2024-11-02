import { Avatar } from "@nextui-org/avatar";
import { FaHandHoldingHeart } from "react-icons/fa";

const SupportWord = () => {
  return (
    <div className="my-10 last:mb-0 flex gap-4 items-start">
      <Avatar
        showFallback
        className="shrink-0"
        icon={<FaHandHoldingHeart size={24} />}
        size="md"
        src="https://images.unsplash.com/broken"
      />
      <div>
        <h3>Brian Hoffman</h3>
        <div className="flex gap-3 mb-3">
          <p>$250</p>
          <span className="opacity-60 ps-2 relative before:absolute before:content-[''] before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-secondary before:opacity-50">
            4 mos
          </span>
        </div>
        <p>
          Bailey, we are praying hard for you !! I never met you but have been
          following your story since my own cancer diagnosis!! Stay strong and
          brave because you are a beautiful soul who has so much to offer the
          world ! Remember Jesus is always in control, he has the wheel and you
          are going to be ok !!
        </p>
      </div>
    </div>
  );
};

export default SupportWord;