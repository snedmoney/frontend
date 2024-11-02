import { ComponentProps } from "react";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { FiStar } from "react-icons/fi";
import { Avatar } from "@nextui-org/avatar";
import { FaChartLine } from "react-icons/fa";

import DonationItem from "./donation-item";

type TDonationListProps = ComponentProps<"div"> & {};

export const DonationList = ({ className }: TDonationListProps) => {
  return (
    <div
      className={clsx("w-full border-t border-content4 lg:border-0", className)}
    >
      <div className="flex gap-4 justify-between items-center lg:hidden">
        <h2>
          Donations <span className="underline">(17k)</span>
        </h2>
        <Button variant="bordered">
          <FiStar />
          See top
        </Button>
      </div>
      <div className="mt-4 flex gap-3 items-center lg:hidden">
        <Avatar icon={<FaChartLine size={22} />} size="md" />
        <strong className="text-primary-800">15.3K people just donated</strong>
      </div>
      <div>
        <DonationItem />
        <DonationItem />
        <DonationItem />
        <DonationItem />
        <DonationItem />
      </div>
      <div className="flex justify-between gap-2 mt-4">
        <Button fullWidth variant="bordered">
          See all
        </Button>
        <Button fullWidth className="hidden lg:flex" variant="bordered">
          <FiStar />
          See top
        </Button>
      </div>
    </div>
  );
};