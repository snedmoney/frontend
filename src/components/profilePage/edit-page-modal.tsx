import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import UserInfoForm1 from "@/components/user-info1-form";
import UserInfoForm2 from "@/components/user-info2-form";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useGetProfileByAddress from "@/hooks/use-get-profile-by-address";
import useUpdateProfile from "@/hooks/use-update-profile";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type EditPageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: CreateProfileFlowData;
};

const EditPageModal = ({
  isOpen,
  onClose,
  initialData,
}: EditPageModalProps) => {
  const { address } = useAccount();
  const [hasChanges, setHasChanges] = useState(false);
  const { data } = useGetProfileByAddress(address);
  const navigate = useNavigate();
  const methods = useForm<CreateProfileFlowData>({
    defaultValues: data?.user || initialData,
    mode: "onChange",
  });
  const {
    mutate: updateUser,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatingProfile,
    isError: isUpdateError,
  } = useUpdateProfile(data?.user.id);

  // when previous profile information comes in, update the default values
  useEffect(() => {
    if (data?.user) {
      const defaultProfile = data.user;
      methods.reset(defaultProfile);
    }
  }, [data]);

  const resetForm = () => {
    methods.reset(data?.user || initialData);
  };

  useEffect(() => {
    if (isUpdateError) {
      toast.error("There was an issue in updating your profile");
    } else if (isUpdateSuccess) {
      toast.success("Profile updated successfully");
      onClose();
      const updatedUserName = methods.getValues("userName");
      navigate(`/profile/${updatedUserName}`);
    }
  }, [isUpdateSuccess, isUpdateError]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setHasChanges(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const subscription = methods.watch(() => {
      setHasChanges(methods.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleSave = async (data: CreateProfileFlowData) => {
    const isValid = await methods.trigger();
    if (isValid) {
      console.log("Saving data:", data);
      // Here you would typically send the data to your backend
      updateUser(data);
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      if (
        confirm("🚨 You have unsaved changes. Are you sure you want to close?")
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="mx-0 my-0 rounded-t-lg rounded-b-none sm:rounded-b-lg"
      classNames={{
        closeButton: "top-2 right-2.5 sm:top-3 sm:right-4 rounded-none",
        base: "h-[calc(100dvh-88px)] sm:h-auto",
      }}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <FormProvider {...methods}>
          <ModalHeader className="flex flex-col gap-1 py-3 px-3 sm:py-4 sm:px-6">
            <span className="text-medium font-bold">Edit Profile</span>
          </ModalHeader>
          <Divider />
          <ModalBody className="text-default-600 py-4 gap-4">
            <UserInfoForm1 />
            <UserInfoForm2 />
          </ModalBody>
          <Divider />
          <ModalFooter className="px-4 py-2 md:px-6 md:py-4">
            <Button
              type="submit"
              className="bg-foreground text-background"
              isLoading={isUpdatingProfile}
              onClick={methods.handleSubmit(handleSave)}
            >
              Save
            </Button>
          </ModalFooter>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default EditPageModal;