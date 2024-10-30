import { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/react";

import { CreateDonationFlowData } from "@/providers/donation/createDonationFlowContext";

const DonationInfo2Form = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateDonationFlowData>();

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input
            {...field}
            isClearable
            errorMessage={errors.title?.message as ReactNode}
            isInvalid={!!errors.title?.message}
            label="Title *"
            labelPlacement="outside"
            placeholder="Your fundriser title"
            radius="sm"
            type="text"
            variant="bordered"
            onClear={() => setValue("title", "")}
          />
        )}
        rules={{
          required: "Title is required",
        }}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            {...field}
            errorMessage={errors.description?.message as ReactNode}
            isInvalid={!!errors.description?.message}
            label="Description *"
            labelPlacement="outside"
            placeholder="Write description about fundriser"
            variant="bordered"
          />
        )}
        rules={{ required: "Description is required" }}
      />
    </>
  );
};

export default DonationInfo2Form;