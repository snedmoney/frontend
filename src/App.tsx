import { Route, Routes } from "react-router-dom";

import CreateProfileFlowPage from "./pages/create-profile-flow-page";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardPage from "./pages/dashboardPages/dashboard";
import DefaultLayout from "@/layouts/default";
import FundraisePage from "./pages/dashboardPages/fundraise";
import HistoryPage from "./pages/dashboardPages/history";
import IndexPage from "@/pages/index";
import MembershipsPage from "./pages/dashboardPages/memberships";
import NotFound404 from "./pages/404";
import ProfilePage from "./pages/profile-page";
import SettingsPage from "./pages/dashboardPages/settings";
import ShareModal from "@/components/share-modal";
import ShopPage from "./pages/dashboardPages/shop";

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
                  <Route element={<HistoryPage />} path="history" />
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
              <Route
                  path="/create/profile"
                  element={<CreateProfileFlowPage />}
              />
              <Route path="*" element={<NotFound404 />} />
          </Routes>
          <ShareModal />
      </>
  );
}

export default App;