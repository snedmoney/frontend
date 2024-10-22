import { Controller, useFormContext } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { ReactNode, useState } from "react";

import PaymentMethodSelector from "../payment-method-selector";

import SocialSelectionWidget from "./social-selection-widget";

import useCreateProfileFlow from "@/hooks/use-create-profile-flow";
import FlowLayout from "@/layouts/flow-layout";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";

const UserInfo2 = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useFormContext<CreateProfileFlowData>();
  const { totalSteps, onSubmit, prevStep } = useCreateProfileFlow();
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
            We are almost at the finish line! Just need to know how you&apos;d
            like to be paid.
          </h2>
          <h2 className="text-base md:text-lg text-foreground/80 mt-2">
            And social media accounts to display on your profile page!
          </h2>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-2 md:gap-4 md:pl-3">
      <PaymentMethodSelector />
      <Controller
        control={control}
        name="websiteLink"
        render={({ field }) => (
          <Input
            {...field}
            isClearable
            errorMessage={errors.websiteLink?.message as ReactNode}
            isInvalid={!!errors.websiteLink?.message}
            label="Website"
            labelPlacement="outside"
            placeholder="https://"
            radius="sm"
            type="url"
            variant="bordered"
            onClear={() => setValue("websiteLink", "")}
          />
        )}
        rules={{
          validate: (value) => {
            if (value === "" || value === null) return true;
            try {
              new URL(value!);

              return true;
            } catch (_) {
              return "Please enter a valid URL";
            }
          },
        }}
      />
      <SocialSelectionWidget />
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
        disabled={isSubmitting}
        onClick={handleSubmit(handleSubmitWrapper)}
      >
        Submit
      </Button>
    </div>
  );

  return (
    <FlowLayout
      leftContent={leftContent}
      rightContent={rightContent}
      rightFooterContent={rightFooterContent}
      totalSteps={totalSteps}
    />
  );
};

export default UserInfo2;
