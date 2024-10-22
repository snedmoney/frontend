import { Select, SelectItem } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import clsx from "clsx";

const animals = [
  {
    key: "a",
    label: "first",
  },
  {
    key: "b",
    label: "second",
  },
  {
    key: "c",
    label: "third",
  },
  {
    key: "d",
    label: "fourth",
  },
];

//TODO: connect to back end api for tokens and chains
const PaymentMethodSelector = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateProfileFlowData>();
  return (
    <div>
      <p
        className={clsx("text-small mb-2", {
          "text-danger": errors.paymentMethod,
        })}
      >
        Choose how you'd like to get paid *
      </p>
      <div className="flex flex-col justify-center w-full gap-2 md:gap-4 md:flex-row md:justify-start">
        <Controller
          name="paymentMethod.chainId"
          control={control}
          rules={{ required: "Please select a chain" }}
          render={({ field }) => (
            <Select
              {...field}
              label="Select chain *"
              placeholder="Select your preferred chain"
              className="w-full"
              variant="bordered"
              selectedKeys={[field.value]}
              onSelectionChange={(keys) => {
                const selectedValue = keys[0];
                setValue("paymentMethod.chainId", selectedValue);
              }}
              isInvalid={!!errors.paymentMethod?.chainId}
              errorMessage={errors.paymentMethod?.chainId?.message}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="paymentMethod.tokenAddress"
          control={control}
          rules={{ required: "Please select a coin" }}
          render={({ field }) => (
            <Select
              {...field}
              value={field.value}
              label="Select coin *"
              placeholder="Select your preferred coin"
              className="w-full"
              variant="bordered"
              selectedKeys={[field.value]}
              onSelectionChange={(keys) => {
                const selectedValue = keys[0];
                setValue("paymentMethod.tokenAddress", selectedValue);
              }}
              isInvalid={!!errors.paymentMethod?.tokenAddress}
              errorMessage={errors.paymentMethod?.tokenAddress?.message}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
