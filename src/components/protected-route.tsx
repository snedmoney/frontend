import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useAuth } from "@/hooks/use-auth";
import NotFound404 from '@/pages/404';

const ProtectedRoute = () => {
  const { isConnected } = useAccount();
  const { token } = useAuth();

  if (!isConnected || !token) {
    return <NotFound404 message="Please Login to see this page" showConnectButton />;
  }

  return <Outlet />;
};

export default ProtectedRoute;