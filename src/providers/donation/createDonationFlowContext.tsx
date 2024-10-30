import { DateValue } from "@internationalized/date";
import { createContext } from "react";

export type CreateDonationFlowData = {
  walletAddress: string;
  goal: string;
  title: string;
  description: string;
  paymentMethod: {
    chainId: string;
    tokenAddress: string;
  };
  endDate: DateValue;
};

export type CreateDonationFlowContextType = {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  resetFlow: () => void;
  onSubmit: (data: CreateDonationFlowData) => Promise<void>;
};

const CreateDonationFlowContext =
  createContext<CreateDonationFlowContextType | null>(null);

export default CreateDonationFlowContext;