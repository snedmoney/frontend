import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import ProtectedRoute from "../protected-route";
import FlowLayout from "@/layouts/flow-layout";
import useCreateProfileFlow from "@/hooks/use-create-profile-flow";

const UserInfo2 = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useFormContext();
  const { completeStep, canAccessStep } = useCreateProfileFlow();
  const navigate = useNavigate();

  const handleNext = () => {
    if (isValid) {
      completeStep(2);
      navigate("/create/profile/preferences"); // Assuming the next step is 'preferences'
    }
  };

  const handlePrevious = () => {
    navigate("/create/profile/user-info1");
  };

  const leftContent = (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Sned</h2>
      <p className="text-lg">
        Let's start by getting some basic information from you.
      </p>
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      {/* ... (form fields and button as in the previous example) ... */}
    </div>
  );

  return (
    <ProtectedRoute
      canAccess={canAccessStep(2)}
      redirectPath="/create/profile/user-info1"
    >
      <FlowLayout
        leftContent={leftContent}
        rightContent={rightContent}
        currentStep={2}
        totalSteps={3}
      />
    </ProtectedRoute>
  );
};

export default UserInfo2;
