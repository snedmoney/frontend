import { Button, useDisclosure } from "@nextui-org/react";

import EditPageModal from "./edit-page-modal";
import { IoShareSocialOutline } from "react-icons/io5";
import SocialMediaList from "./social-media-list";
import { defaultFormValues } from "@/providers/createProfileFlow/createProfileFlowProvider";
import useShareModal from "@/hooks/use-share-modal";
import { useNavigate } from "react-router-dom";
import { Social } from "@/hooks/use-get-profile-by-address";

type ProfileHeaderProps = {
  name: string;
  isOwnProfile?: boolean;
  socials?: Social[];
  slogan?: string;
};

const ProfileHeader = ({
  name,
  socials,
  isOwnProfile,
  slogan,
}: ProfileHeaderProps) => {
  const openShareModal = useShareModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onClickJoinFree = () => {
    navigate("/create/profile");
  };

  return (
    <>
      <div className="h-72 relative">
        <img
          alt="user banner"
          className="w-full h-full"
          src="https://images.unsplash.com/photo-1725772685998-be930f3209b9?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="absolute -bottom-10 inset-x-0 flex justify-center">
          <img
            className="w-24 h-24 bg-gray-400 rounded-full border-4 border-white"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            alt="user image"
          />
        </div>
      </div>
      <div className="pt-12 pb-6 px-4 md:px-8 flex flex-col justify-center text-center items-center">
        <h1 className="text-xl font-bold text-default-900 mb-1">
          {name} | {slogan}
        </h1>
        <p className="text-default-500 mb-4">180 Donations | 30 Members</p>
        <div className="flex justify-center items-center space-x-2 gap-2 mb-4 w-full">
          {!isOwnProfile && (
            <Button
              variant="solid"
              radius="sm"
              className="flex-1 min-w-[140px] max-w-[220px]"
              color="primary"
              onClick={onClickJoinFree}
            >
              Join for free
            </Button>
          )}
          {isOwnProfile && (
            <Button
              variant="ghost"
              radius="sm"
              className="flex-1 min-w-[140px] max-w-[220px]"
              color="default"
              onPress={onOpen}
            >
              Edit page
            </Button>
          )}
          <Button
            isIconOnly
            variant="solid"
            radius="sm"
            onPress={openShareModal}
          >
            <IoShareSocialOutline />
          </Button>
        </div>
        {socials && <SocialMediaList socials={socials} />}
        <EditPageModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={defaultFormValues}
        />
      </div>
    </>
  );
};

export default ProfileHeader;