import { Button } from '@nextui-org/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useDisconnect } from 'wagmi';

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        const [isHovered, setIsHovered] = useState(false);
        const { disconnect } = useDisconnect();

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {!connected ?
              <Button
                onClick={openConnectModal}
                variant='light'
                data-hover="false"
                className='text-foreground-500 font-bold px-1 py-0 gap-1 bg-default-500/10'
                size='sm'
              >
                Connect
              </Button>
              :
              <Button
                onClick={() => disconnect()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variant='light'
                data-hover="false"
                className='text-foreground-500 font-bold px-1 py-0 gap-1 bg-default-500/10'
                size='sm'
              >
                {isHovered ? 'Disconnect' : account?.displayName.slice(0, 7)}
                {!isHovered && <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>}
              </Button>
            }
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;