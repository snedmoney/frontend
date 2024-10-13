import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { http, WagmiProvider } from 'wagmi';
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  bsc,
  optimism,
  polygon,
  fantom,
  aurora,
  klaytn,
  optimismSepolia,
  arbitrumSepolia,
  auroraTestnet,
  baseSepolia,
  klaytnBaobab,
  bscTestnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import useTheme from "@/hooks/use-theme"

export const config = getDefaultConfig({
  appName: 'Sned Frontend',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, arbitrum, avalanche, aurora, base, bsc, fantom, klaytn, optimism, polygon, optimismSepolia, arbitrumSepolia, klaytnBaobab, auroraTestnet, baseSepolia, bscTestnet],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [avalanche.id]: http(),
    [aurora.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [fantom.id]: http(),
    [klaytn.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),

    //testnets
    [optimismSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [auroraTestnet.id]: http(),
    [baseSepolia.id]: http(),
    [klaytnBaobab.id]: http(),
    [bscTestnet.id]: http()
  },
});

const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <NextUIProvider navigate={navigate}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={theme === 'light' ? lightTheme() : darkTheme()}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
