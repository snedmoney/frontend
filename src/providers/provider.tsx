import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  bsc,
  optimism,
  polygon,
  optimismSepolia,
  arbitrumSepolia,
  baseSepolia,
  bscTestnet,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import useTheme from "@/hooks/use-theme";

export const config = getDefaultConfig({
  appName: "Sned Dashboard",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    mainnet,
    arbitrum,
    avalanche,
    base,
    bsc,
    optimism,
    polygon,
    optimismSepolia,
    arbitrumSepolia,
    baseSepolia,
    bscTestnet,
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [avalanche.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),

    //testnets
    [optimismSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [bscTestnet.id]: http(),
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
          <RainbowKitProvider
            theme={theme === "light" ? lightTheme() : darkTheme()}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
