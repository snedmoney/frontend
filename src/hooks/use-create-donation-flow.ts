import { useContext } from "react";

import CreateDonationFlowContext, {
  CreateDonationFlowContextType,
} from "@/providers/donation/createDonationFlowContext";

const useCreateDonationFlow = (): CreateDonationFlowContextType => {
  const context = useContext(CreateDonationFlowContext);

  if (!context) {
    throw new Error(
      "useCreateDonationFlow must be used within a CreateDonationFlowProvider",
    );
  }

  return context;
};

export default useCreateDonationFlow;