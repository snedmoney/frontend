import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { useAccount, useDisconnect } from "wagmi";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { IoWalletOutline, IoShareSocialOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHistory } from "react-icons/md";
import { Button, Divider } from "@nextui-org/react";

import UserMenuDropdown from "./user-menu-dropdown";
import CreatePage from "./create-page";

import useShareModal from "@/hooks/use-share-modal";
import useTheme from "@/hooks/use-theme";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const { isDisconnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { isDark } = useTheme();
  const openShareModal = useShareModal();

  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            {!isDark ? <Logo /> : <Logo />}
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <CreatePage />
        <Button
          color="default"
          endContent={<IoShareSocialOutline />}
          variant="ghost"
          onPress={openShareModal}
        >
          Share
        </Button>
        <UserMenuDropdown />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem
          className="flex items-center gap-4"
          onClick={isDisconnected ? openConnectModal : undefined}
        >
          {isDisconnected ? (
            <>
              <AiOutlineLogin className="fill-foreground" size="18" />
              <p className="font-bold text-foreground">Login</p>
            </>
          ) : (
            <>
              <IoWalletOutline className="fill-foreground" size="26" />
              <span className="truncate">{address}</span>
            </>
          )}
        </NavbarMenuItem>
        <NavbarMenuItem className="flex items-center">
          <Link isExternal className="items-center gap-4" href="/" size="lg">
            {/* <LuWand size='18' className='fill-primary' /> */}
            🪄
            <span>Create your own page</span>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="flex items-center">
          <Link
            isExternal
            className="items-center gap-4"
            color="foreground"
            href="/"
            size="lg"
          >
            <RxDashboard className="fill-foreground" size="18" />
            <span>Dashboard</span>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="flex items-center">
          <Link
            isExternal
            className="items-center gap-4"
            color="foreground"
            href="/"
            size="lg"
          >
            <MdOutlineHistory className="fill-foreground" size="18" />
            <span>Transaction history</span>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="flex items-center" onClick={openShareModal}>
          <div className="flex items-center gap-4">
            <IoShareSocialOutline className="fill-foreground" size="18" />
            <span>Share this page</span>
          </div>
        </NavbarMenuItem>
        <Divider className="w-full h-0.5" />
        <NavbarMenuItem
          className={`flex items-center gap-4 ${isDisconnected ? "hidden" : ""}`}
          onClick={() => disconnect()}
        >
          <>
            <AiOutlineLogout className="fill-danger" size="18" />
            <span className="font-bold text-danger">Logout</span>
          </>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
