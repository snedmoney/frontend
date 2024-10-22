import { useState } from "react";
import { useDisconnect } from "wagmi";
import { Button } from "@nextui-org/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CustomConnectButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!ready) {
          return (
            <div
              aria-hidden="true"
              style={{
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          );
        }

        if (!connected) {
          return (
            <Button
              className="text-foreground-500 font-bold px-1 py-0 gap-1 bg-default-500/10"
              data-hover="false"
              size="sm"
              variant="ghost"
              onClick={openConnectModal}
            >
              Connect
            </Button>
          );
        }

        return (
          <Button
            className="text-foreground-500 font-bold px-1 py-0 gap-1 bg-default-500/10"
            data-hover="false"
            size="sm"
            variant="ghost"
            onClick={() => disconnect()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? "Disconnect" : account.displayName.slice(0, 7)}
            {!isHovered && (
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            )}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
