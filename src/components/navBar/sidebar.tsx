import DashboardSidebar from "./dashboard-sidebar";
import { Divider } from "@nextui-org/react";
import clsx from "clsx";

type TSidebarProps = {
    isOpen: boolean;
    closeSidebar: () => void;
};

const Sidebar = ({ isOpen, closeSidebar }: TSidebarProps) => {
    return (
        <aside
            className={clsx(
                "fixed lg:static w-full lg:w-1/4 h-[calc(100vh-64px)] overflow-y-auto bg-background transition-all duration-300 ease-in-out z-30",
                isOpen ? "left-0" : "-left-full lg:left-0"
            )}
            style={{ top: "64px" }}
        >
            <Divider orientation="horizontal" className="block lg:hidden" />
            <DashboardSidebar closeSidebar={closeSidebar} />
        </aside>
    );
};

export default Sidebar;
