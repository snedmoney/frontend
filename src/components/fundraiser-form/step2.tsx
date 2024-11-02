import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useFundraiserFormContext } from "@/hooks/use-fundraiser-form";

const Step2: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { formData, updateFormData } = useFundraiserFormContext();

  console.log("===>", formData);

  const onSubmit = (data: any) => {
    updateFormData("step1", data);
    navigate("/step3");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1: Personal Information</h2>
      <input
        {...register("name")}
        defaultValue={formData.step1.name}
        placeholder="Name"
      />
      <input
        {...register("email")}
        defaultValue={formData.step1.email}
        placeholder="Email"
      />
      <button type="submit">Next</button>
    </form>
  );
};

export default Step2;