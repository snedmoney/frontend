import { Divider } from "@nextui-org/react";
import { Navbar } from "@/components/navBar/navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navBar/sidebar";
import { useState } from "react";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex flex-col h-screen">
            <Navbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Divider />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar
                    closeSidebar={() => setIsSidebarOpen(false)}
                    isOpen={isSidebarOpen}
                />
                <Divider orientation="vertical" className="hidden lg:block" />
                <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
