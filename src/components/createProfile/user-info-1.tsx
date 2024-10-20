import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import ProtectedRoute from "../protected-route";
import FlowLayout from '@/layouts/flow-layout';
import useCreateProfileFlow from "@/hooks/use-create-profile-flow";

const UserInfo1 = () => {
  const { register, formState: { errors, isValid } } = useFormContext();
  const { completeStep, canAccessStep, totalSteps} = useCreateProfileFlow();
  const navigate = useNavigate();

  const handleNext = () => {
    if (isValid) {
      completeStep(1);
      navigate('/create/profile/additional-info');
    }
  };

  const leftContent = (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Sned</h2>
      <p className="text-lg">Let's start by getting some basic information from you.</p>
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      {/* ... (form fields and button as in the previous example) ... */}
    </div>
  );

  return (
    <ProtectedRoute
      canAccess={canAccessStep(1)}
      redirectPath="/create/profile"
    >
      <FlowLayout
        leftContent={leftContent}
        rightContent={rightContent}
        currentStep={2}
        totalSteps={totalSteps}
      />
    </ProtectedRoute>
  )
}

export default UserInfo1;