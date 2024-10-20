import { useContext } from "react";
import CreateProfileFlowContext, {
  CreateProfileFlowContextType,
} from "@/providers/createProfileFlow/createProfileFlowContext";

const useCreateProfileFlow = (): CreateProfileFlowContextType => {
  const context = useContext(CreateProfileFlowContext);
  if (!context) {
    throw new Error(
      "useCreateProfileFlow must be used within a CreateProfileFlowProvider"
    );
  }
  return context;
};

export default useCreateProfileFlow;
