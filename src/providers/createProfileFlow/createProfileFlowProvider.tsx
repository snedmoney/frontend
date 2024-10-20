import { useState, useEffect, ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CreateProfileFlowContext, {
  CreateProfileFlowData,
} from "./createProfileFlowContext";
import { useAccount } from "wagmi";

export const CreateProfileFlowProvider = ({
  totalSteps,
  children,
}: {
  totalSteps: number;
  children: ReactNode;
}) => {
  const methods = useForm<CreateProfileFlowData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      phoneNumber: "",
      preference: "",
    },
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  // resets completed steps to empty if wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      setCompletedSteps([]);
    }
  }, [isConnected]);

  const onSubmit = async (data: CreateProfileFlowData) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      //TODO: navigate to new profile page
      // navigate("/new profile page link");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const completeStep = (step: number) => {
    setCompletedSteps((prev) => [...new Set([...prev, step])]);
  };

  const canAccessStep = (step: number) => {
    if (step === 1) return true;
    return completedSteps.includes(step - 1);
  };

  return (
    <CreateProfileFlowContext.Provider
      value={{
        methods,
        onSubmit,
        completeStep,
        canAccessStep,
        completedSteps,
        totalSteps,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </CreateProfileFlowContext.Provider>
  );
};
