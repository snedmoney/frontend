// CreateProfileWrapper.tsx
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { CreateProfileFlowProvider } from "@/providers/createProfileFlow/createProfileFlowProvider";

// async function checkUserProfile(address: string): Promise<boolean> {

// }

const CreateProfileWrapper = () => {
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && address) {
      // if (isConnected && address) {
      //   const hasProfile = await checkUserProfile(address);
      //   if (hasProfile) {
      //     navigate('/profile');
      //   }
      // } else if (!isConnected && location.pathname !== '/create/profile') {
      //   // Redirect to signup page if wallet is disconnected and not already on signup page
      //   navigate('/create/profile');
      // }
    }
  }, [isConnected, address, navigate]);

  return (
    <CreateProfileFlowProvider totalSteps={3}>
      <Outlet />
    </CreateProfileFlowProvider>
  );
};

export default CreateProfileWrapper;
