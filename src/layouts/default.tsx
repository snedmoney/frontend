import { Navbar } from "@/components/navBar/navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col md:overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
