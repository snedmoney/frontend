import {
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

import { Button } from "@nextui-org/button";
import CreatePage from "../create-page";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "@nextui-org/link";
import { ThemeSwitch } from "@/components/theme-switch";
import UserMenuDropdown from "@/components/navBar/user-menu-dropdown";
import { apiClient } from "@/config/api";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import useShareModal from "@/hooks/use-share-modal";
import useTheme from "@/hooks/use-theme";

//TODO: conditionally render create your own page and share button. Render create your own page if not page owner. Render share button if page owner.
const logoURLWhite = new URL(
    "../../assets/logos/sample-logo1.png",
    import.meta.url
).href;
const logoURLBlack = new URL(
    "../../assets/logos/sample-logo2.png",
    import.meta.url
).href;

type NavbarProps = {
    isSidebarOpen?: boolean;
    setIsSidebarOpen?: (open: boolean) => void;
};

export const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
    // const token = localStorage.getItem("token");
    const { isConnected, isDisconnected, address } = useAccount();
    // const { signMessage, isSuccess, data } = useSignMessage();
    const { openConnectModal } = useConnectModal();
    const { disconnect } = useDisconnect();
    const { isDark } = useTheme();
    const openShareModal = useShareModal();
    const onUserMenuClick = () => setIsSidebarOpen?.(!isSidebarOpen);
    // useEffect(() => {
    //   if (!token && isConnected) {
    //     signMessage({ message: "hello world" });
    //   }
    // }, [isConnected]);

    // useEffect(() => {
    //   if (isDisconnected) {
    //     localStorage.removeItem("token");
    //   }
    // }, [isDisconnected]);

    // useEffect(() => {
    //   async function process() {
    //     if (isSuccess && data) {
    //       apiClient.post("/authorize", { signature: data }).then((response) => {
    //         if (response.data.token) {
    //           localStorage.setItem("token", response.data.token);
    //         }
    //       });
    //     }
    //   }
    //   process();
    // }, [isSuccess, data]);

    return (
        <NextUINavbar
            maxWidth="2xl"
            position="sticky"
            className="md:border-b-1 border-b-default-200 bg-background"
            classNames={{ base: "px-4 md:px-8", wrapper: "px-0" }}
        >
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link
                        className="flex justify-start items-center gap-1 pb-0"
                        color="foreground"
                        href="/"
                    >
                        {!isDark ? (
                            <img
                                src={logoURLWhite}
                                height="38px"
                                width="38px"
                            />
                        ) : (
                            <img
                                src={logoURLBlack}
                                height="38px"
                                width="38px"
                            />
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
                <CreatePage href="/create/profile" />
                <Button
                    color="default"
                    onPress={openShareModal}
                    variant="ghost"
                    endContent={<IoShareSocialOutline />}
                >
                    Share
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
