import DonationInfo1 from "./donation-info-1";
import DonationInfo2 from "./donation-info-2";

import useCreateDonationFlow from "@/hooks/use-create-donation-flow";
import SignUpPage from "@/components/sign-up-page";

const RenderCreateDonationSteps = () => {
  const { currentStep } = useCreateDonationFlow();

  switch (currentStep) {
    case 1:
      return <SignUpPage isDonationPage={true} />;
    case 2:
      return <DonationInfo1 />;
    case 3:
      return <DonationInfo2 />;
    default:
      return null;
  }
};

export default RenderCreateDonationSteps;