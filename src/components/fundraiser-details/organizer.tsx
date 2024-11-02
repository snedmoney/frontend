import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

import { FundraiserData } from "@/types";

type OrganizerProps = Pick<FundraiserData, "user">;

const Organizer = ({ user }: OrganizerProps) => {
  return (
    <div className="py-10 border-y border-content4">
      <h2 className="text-xl mb-4">Organizer</h2>
      <div className="flex gap-4">
        <Avatar
          showFallback
          icon={<FiUser size={24} />}
          size="md"
          src="https://images.unsplash.com/broken"
        />
        <div>
          <h3>{user.name}</h3>
          <p>{user.slogan}</p>
          <Button
            as={Link}
            className="mt-3"
            to={`/profile/${user.userName}`}
            variant="bordered"
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Organizer;