import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { ReactNode } from "react";

import PaymentMethodSelector from "./payment-method-selector";

import SocialSelectionWidget from "@/components/social-selection-widget";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";

const UserInfoForm2 = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateProfileFlowData>();

  return (
    <>
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
    </>
  );
};

export default UserInfoForm2;
