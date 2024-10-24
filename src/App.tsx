import { Route, Routes } from "react-router-dom";

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

import ShareModal from "@/components/share-modal";
import IndexPage from "@/pages/index";
import DefaultLayout from "@/layouts/default";

function App() {
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
        <Route element={<NotFound404 />} path="*" />
      </Routes>
      <ShareModal />
    </>
  );
}

export default App;
