import { Controller, useFormContext } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/react";
import { ReactNode, useState, useCallback, useRef, useEffect } from "react";

import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import { apiClient } from "@/config/api";

const USERNAME_PATTERN = /^[a-z0-9_]+$/;

const UserInfo1Form = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CreateProfileFlowData>();
  const [aboutLength, setAboutLength] = useState(0);
  const originalUsernameRef = useRef("");
  const currentUsername = watch("userName");

  useEffect(() => {
    originalUsernameRef.current = currentUsername || "";
  }, []);

  const checkIfUsernameIsTaken = useCallback(async (username = "") => {
    try {
      const { data: userData } = await apiClient.get(
        `/users/username${username.length === 0 ? "" : "/"}${username}`,
      );

      return userData?.user?.userName;
    } catch (e) {
      if (e instanceof Error && "status" in e && e.status === 404) {
        return null;
      }
      throw e;
    }
  }, []);

  const validateUsername = useCallback(
    async (value: string) => {
      if (value === originalUsernameRef.current) {
        return true;
      }

      // Check for pattern validation first
      if (!USERNAME_PATTERN.test(value)) {
        return "Username can only contain lowercase letters, numbers, and underscores";
      }

      const takenUsername = await checkIfUsernameIsTaken(value);

      if (takenUsername && takenUsername !== originalUsernameRef.current) {
        return "Username is taken";
      }

      return true;
    },
    [checkIfUsernameIsTaken],
  );

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
        rules={{
          required: "Username is required",
          validate: validateUsername,
        }}
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
            description={`${aboutLength}/255 characters`}
            errorMessage={errors.about?.message as ReactNode}
            isInvalid={!!errors.about?.message}
            label="About *"
            labelPlacement="outside"
            maxLength={255}
            placeholder="Introduce yourself"
            variant="bordered"
            onChange={(e) => {
              field.onChange(e);
              setAboutLength(e.target.value.length);
            }}
          />
        )}
        rules={{ required: "About section is required" }}
      />
    </>
  );
};

export default UserInfo1Form;
