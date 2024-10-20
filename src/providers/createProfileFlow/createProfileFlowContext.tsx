import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

export type CreateProfileFlowData = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  preference: string;
};

export type CreateProfileFlowContextType = {
  methods: UseFormReturn<CreateProfileFlowData>;
  onSubmit: (data: CreateProfileFlowData) => Promise<void>;
  completeStep: (step: number) => void;
  canAccessStep: (step: number) => boolean;
  completedSteps: number[];
  totalSteps: number;
};

const CreateProfileFlowContext =
  createContext<CreateProfileFlowContextType | null>(null);

export default CreateProfileFlowContext;
