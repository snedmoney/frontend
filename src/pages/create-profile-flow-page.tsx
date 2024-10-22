import { CreateProfileFlowProvider } from "@/providers/createProfileFlow/createProfileFlowProvider";
import RenderCreateProfileSteps from "@/components/createProfile/render-create-profile-steps";

const CreateProfileFlowPage = () => (
  <CreateProfileFlowProvider totalSteps={3}>
    <RenderCreateProfileSteps />
  </CreateProfileFlowProvider>
);

export default CreateProfileFlowPage;
