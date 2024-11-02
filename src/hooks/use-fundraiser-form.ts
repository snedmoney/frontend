import { useContext } from "react";

import { FundraiserFormContext } from "@/providers/fundraiser-form/fundraiserFormContext";

export const useFundraiserFormContext = () => {
  const context = useContext(FundraiserFormContext);

  if (context === undefined) {
    throw new Error(
      "useFundraiserFormContext must be used within a FundraiserFormProvider",
    );
  }

  return context;
};