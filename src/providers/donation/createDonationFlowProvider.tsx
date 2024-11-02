import { ReactNode, useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import {
  today,
  getLocalTimeZone,
  parseDate,
  DateValue,
} from "@internationalized/date";

import CreateDonationFlowContext, {
  CreateDonationFlowData,
} from "./createDonationFlowContext";

import { convertDateValueToString } from "@/lib/utils";
import { apiClient } from "@/config/api";

const FORM_DATA_STORAGE_KEY = "createDonationFormData";
const CURRENT_STEP_STORAGE_KEY = "currentDonationStep";

type TDonationProviderProps = {
  children: ReactNode;
  totalSteps: number;
};

export const defaultFormValues: CreateDonationFlowData = {
  walletAddress: "",
  goal: "",
  title: "",
  description: "",
  paymentMethod: {
    chainId: "",
    tokenAddress: "",
  },
  endDate: parseDate(today(getLocalTimeZone()).add({ days: 1 }).toString()),
};

export const CreateDonationFlowProvider = ({
  totalSteps,
  children,
}: TDonationProviderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = sessionStorage.getItem(CURRENT_STEP_STORAGE_KEY);

    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const getInitialFormValues = (): CreateDonationFlowData => {
    const savedData = sessionStorage.getItem(FORM_DATA_STORAGE_KEY);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      return { ...defaultFormValues, ...parsedData };
    }

    return defaultFormValues;
  };

  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const methods = useForm<CreateDonationFlowData>({
    mode: "onChange",
    defaultValues: getInitialFormValues(),
  });

  const resetFlow = useCallback(() => {
    setCurrentStep(1);
    sessionStorage.removeItem(FORM_DATA_STORAGE_KEY);
    sessionStorage.removeItem(CURRENT_STEP_STORAGE_KEY);
    methods.reset(defaultFormValues);
  }, [methods]);

  useEffect(() => {
    if (!isConnected) resetFlow();
  }, [isConnected, resetFlow]);

  useEffect(() => {
    const subscription = methods.watch((data) => {
      const modifiedData = {
        ...data,
        endDate: convertDateValueToString(data?.endDate as DateValue),
      };

      sessionStorage.setItem(
        FORM_DATA_STORAGE_KEY,
        JSON.stringify(modifiedData),
      );
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  useEffect(() => {
    sessionStorage.setItem(CURRENT_STEP_STORAGE_KEY, currentStep.toString());
  }, [currentStep]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const setStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
        sessionStorage.setItem(CURRENT_STEP_STORAGE_KEY, step.toString());
      }
    },
    [totalSteps],
  );

  const onSubmit = async (data: CreateDonationFlowData) => {
    try {
      const response = await apiClient.post("/links", {
        type: "donation",
        title: data.title,
        description: data.description,
        goalAmount: +data.goal,
        destinationTokenAddress: data.paymentMethod.tokenAddress,
        destinationChainId: +data.paymentMethod.chainId,
        destinationWalletAddress: data.walletAddress,
        acceptUntil: data.endDate.toString(),
      });

      resetFlow();
      navigate(`/fundraiser/${response.data.id}?openShareModal=true`);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle submission error
      // toast to show submission error?
    }
  };

  return (
    <CreateDonationFlowContext.Provider
      value={{
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        setStep,
        resetFlow,
        onSubmit,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </CreateDonationFlowContext.Provider>
  );
};