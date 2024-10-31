import { Outlet } from "react-router-dom";

import NavbarLandingPage from "@/components/landingPage/navbar-landing-page";

const LandingPageLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <NavbarLandingPage />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingPageLayout;
