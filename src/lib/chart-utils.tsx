import { ComponentProps } from "react";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { SiteConfig } from "@/config/site";

type NavItem = SiteConfig;
type TNavbarItemProps = ComponentProps<"li"> & {
  item: NavItem;
  isDisabled?: boolean;
  isActive?: boolean;
  closeSidebar: () => void;
};

const NavbarItem = ({
  item,
  className,
  closeSidebar,
  isDisabled = false,
  isActive = false,
}: TNavbarItemProps) => {
  return (
    <li key={item.label} className={clsx("mb-1", className)}>
      <Link
        className={clsx(
          "flex items-center px-4 py-2 text-foreground hover:bg-default-200 rounded-lg opacity-100",
          {
            ["[&>svg]:ml-auto"]: item.hasExternalLink,
            "bg-default-200": isActive,
          },
        )}
        isDisabled={isDisabled}
        href={item.path}
        isExternal={item.hasExternalLink}
        showAnchorIcon={item.hasExternalLink}
        onPress={closeSidebar}
      >
        <span className="mr-3">{item.icon}</span>
        <span className="truncate">{item.label}</span>
        {item.soon && (
          <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded">
            Coming Soon
          </span>
        )}
      </Link>
    </li>
  );
};

export default NavbarItem;
