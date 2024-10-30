import { useFormContext } from "react-hook-form";
import { Button } from "@nextui-org/react";

import FlowLayout from "@/layouts/flow-layout";
import useCreateProfileFlow from "@/hooks/use-create-profile-flow";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import UserInfo1Form from "@/components/user-info1-form";

const UserInfo1 = () => {
  const { trigger } = useFormContext<CreateProfileFlowData>();
  const { totalSteps, nextStep, prevStep, currentStep } = useCreateProfileFlow();

  const handleNext = async () => {
    const isValid = await trigger(["name", "userName", "about", "slogan"]);
    if (isValid) {
      nextStep();
    }
  };

  const leftContent = (
    <div className="flex flex-col h-full justify-between py-2 md:py-8 md:px-6">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-8">
          <h1 className="text-xl md:text-3xl font-bold text-foreground">
            Profile Setup
          </h1>
          <h2 className="text-base md:text-lg text-foreground/80">
            Let's get a few basic information from you.
          </h2>
          <h2 className="text-base md:text-lg text-foreground/80">
            Don't worry you can always change it later. 👌
          </h2>
        </div>
      </div>
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
      leftContent={leftContent}
      rightContent={
        <div className="flex flex-col gap-2 md:gap-4 md:pl-3">
          <UserInfo1Form />
        </div>
      }
      rightFooterContent={rightFooterContent}
      totalSteps={totalSteps}
      currentStep={currentStep}
    />
  );
};

export default UserInfo1;