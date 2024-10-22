import { useAccount, useDisconnect } from "wagmi";
import { useLocation } from "react-router-dom";
import NavbarItem from "./navbar-item";
import { siteConfig } from "@/config/site";
import { IoWalletOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const DashboardSidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const location = useLocation(); // Use the router to get the current path

  const walletAddress = {
    icon: <IoWalletOutline size="20" />,
    label: address as string,
  };
  const disconnectItem = {
    icon: <FiLogOut size="20" />,
    label: "Logout",
  };

  const isActive = (path: string) => location.pathname === `/${path}`;

  return (
    <nav className="h-full bg-background">
      <ul className="space-y-2 py-4 px-2 lg:py-8 lg:px-4">
        {!!address && (
          <NavbarItem
            key="address"
            item={walletAddress}
            isDisabled
            closeSidebar={closeSidebar}
          />
        )}
        {siteConfig.dashboard_nav_items.main.map((item) => (
          <NavbarItem
            key={item.label}
            item={item}
            closeSidebar={closeSidebar}
            isActive={isActive(item.path)}
          />
        ))}
        <li className="pr-4 py-2 text-xs font-semibold text-gray-400 uppercase">
          Monetize
        </li>
        {siteConfig.dashboard_nav_items.monetize.map((item) => (
          <NavbarItem
            key={item.label}
            item={item}
            closeSidebar={closeSidebar}
            isActive={isActive(item.path)}
          />
        ))}
        <li className="pr-4 py-2 text-xs font-semibold text-gray-400 uppercase">
          Settings
        </li>
        {siteConfig.dashboard_nav_items.settings.map((item) => (
          <NavbarItem
            key={item.label}
            item={item}
            closeSidebar={closeSidebar}
            isActive={isActive(item.path)}
          />
        ))}
        <li className="pr-4 py-2 text-xs font-semibold text-gray-400 uppercase">
          More
        </li>
        {siteConfig.dashboard_nav_items.more.map((item) => (
          <NavbarItem
            key={item.label}
            item={item}
            closeSidebar={closeSidebar}
            isActive={isActive(item.path)}
          />
        ))}
        <NavbarItem
          key="logout"
          item={disconnectItem}
          closeSidebar={disconnect}
        />
      </ul>
    </nav>
  );
};

export default DashboardSidebar;
