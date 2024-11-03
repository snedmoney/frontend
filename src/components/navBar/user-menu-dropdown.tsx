import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
    Avatar,
    Link,
  } from "@nextui-org/react";
  import { FiLogOut, FiLogIn } from "react-icons/fi";
  import { useAccount, useDisconnect } from "wagmi";
  import { useConnectModal } from "@rainbow-me/rainbowkit";
  import { PiDotsThreeOutlineVertical } from "react-icons/pi";
  import clsx from "clsx";
  import { useLocation } from "react-router-dom";
  import {
    loggedOutItems,
    loggedInItems,
    type DropdownItemProps,
  } from "@/config/site";
  import { AiOutlineMenu } from "react-icons/ai";
  import { IoCamera, IoWalletOutline } from "react-icons/io5";
  import useGetProfileLinks from "@/hooks/use-get-profile-links";
  import { useCallback, useMemo } from "react";
  import useGetProfileByAddress from "@/hooks/use-get-profile-by-address";
  
  //not logged in (on client page)
  // - login
  // - join for free
  // - create your page (profile/donation)
  // - share page(profile/donation)
  // - about (redirect to content creator landing page/redirect to fundraiser landing page)
  // - get help (link to our discord)
  
  // logged in (on client page)
  // - wallet address
  // - create your page (not owner) (profile/donation) / view my page (if link exists)
  // - share page (profile/donation)
  // - my analytics (redirect based on wallet address)
  // - my account (settings)
  // - transaction history
  // - logout
  // - get help (link to our discord)
  
  // dashboard (only shown on logged in)
  // - wallet address
  // - create your page (profile/donation) / view my page (if link exists)
  // - share page (profile/donation)
  // - my analytics
  // - my account (settings)
  // - transaction history
  // - logout
  // - get help (link to our discord)
  
  const UserMenuDropdown = ({
    onUserMenuClick,
  }: {
    onUserMenuClick: () => void;
  }) => {
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { disconnect } = useDisconnect();
    const location = useLocation();
    const isDashboardLink = /user/i.test(location.pathname);
    const { data: user } = useGetProfileByAddress(address);
    const { data: links } = useGetProfileLinks(address);
  
    const hasProfileLink = useMemo(() => {
      if (!links) return false;
  
      return links.find((link) => link.type === "profile");
    }, [links]);
  
    const loggedInItemsFiltered = useCallback(() => {
      let items = loggedInItems();
  
      if (hasProfileLink)
        items = items.filter((item) => item.label !== "Create your page");
  
      if (!hasProfileLink)
        items = items.filter(
          (item) =>
            item.label !== "View your page" && item.label !== "Manage your page",
        );
  
      if (user?.user)
        items = items.map((item) => {
          if (item.label === "View your page") {
            return {
              ...item,
              href: `/profile/${user.user.userName}`,
            };
          }
  
          return item;
        });
  
      return items;
    }, [hasProfileLink, user]);
  
    const dropdownItemClassName =
      "flex items-center space-x-2 data-[hover=true]:bg-default-200 hover:text-accent-foreground rounded-md p-2 transition-colors";
  
    const renderDropdownItems = (itemsFunction: () => DropdownItemProps[]) => {
      const items = itemsFunction();
      return items.map((item, index) => (
        <DropdownItem
          key={index}
          className={dropdownItemClassName}
          textValue={item.label}
        >
          {item?.href ? (
            <Link
              href={item?.href}
              color="foreground"
              className="px-3 flex items-center gap-4 w-full"
              target={item.newTab ? "_blank" : "_self"}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ) : (
            <div
              className="px-3 flex items-center gap-4 w-full"
              onClick={item?.action}
            >
              {item.icon && item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          )}
        </DropdownItem>
      ));
    };
  
    return (
      <Dropdown
        className={clsx(
          "lg:flex border-1 border-foreground/20 p-0 max-w-[325px]",
          {
            hidden: isDashboardLink,
          },
        )}
      >
        <DropdownTrigger>
          <button className="px-0" onClick={onUserMenuClick}>
            {!isConnected ? (
              <PiDotsThreeOutlineVertical size="24" className="h-[40px]" />
            ) : (
              <div
                className="flex rounded-medium hover:bg-default border-default h-10 gap-2 px-2 items-center border-2"
                aria-label="setting nav dropdown"
              >
                <Avatar
                  showFallback
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  className="bg-transparent"
                  fallback={<IoCamera className="" size={24} />}
                />
                <AiOutlineMenu size="24" />
                <span className="sr-only">Toggle navigation menu</span>
              </div>
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu"
          className="overflow-auto max-h-[70vh] p-0 w-full"
        >
          <DropdownSection
            showDivider
            classNames={{ base: "mb-0", divider: "mt-0" }}
          >
            <DropdownItem
              className={clsx(
                dropdownItemClassName,
                "my-2 data-[hover=true]:bg-default",
              )}
              textValue="login status"
            >
              {!isConnected ? (
                <button
                  onClick={() => openConnectModal?.()}
                  className="px-3 py-1 flex items-center gap-4 w-full"
                >
                  <FiLogIn size="20" />
                  <p className="font-bold">Login</p>
                </button>
              ) : (
                <span className="flex items-center gap-4 px-3">
                  <IoWalletOutline size="28" className="text-muted-foreground" />
                  <span className="text-sm font-medium truncate">{address}</span>
                </span>
              )}
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            showDivider={isConnected}
            classNames={{ base: "mb-0", divider: "mt-0" }}
            className={`${!isConnected ? "mb-0" : ""}`}
          >
            {!isConnected
              ? renderDropdownItems(loggedOutItems)
              : renderDropdownItems(loggedInItemsFiltered)}
          </DropdownSection>
          <DropdownSection classNames={{ base: "mb-0", divider: "mt-0" }}>
            <DropdownItem
              className={`flex items-center space-x-2 data-[hover=true]:bg-danger-400 hover:text-accent-foreground rounded-md p-2 my-2 transition-colors ${!isConnected ? "hidden" : ""}`}
              textValue="logout"
            >
              <div
                className="px-3 flex items-center gap-4 h-[28px]"
                onClick={() => disconnect()}
              >
                <FiLogOut size="20" className="text-muted-foreground" />
                <span className="text-sm font-medium">Logout</span>
              </div>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  };
  
  export default UserMenuDropdown;