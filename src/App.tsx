import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import IndexPage from "@/pages/index";
import ShareModal from "@/components/share-modal";
import SignUpPage from "@/components/sign-up-page";
import UserInfo1 from "@/components/createProfile/user-info-1";
import UserInfo2 from "@/components/createProfile/user-info-2";
import CreateProfileWrapper from "@/components/createProfile/createProfileWrapper";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />} path="/">
          <Route index element={<IndexPage />} />
        </Route>
        <Route path="/create/profile" element={<CreateProfileWrapper />}>
          <Route index element={<SignUpPage isDonationPage={false} />} />
          <Route path="user-info1" element={<UserInfo1 />} />
          <Route path="user-info2" element={<UserInfo2 />} />
        </Route>
      </Routes>
      <ShareModal />
    </>
  );
}

export default App;
