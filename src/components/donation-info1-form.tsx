import { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker, Input } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";

import PaymentMethodSelector from "./payment-method-selector";

import { CreateDonationFlowData } from "@/providers/donation/createDonationFlowContext";

const DonationInfo1Form = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateDonationFlowData>();

  return (
    <>
      <Controller
        control={control}
        name="goal"
        render={({ field }) => (
          <Input
            {...field}
            isClearable
            description="Keep in mind that transaction fees, including credit and debit charges,
        are deducted from each donation."
            errorMessage={errors.goal?.message as ReactNode}
            isInvalid={!!errors.goal?.message}
            label="Goal *"
            labelPlacement="outside"
            placeholder="Your starting goal"
            radius="sm"
            type="text"
            variant="bordered"
            onClear={() => setValue("goal", "")}
          />
        )}
        rules={{
          validate: (value) => {
            if (!value) return "Goal is required";
            if (Number.isNaN(+value)) return "Goal must be number";
          },
        }}
      />

      <PaymentMethodSelector />
      <Controller
        control={control}
        name="endDate"
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            isRequired
            errorMessage={error?.message}
            isInvalid={!!error}
            label="End date"
            labelPlacement="outside"
            minValue={today(getLocalTimeZone()).add({ days: 1 })}
            variant="bordered"
            onChange={(date) => field.onChange(date)}
          />
        )}
        rules={{ required: "Date is required" }}
      />
    </>
  );
};

export default DonationInfo1Form;