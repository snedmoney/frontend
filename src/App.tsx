import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import IndexPage from "@/pages/index";
import ShareModal from "@/components/share-modal";
import CreateProfileFlowPage from "./pages/create-profile-flow-page";
import NotFound404 from "./pages/404";
import ProfilePage from "./pages/profile-page";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardPage from "./pages/dashboardPages/dashboard";
import TransactionHistoryPage from "./pages/dashboardPages/transaction-history";
import FundraisePage from "./pages/dashboardPages/fundraise";
import MembershipsPage from "./pages/dashboardPages/memberships";
import ShopPage from "./pages/dashboardPages/shop";
import SettingsPage from "./pages/dashboardPages/settings";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />} path="/">
          <Route index element={<IndexPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Route>
        <Route path="/user" element={<DashboardLayout />}>
          <Route element={<DashboardPage />} path="dashboard" />
          <Route element={<TransactionHistoryPage />} path="history" />
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
        <Route path="/create/profile" element={<CreateProfileFlowPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <ShareModal />
    </>
  );
}

export default App;
