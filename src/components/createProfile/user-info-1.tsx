import { useFormContext, Controller } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { ReactNode } from "react";

import FlowLayout from "@/layouts/flow-layout";
import useCreateProfileFlow from "@/hooks/use-create-profile-flow";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";

//TODO: need to check against backend to see if username already exists
const UserInfo1 = () => {
  const {
    control,
    trigger,
    formState: { errors },
    setValue,
  } = useFormContext<CreateProfileFlowData>();
  const { totalSteps, nextStep, prevStep } = useCreateProfileFlow();

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
            Let&apos;s get a few basic information from you.
          </h2>
          <h2 className="text-base md:text-lg text-foreground/80">
            Don&apos;t worry you can always change it later. 👌
          </h2>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-2 md:gap-4 md:pl-3">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            {...field}
            isClearable
            description="Could be title or name for your page"
            errorMessage={errors.name?.message as ReactNode}
            isInvalid={!!errors.name?.message}
            label="Name *"
            labelPlacement="outside"
            placeholder="Enter your name"
            radius="sm"
            variant="bordered"
            onClear={() => setValue("name", "")}
          />
        )}
        rules={{ required: "Name is required" }}
      />
      <Controller
        control={control}
        name="userName"
        render={({ field }) => (
          <Input
            {...field}
            isClearable
            description="Choose username for your profile link"
            errorMessage={errors.userName?.message as ReactNode}
            isInvalid={!!errors.userName?.message}
            label="Username *"
            labelPlacement="outside"
            placeholder="Your username"
            radius="sm"
            variant="bordered"
            onClear={() => setValue("userName", "")}
          />
        )}
        rules={{ required: "Username is required" }}
      />
      <Controller
        control={control}
        name="slogan"
        render={({ field }) => (
          <Input
            {...field}
            isClearable
            description="For example: video game streamer"
            errorMessage={errors.slogan?.message as ReactNode}
            isInvalid={!!errors.slogan?.message}
            label="Slogan *"
            labelPlacement="outside"
            placeholder="Your profile slogan"
            radius="sm"
            variant="bordered"
            onClear={() => setValue("slogan", "")}
          />
        )}
        rules={{ required: "Slogan is required" }}
      />
      <Controller
        control={control}
        name="about"
        render={({ field }) => (
          <Textarea
            {...field}
            errorMessage={errors.about?.message as ReactNode}
            isInvalid={!!errors.about?.message}
            label="About *"
            labelPlacement="outside"
            placeholder="Introduce yourself"
            variant="bordered"
          />
        )}
        rules={{ required: "About section is required" }}
      />
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
      rightContent={rightContent}
      rightFooterContent={rightFooterContent}
      totalSteps={totalSteps}
    />
  );
};

export default UserInfo1;
