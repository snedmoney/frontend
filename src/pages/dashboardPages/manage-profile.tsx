import  { useEffect, useState } from 'react';
import { Button, Divider, Link } from "@nextui-org/react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import UserInfoForm1 from "@/components/user-info1-form";
import UserInfoForm2 from "@/components/user-info2-form";
import { defaultFormValues } from '@/providers/createProfileFlow/createProfileFlowProvider';
import { TbEyeCode } from 'react-icons/tb';

const ManageProfile = () => {
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const methods = useForm<CreateProfileFlowData>({
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = methods.watch(() => {
      setHasChanges(methods.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleSave: SubmitHandler<CreateProfileFlowData> = async (data) => {
    const isValid = await methods.trigger();
    if (isValid) {
      console.log("Saving data:", data);
      setHasChanges(false);
      // Handle successful save (e.g., show a success message)
    }
  };

  const handleCancel = () => {
    if (!hasChanges || confirm("You have unsaved changes. Are you sure you want to cancel?")) {
      methods.reset(defaultFormValues);
      setHasChanges(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Profile</h1>
        <Button
          as={Link}
          color="primary"
          href=''
          endContent={<TbEyeCode size='20' />}
          target="_blank"
        >
          View My Page
        </Button>
      </div>
      <Divider />
      <div className='py-4 flex flex-col gap-4'>
        <UserInfoForm1 />
        <UserInfoForm2 />
      </div>
      <Divider />
      <div className='py-4 flex justify-end space-x-4'>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          type="submit"
          className="bg-foreground text-background"
          onClick={methods.handleSubmit(handleSave)}
        >
          Save
        </Button>
      </div>
    </FormProvider>
  );
};

export default ManageProfile;