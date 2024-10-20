import { Route, Routes } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import IndexPage from "@/pages/index";
import ShareModal from "@/components/share-modal";

function App() {
    return (
        <>
            <Routes>
                <Route element={<DefaultLayout />} path='/'>
                    <Route index element={<IndexPage />} />
                </Route>
            </Routes>
            <ShareModal />
        </>
    );
}

export default App;
