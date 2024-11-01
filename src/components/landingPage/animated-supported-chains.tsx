import { Tooltip } from "@nextui-org/react";

import { Marquee } from "@/components/magicui/marquee";

const supported_chains = [
  {
    name: "Ethereum",
    chain: "ETH",
    iconURL: "https://app.1inch.io/assets/images/network-logos/ethereum.svg",
  },
  {
    name: "Optimism",
    chain: "ETH",
    iconURL: "https://app.1inch.io/assets/images/network-logos/optimism.svg",
  },
  {
    name: "BNB Smart Chain",
    chain: "BSC",
    iconURL: "https://app.1inch.io/assets/images/network-logos/bsc_2.svg",
  },
  {
    name: "Polygon",
    chain: "Polygon",
    iconURL: "https://app.1inch.io/assets/images/network-logos/polygon_1.svg",
  },
  {
    name: "Base",
    chain: "ETH",
    iconURL: "https://app.1inch.io/assets/images/network-logos/base.svg",
  },
  {
    name: "Arbitrum",
    chain: "ETH",
    iconURL: "https://app.1inch.io/assets/images/network-logos/arbitrum.svg",
  },
  {
    name: "Celo Mainnet",
    chain: "CELO",
    iconURL:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celo/info/logo.png",
  },
  {
    name: "Avalanche C-Chain",
    chain: "AVAX",
    iconURL: "https://app.1inch.io/assets/images/network-logos/avalanche.svg",
  },
];

const AnimatedSupportedChains = () => {
  return (
    <div className="container mx-auto px-0 md:px-8 py-6">
      <h3 className="text-center text-lg font-semibold text-gray-500">
        SUPPORTED CHAINS
      </h3>
      <div className="relative flex w-full flex-col items-center justify-center">
        <Marquee pauseOnHover className="[--duration:10s] mt-4">
          {supported_chains.map((chain, index) => (
            <Tooltip key={index} content={chain.name} radius="sm" size="lg">
              <button>
                <img
                  alt={chain.name}
                  height="32"
                  src={chain.iconURL}
                  width="32"
                />
              </button>
            </Tooltip>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
      </div>
    </div>
  );
};

export default AnimatedSupportedChains;
