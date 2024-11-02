import { SVGProps } from "react";

import { Profile } from "@/providers/createProfileFlow/createProfileFlowContext";
import { Token } from "@/providers/paymentWidget/paymentWidgetContext";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FundraiserData = {
  title: string;
  description: string;
  createdAt: string;
  goalAmount: number;
  destinationToken: Token;
  user: Pick<Profile, "name" | "userName" | "slogan">;
  acceptUntil: string;
  destinationWallet: {
    address: string;
  };
  destinationChain: {
    id: number;
  };
};