import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import IndexPage from "@/pages/index";
import ShareModal from "@/components/share-modal";
import CreateProfileFlowPage from "./pages/create-profile-flow-page";
import NotFound404 from "./pages/404";
import ProfilePage from "./pages/profile-page";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />} path="/">
          <Route index element={<IndexPage />} />
        </Route>
        <Route path="/create/profile" element={<CreateProfileFlowPage />} />
        <Route path="*" element={<NotFound404 />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes >
      <ShareModal />
    </>
  );
}

export default App;