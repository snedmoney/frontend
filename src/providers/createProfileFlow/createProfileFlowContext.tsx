import { createContext } from "react";

export type CreateProfileFlowData = {
  walletAddress: string;
  profileImg?: string;
  coverImg?: string;
  name: string;
  slogan: string;
  userName: string;
  about: string;
  paymentMethod: {
    chainId: number;
    tokenAddress: string;
  };
  websiteLink?: string;
  socialAccounts: {
    youtube?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    discord?: string;
    tiktok?: string;
    twitch?: string;
    link1?: string;
    link2?: string;
  };
};

export type CreateProfileFlowContextType = {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  resetFlow: () => void;
  onSubmit: (data: CreateProfileFlowData) => Promise<void>;
};

const CreateProfileFlowContext =
  createContext<CreateProfileFlowContextType | null>(null);

export default CreateProfileFlowContext;
