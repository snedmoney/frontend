import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAccount, useSignMessage } from "wagmi";

import CreateProfileFlowPage from "./pages/create-profile-flow-page";
import NotFound404 from "./pages/404";
import ProfilePage from "./pages/profile-page";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardPage from "./pages/dashboardPages/dashboard";
import TransactionHistoryPage from "./pages/dashboardPages/transaction-history";
import FundraisePage from "./pages/dashboardPages/fundraise";
import ManageProfile from "./pages/dashboardPages/manage-profile";
import MembershipsPage from "./pages/dashboardPages/memberships";
import ShopPage from "./pages/dashboardPages/shop";
import SettingsPage from "./pages/dashboardPages/settings";
import CreateDonationFlowPage from "./pages/create-donation-flow-page";

import ShareModal from "@/components/share-modal";
import IndexPage from "@/pages/index";
import DefaultLayout from "@/layouts/default";
import { apiClient } from "@/config/api";

function App() {
  const token = localStorage.getItem("token");
  const { isConnected, isDisconnected } = useAccount();
  const { signMessage, isSuccess, data } = useSignMessage();
  const authMessage = `Welcome to Sned!

  By connecting your wallet, you authorize Sned to:
  
  1. View your wallet address
  2. Request approval for transactions
  3. Display your account balance and assets
  
  This connection does not give us permission to:
  • Initiate transactions without your approval
  • Access your private keys
  • Transfer funds without your explicit consent
  
  You can disconnect your wallet at any time.
  
  To proceed, please sign this message to verify your ownership of the wallet.`;

  useEffect(() => {
    if (!token && isConnected) {
      signMessage({ message: authMessage });
    }
  }, [isConnected]);

  useEffect(() => {
    if (isDisconnected) {
      localStorage.removeItem("token");
    }
  }, [isDisconnected]);

  useEffect(() => {
    async function process() {
      if (isSuccess && data) {
        apiClient.post("/authorize", { signature: data }).then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          }
        });
      }
    }
    process();
  }, [isSuccess, data]);

  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />} path="/">
          <Route index element={<IndexPage />} />
          <Route element={<ProfilePage />} path="/profile/:username" />
        </Route>
        <Route element={<DashboardLayout />} path="/user">
          <Route element={<DashboardPage />} path="dashboard" />
          <Route element={<TransactionHistoryPage />} path="history" />
          <Route element={<ManageProfile />} path="profile" />
          <Route element={<FundraisePage />} path="fundraise" />
          <Route element={<MembershipsPage />} path="memberships" />
          <Route element={<ShopPage />} path="shop" />
          <Route element={<SettingsPage />} path="settings" />
          {/* <Route element={<PostsPage />} path="posts" />
          <Route element={<GalleryPage />} path="gallery" />
          <Route element={<MessagesPage />} path="messages" />
          <Route element={<ButtonsPage />} path="buttons" />
          <Route element={<IntegrationsPage />} path="integrations" />
          <Route element={<PayoutsPage />} path="payouts" /> */}
        </Route>
        <Route element={<CreateProfileFlowPage />} path="/create/profile" />
        <Route element={<CreateDonationFlowPage />} path="/create/fundraiser" />
        <Route element={<NotFound404 />} path="*" />
      </Routes>
      <ShareModal />
    </>
  );
}

export default App;
