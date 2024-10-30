import { useFormContext } from "react-hook-form";
import { Button } from "@nextui-org/react";

import DonationInfo1Form from "../donation-info1-form";

import FlowLayout from "@/layouts/flow-layout";
import useCreateDonationFlow from "@/hooks/use-create-donation-flow";
import { CreateDonationFlowData } from "@/providers/donation/createDonationFlowContext";

const DonationInfo1 = () => {
  const { trigger } = useFormContext<CreateDonationFlowData>();
  const { totalSteps, nextStep, prevStep, currentStep } =
    useCreateDonationFlow();

  const handleNext = async () => {
    const isValid = await trigger(["goal"]);

    if (isValid) {
      nextStep();
    }
  };

  const leftContent = (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Sned</h2>
      <p className="text-lg">
        Let&apos;s start by getting some basic information from you.
      </p>
    </div>
  );

  const rightFooterContent = (
    <div className="flex flex-col w-full justify-center gap-4 py-4 md:flex-row md:justify-between">
      <Button
        className="border-foreground font-bold flex justify-center items-center"
        variant="bordered"
        onClick={prevStep}
      >
        Back
      </Button>
      <Button
        className="bg-foreground text-background font-bold flex justify-center items-center"
        onClick={handleNext}
      >
        Continue
      </Button>
    </div>
  );

  return (
    <FlowLayout
      currentStep={currentStep}
      leftContent={leftContent}
      rightContent={
        <div className="flex flex-col gap-2 md:gap-4 md:pl-3">
          <DonationInfo1Form />
        </div>
      }
      rightFooterContent={rightFooterContent}
      totalSteps={totalSteps}
    />
  );
};

export default DonationInfo1;
