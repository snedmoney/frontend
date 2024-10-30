import { useContext } from "react";

import CreateProfileFlowContext, {
  CreateProfileFlowContextType,
} from "@/providers/createProfileFlow/createProfileFlowContext";
import CreateDonationFlowContext, {
  CreateDonationFlowContextType,
} from "@/providers/donation/createDonationFlowContext";

type FlowKeys = "profile" | "donation";

type FlowContextType = {
  profile: CreateProfileFlowContextType | null;
  donation: CreateDonationFlowContextType | null;
};

const useFlowContext = <T extends FlowKeys>(
  key: T,
): NonNullable<FlowContextType[T]> => {
  const profileContext = useContext(CreateProfileFlowContext);
  const donationContext = useContext(CreateDonationFlowContext);

  const contexts: FlowContextType = {
    profile: profileContext,
    donation: donationContext,
  };

  const context = contexts[key];

  if (!context) {
    throw new Error(`useFlowContext must be used within a ${key} Provider`);
  }

  return context;
};

export default useFlowContext;