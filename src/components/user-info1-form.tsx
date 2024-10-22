import { useFormContext, Controller } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/react";
import { ReactNode } from "react";

import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";

const UserInfo1Form = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateProfileFlowData>();

  return (
    <>
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
    </>
  );
};

export default UserInfo1Form;
