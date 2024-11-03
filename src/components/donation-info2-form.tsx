import { ReactNode, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/react";

import { CreateDonationFlowData } from "@/providers/donation/createDonationFlowContext";

const DonationInfo2Form = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateDonationFlowData>();
  const [descriptionLength, setDescriptionLength] = useState(0);
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
            placeholder="Your fundraiser title"
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
            placeholder="Write description about fundraiser"
            variant="bordered"
            onChange={(e) => {
              field.onChange(e);
              setDescriptionLength(e.target.value.length);
            }}
            maxLength={255}
            description={`${descriptionLength}/255 characters`}
          />
        )}
        rules={{ required: "Description is required" }}
      />
    </>
  );
};

export default DonationInfo2Form;
