import { useEffect, useState } from "react";
import { Button, Divider, Link } from "@nextui-org/react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { TbEyeCode } from "react-icons/tb";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import UserInfoForm1 from "@/components/user-info1-form";
import UserInfoForm2 from "@/components/user-info2-form";
import { defaultFormValues } from "@/providers/createProfileFlow/createProfileFlowProvider";
import useGetProfile from "@/hooks/use-get-profile";
import useUpdateProfile from "@/hooks/use-update-profile";

const ManageProfile = () => {
  const { address } = useAccount();
  const { data } = useGetProfile(address);
  const {
    mutate: updateUser,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatingProfile,
    isError: isUpdateError,
  } = useUpdateProfile(data?.user.id);

  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const methods = useForm<CreateProfileFlowData>({
    defaultValues: data?.user || defaultFormValues,
    mode: "onChange",
  });

  // when previous profile information comes in, update the default values
  useEffect(() => {
    if (data?.user) {
      const defaultProfile = data.user;

      methods.reset(defaultProfile);
    }
  }, [data]);

  useEffect(() => {
    const subscription = methods.watch(() => {
      setHasChanges(methods.formState.isDirty);
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error("There was an issue in updating your profile");
    } else if (isUpdateSuccess) {
      toast.success("Profile updated successfully");
    }
  }, [isUpdateSuccess, isUpdateError]);

  const handleSave: SubmitHandler<CreateProfileFlowData> = async (data) => {
    const isValid = await methods.trigger();

    if (isValid) {
      setHasChanges(false);
      // Handle successful save (e.g., show a success message)
      updateUser(data);
    }
  };

  const handleCancel = () => {
    if (
      !hasChanges ||
      confirm("You have unsaved changes. Are you sure you want to cancel?")
    ) {
      methods.reset(data?.user || defaultFormValues);
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
          endContent={<TbEyeCode size="20" />}
          href=""
          target="_blank"
        >
          View My Page
        </Button>
      </div>
      <Divider />
      <div className="py-4 flex flex-col gap-4">
        <UserInfoForm1 />
        <UserInfoForm2 />
      </div>
      <Divider />
      <div className="py-4 flex justify-end space-x-4">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          className="bg-foreground text-background"
          isLoading={isUpdatingProfile}
          type="submit"
          onClick={methods.handleSubmit(handleSave)}
        >
          Save
        </Button>
      </div>
    </FormProvider>
  );
};

export default ManageProfile;