import useCreateProfileFlow from "@/hooks/use-create-profile-flow";
import SignUpPage from "@/components/sign-up-page";
import UserInfo1 from "@/components/createProfile/user-info-1";
import UserInfo2 from "@/components/createProfile/user-info-2";

const RenderCreateProfileSteps = () => {
  const { currentStep } = useCreateProfileFlow();

  switch (currentStep) {
    case 1:
      return <SignUpPage isDonationPage={false} />;
    case 2:
      return <UserInfo1 />;
    case 3:
      return <UserInfo2 />;
    default:
      return null;
  }
};

export default RenderCreateProfileSteps;
