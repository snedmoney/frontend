import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

interface FormData {
  step1: { name: string; email: string };
  step2: { age: number; occupation: string };
  step3: { interests: string[] };
}

interface FormContextType {
  formData: FormData;
  updateFormData: (
    step: keyof FormData,
    data: Partial<FormData[keyof FormData]>,
  ) => void;
}

export const FundraiserFormContext = createContext<FormContextType | undefined>(
  undefined,
);

const FundraiserFormProvider = () => {
  const [formData, setFormData] = useState<FormData>({
    step1: { name: "", email: "" },
    step2: { age: 0, occupation: "" },
    step3: { interests: [] },
  });

  const updateFormData = (
    step: keyof FormData,
    data: Partial<FormData[keyof FormData]>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  return (
    <FundraiserFormContext.Provider value={{ formData, updateFormData }}>
      <Outlet />
    </FundraiserFormContext.Provider>
  );
};

export default FundraiserFormProvider;