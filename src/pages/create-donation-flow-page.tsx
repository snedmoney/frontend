import RenderCreateDonationSteps from "@/components/createDonation/render-create-profile-steps";
import { CreateDonationFlowProvider } from "@/providers/donation/createDonationFlowProvider";

const CreateDonationFlowPage = () => (
  <CreateDonationFlowProvider totalSteps={3}>
    <RenderCreateDonationSteps />
  </CreateDonationFlowProvider>
);

export default CreateDonationFlowPage;