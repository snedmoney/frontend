import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { IoShareSocialOutline } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import { useAccount } from "wagmi";
import { useMemo } from "react";

import CreatePage from "../create-page";

import { ThemeSwitch } from "@/components/theme-switch";
import UserMenuDropdown from "@/components/navBar/user-menu-dropdown";
import useTheme from "@/hooks/use-theme";
import useShareModal from "@/hooks/use-share-modal";
import useGetProfileLinks from "@/hooks/use-get-profile-links";

//TODO: conditionally render create your own page and share button. Render create your own page if not page owner. Render share button if page owner.
const logoURLWhite = new URL(
  "../../assets/logos/sample-logo1.png",
  import.meta.url,
).href;
const logoURLBlack = new URL(
  "../../assets/logos/sample-logo2.png",
  import.meta.url,
).href;

type NavbarProps = {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (open: boolean) => void;
};

export const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const openShareModal = useShareModal();
  const { isDark } = useTheme();
  const onUserMenuClick = () => setIsSidebarOpen?.(!isSidebarOpen);
  const { address, isDisconnected } = useAccount();
  const { data: links } = useGetProfileLinks(address);

  const hasProfileLink = useMemo(() => {
    if (!links) return false;

    return links.find((link) => link.type === "profile");
  }, [links]);

  return (
    <NextUINavbar
      className="md:border-b-1 border-b-default-200 bg-background"
      classNames={{ base: "px-4 md:px-8", wrapper: "px-0" }}
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 pb-0"
            color="foreground"
            href="/"
          >
            {!isDark ? (
              <img alt="logo" height="38px" src={logoURLWhite} width="38px" />
            ) : (
              <img alt="logo" height="38px" src={logoURLBlack} width="38px" />
            )}
            <p className="font-bold text-foreground/80 pl-1 text-xl hidden md:block">
              Sned
            </p>
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
        {(!hasProfileLink || isDisconnected) && (
          <CreatePage href="/create/profile" />
        )}
        <Button
          color="default"
          endContent={<IoShareSocialOutline />}
          variant="ghost"
          onPress={openShareModal}
        >
          Share this page
        </Button>
        <UserMenuDropdown onUserMenuClick={onUserMenuClick} />
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <UserMenuDropdown onUserMenuClick={onUserMenuClick} />
      </NavbarContent>
    </NextUINavbar>
  );
};
