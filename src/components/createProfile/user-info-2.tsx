import { Button } from "@nextui-org/react";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import FlowLayout from "@/layouts/flow-layout";
import UserInfo2Form from "@/components/user-info2-form";
import useCreateProfileFlow from "@/hooks/use-create-profile-flow";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const UserInfo2 = () => {
  const { handleSubmit } = useFormContext<CreateProfileFlowData>();
  const { totalSteps, onSubmit, prevStep, currentStep } = useCreateProfileFlow();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWrapper = async (data: CreateProfileFlowData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftContent = (
    <div className="flex flex-col h-full justify-between py-2 md:py-8 md:px-6">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-8">
          <h1 className="text-xl md:text-3xl font-bold text-foreground">
            Payment Method & Social Links
          </h1>
          <h2 className="text-base md:text-lg text-foreground/80 mt-2">
            We are almost at the finish line! Just need to know how you'd like
            to be paid.
          </h2>
          <h2 className="text-base md:text-lg text-foreground/80 mt-2">
            And social media accounts to display on your profile page!
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
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        onClick={handleSubmit(handleSubmitWrapper)}
      >
        Submit
      </Button>
    </div>
  );

  return (
    <FlowLayout
      leftContent={leftContent}
      rightContent={
        <div className="flex flex-col gap-2 md:gap-4 md:pl-3">
          <UserInfo2Form />
        </div>
      }
      rightFooterContent={rightFooterContent}
      totalSteps={totalSteps}
      currentStep={currentStep}
    />
  );
};

export default UserInfo2;