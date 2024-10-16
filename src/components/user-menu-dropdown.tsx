import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
  Avatar,
} from "@nextui-org/react";
import { MdOutlineHistory } from "react-icons/md";
import { IoWalletOutline, IoCamera } from "react-icons/io5";
import { AiOutlineLogin, AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { RxDashboard } from "react-icons/rx";

export default function UserMenuDropdown() {
  const { address, isDisconnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const dropdownItemClassName =
    "flex items-center space-x-2 data-[hover=true]:bg-default-100 hover:text-accent-foreground rounded-md p-2 transition-colors";

  return (
    <>
      <Dropdown className="flex border-1 border-foreground/20 p-0 max-w-[325px]">
        <DropdownTrigger>
          <Button
            aria-label={`${isDisconnected ? "login" : "user setting"}`}
            className={`${isDisconnected ? "" : "px-0"}`}
            size="md"
            variant="ghost"
            onClick={isDisconnected ? openConnectModal : undefined}
          >
            {isDisconnected ? (
              <>
                <AiOutlineLogin size="24" />
                <p className="font-bold">Login</p>
              </>
            ) : (
              <>
                <Avatar
                  showFallback
                  className="bg-transparent"
                  fallback={<IoCamera className="" size={24} />}
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
                <AiOutlineMenu size="24" />
                <span className="sr-only">Toggle navigation menu</span>
              </>
            )}
          </Button>
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
              className="data-[hover=true]:bg-transparent py-2"
              textValue="wallet address"
            >
              <div className="px-3 flex items-center gap-4">
                <IoWalletOutline className="text-muted-foreground" size="32" />
                <span className="text-sm font-medium truncate">{address}</span>
              </div>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem className={dropdownItemClassName} textValue="dashboard">
            <div className="px-3 flex items-center gap-4">
              <RxDashboard className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
          </DropdownItem>
          <DropdownItem className={dropdownItemClassName} textValue="profile">
            <div className="px-3">
              <span className="text-sm font-medium">Profile</span>
            </div>
          </DropdownItem>
          <DropdownItem
            className={dropdownItemClassName}
            textValue="transaction history"
          >
            <div className="px-3 flex items-center gap-4">
              <MdOutlineHistory className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Transaction history</span>
            </div>
          </DropdownItem>
          <DropdownItem className={dropdownItemClassName} textValue="chat">
            <div className="px-3">
              <span className="text-sm font-medium">v0.dev/chat</span>
            </div>
          </DropdownItem>
          <DropdownItem className={dropdownItemClassName} textValue="FAQs">
            <div className="px-3">
              <span className="text-sm font-medium">FAQs</span>
            </div>
          </DropdownItem>
          <DropdownItem className={dropdownItemClassName} textValue="billing">
            <div className="px-3">
              <span className="text-sm font-medium">Billing</span>
            </div>
          </DropdownItem>
          <DropdownSection
            className={`${isDisconnected ? "mb-0" : ""}`}
            classNames={{ base: "mb-0", divider: "mt-0" }}
            showDivider={!isDisconnected}
          >
            <DropdownItem className={dropdownItemClassName} textValue="pricing">
              <div className="px-3">
                <span className="text-sm font-medium">Pricing</span>
              </div>
            </DropdownItem>
            <DropdownItem className={dropdownItemClassName} textValue="discord">
              <div className="px-3">
                <span className="text-sm font-medium">Discord</span>
              </div>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            className={`flex items-center space-x-2 data-[hover=true]:bg-danger-400 hover:text-accent-foreground rounded-md p-2 my-2 transition-colors ${isDisconnected ? "hidden" : ""}`}
            textValue="logout"
          >
            <div
              className="px-3 flex items-center gap-4"
              onClick={() => disconnect()}
            >
              <AiOutlineLogout className="text-muted-foreground" size="20" />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
