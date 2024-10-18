import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ShareModal from "@/components/share-modal";

function App() {
  return (
    <>
      <Routes>
        <Route element={<IndexPage />} path="/" />
      </Routes>
      <ShareModal />
    </>
  );
}

export default App;
