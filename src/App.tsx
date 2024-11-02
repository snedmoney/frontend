import { Route, Routes } from "react-router-dom";
import { useAccount, useSignMessage } from "wagmi";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import CreateDonationFlowPage from "./pages/create-donation-flow-page";
import CreateProfileFlowPage from "./pages/create-profile-flow-page";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardPage from "./pages/dashboardPages/dashboard";
import FundraisePage from "./pages/dashboardPages/fundraise";
import ManageProfile from "./pages/dashboardPages/manage-profile";
import MembershipsPage from "./pages/dashboardPages/memberships";
import NotFound404 from "./pages/404";
import ProfilePage from "./pages/profile-page";
import SettingsPage from "./pages/dashboardPages/settings";
import FundraiserPage from "./pages/fundraiser";
import LandingPage from "./pages/landing-page";
import LandingPageLayout from "./layouts/landing-page-layout";
import ShopPage from "./pages/dashboardPages/shop";
import TransactionHistoryPage from "./pages/dashboardPages/transaction-history";

import ShareModal from "@/components/share-modal";
import DefaultLayout from "@/layouts/default";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />} path="/profile/">
          <Route element={<ProfilePage />} path=":username" />
        </Route>
        <Route element={<DefaultLayout />} path="/fundraiser/">
          <Route element={<FundraiserPage />} path=":id" />
        </Route>
        <Route element={<DashboardLayout />} path="/user/">
          <Route element={<DashboardPage />} path="dashboard" />
          <Route element={<TransactionHistoryPage />} path="history" />
          <Route element={<ManageProfile />} path="profile" />
          <Route element={<FundraisePage />} path="fundraise" />
          <Route element={<MembershipsPage />} path="memberships" />
          <Route element={<ShopPage />} path="shop" />
          <Route element={<SettingsPage />} path="settings" />
        </Route>
        <Route element={<CreateProfileFlowPage />} path="/create/profile" />
        <Route element={<LandingPageLayout />} path="/">
          <Route index element={<LandingPage />} />
        </Route>
        <Route element={<CreateProfileFlowPage />} path="/create/profile" />
        <Route element={<CreateDonationFlowPage />} path="/create/fundraiser" />
        <Route element={<NotFound404 />} path="*" />
      </Routes>
      <ShareModal />
      <Toaster />
    </>
  );
}

export default App;
