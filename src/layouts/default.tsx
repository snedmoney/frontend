import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/navBar/navbar";

export default function DefaultLayout() {
  return (
    <div className="relative">
      <Navbar />
      <main className="flex-1 flex flex-col md:overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}