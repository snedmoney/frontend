import { createPublicClient, http, PublicClientConfig, Transport } from "viem";
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

const config = {
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
};

const clientCache: {
  [chainId: number]: ReturnType<typeof createPublicClient>;
} = {};

const getPublicClient = (chainId: number) => {
  if (clientCache[chainId]) {
    return clientCache[chainId];
  }

  const chainConfigId: PublicClientConfig["chain"] = config.chains.find(
    (chain) => chain.id === chainId,
  );

  if (!chainConfigId) throw new Error("Chain not supported");

  const transport: PublicClientConfig["transport"] =
    config.transports[chainId as keyof Transport];
  const publicClient = createPublicClient({
    chain: chainConfigId,
    transport,
    batch: {
      multicall: true,
    },
  });

  clientCache[chainId] = publicClient;

  return publicClient;
};

export default getPublicClient;
