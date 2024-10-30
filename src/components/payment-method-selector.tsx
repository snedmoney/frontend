import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

import { ChainSelector } from "./chain-selector";

import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";
import useGetChains from "@/hooks/use-get-chains";
import { Token } from "@/providers/paymentWidget/paymentWidgetContext";

const chainsToTokensMapping: Record<number, Token[]> = {
  1: [
    // {
    //   id: 1,
    //   chainId: 1,
    //   chainName: "Ethereum",
    //   symbol: "USDC",
    //   name: "USD Coin",
    //   address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    //   decimals: 6,
    //   logoURI:
    //     "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    // },
    {
      id: 2,
      chainId: 1,
      chainName: "Ethereum",
      symbol: "USDT",
      name: "Tether USD",
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
  ],
  10: [
    // {
    //   id: 1,
    //   chainId: 10,
    //   chainName: "Optimism",
    //   symbol: "USDC",
    //   name: "USD Coin",
    //   address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    //   decimals: 6,
    //   logoURI:
    //     "https://tokens.1inch.io/0x0b2c639c533813f4aa9d7837caf62653d097ff85.png",
    // },
    {
      id: 2,
      chainId: 10,
      chainName: "Optimism",
      symbol: "USDT",
      name: "Tether USD",
      address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0x94b008aa00579c1307b0ef2c499ad98a8ce58e58.png",
    },
  ],
  56: [
    // {
    //   id: 1,
    //   chainId: 56,
    //   chainName: "BNB Smart Chain",
    //   symbol: "USDC",
    //   name: "USD Coin",
    //   address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    //   decimals: 18,
    //   logoURI:
    //     "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    // },
    {
      id: 2,
      chainId: 56,
      chainName: "BNB Smart Chain",
      symbol: "USDT",
      name: "Tether USD",
      address: "0x55d398326f99059ff775485246999027b3197955",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
  ],
  137: [
    {
      id: 1,
      chainName: "Polygon",
      chainId: 137,
      symbol: "USDT",
      name: "Tether USD",
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
    // {
    //   id: 2,
    //   chainName: "Polygon",
    //   chainId: 137,
    //   symbol: "USDC",
    //   name: "USD Coin",
    //   address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    //   decimals: 6,
    //   logoURI:
    //     "https://tokens.1inch.io/0x3c499c542cef5e3811e1192ce70d8cc03d5c3359.png",
    // },
  ],
  8453: [
    // {
    //   id: 1,
    //   name: "USD Coin",
    //   symbol: "USDC",
    //   address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    //   decimals: 6,
    //   logoURI:
    //     "https://assets.coingecko.com/coins/images/6319/small/usdc.png?1696506694",
    //   chainId: 8453,
    //   chainName: "Base",
    // },
    {
      id: 2,
      name: "Tether USD",
      symbol: "USDT",
      address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      chainId: 8453,
      chainName: "Base",
    },
  ],
  42161: [
    {
      id: 1,
      chainId: 42161,
      chainName: "Arbitrum",
      symbol: "USDT",
      name: "Tether USD",
      address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
    // {
    //   id: 2,
    //   chainId: 42161,
    //   chainName: "Arbitrum",
    //   symbol: "USDC",
    //   name: "USD Coin",
    //   address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    //   decimals: 6,
    //   logoURI:
    //     "https://tokens.1inch.io/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
    // },
  ],
  43114: [
    // {
    //   id: 1,
    //   chainName: "Avalanche",
    //   chainId: 43114,
    //   symbol: "USDC",
    //   name: "USD Coin",
    //   address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    //   decimals: 6,
    //   logoURI:
    //     "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    // },
    {
      id: 2,
      chainName: "Avalanche",
      chainId: 43114,
      symbol: "USDT",
      name: "Tether USD",
      address: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7.png",
    },
  ],
  // 42220: [
  //   {
  //     id: 1,
  //     decimals: 6,
  //     address: "0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e",
  //     name: "Tether USD",
  //     symbol: "USD₮",
  //     chainName: "Celo",
  //     chainId: 42220,
  //     logoURI:
  //       "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
  //   },
  // ],
};

//TODO: connect to back end api for tokens and chains
const PaymentMethodSelector = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CreateProfileFlowData>();
  const { data: chainsData, isLoading: isChainsLoading } = useGetChains();
  const values = watch();

  console.log(values);

  const supportedChains =
    chainsData?.chains.filter(
      (chain) =>
        Object.keys(chainsToTokensMapping).includes(chain.id.toString()) &&
        !chain.name.includes("Testnet"),
    ) || [];
  const tokens = chainsToTokensMapping[values?.paymentMethod?.chainId] || [];

  return (
    <div>
      <p
        className={clsx("text-small mb-2", {
          "text-danger": errors.paymentMethod,
        })}
      >
        Choose how you&apos;d like to get paid *
      </p>
      <div className="flex flex-col justify-center w-full gap-2 md:gap-4 md:flex-row md:justify-start">
        <Controller
          control={control}
          name="paymentMethod.chainId"
          render={({ field }) => (
            <ChainSelector
              {...field}
              chains={supportedChains}
              errorMessage={errors.paymentMethod?.chainId?.message}
              isDisabled={isChainsLoading}
              isInvalid={!!errors.paymentMethod?.chainId}
              isLoading={isChainsLoading}
              label="Select chain *"
              placeholder="Select your preferred chain"
              selectedKeys={[field.value]}
              variant="bordered"
              onSelectionChange={(keys) => {
                const selectedValue = keys[0];

                setValue("paymentMethod.chainId", selectedValue);
              }}
            />
          )}
          rules={{ required: "Please select a chain" }}
        />
        <Controller
          control={control}
          name="paymentMethod.tokenAddress"
          render={({ field }) => (
            <Select
              {...field}
              className="w-full"
              errorMessage={errors.paymentMethod?.tokenAddress?.message}
              isDisabled={tokens.length === 0 || isChainsLoading}
              isInvalid={!!errors.paymentMethod?.tokenAddress}
              label="Select coin *"
              placeholder="Select your preferred coin"
              selectedKeys={[field.value]}
              value={field.value}
              variant="bordered"
              onSelectionChange={(keys) => {
                const selectedValue = keys[0];

                setValue("paymentMethod.tokenAddress", selectedValue);
              }}
            >
              {tokens?.map((token) => (
                <SelectItem key={token.address} textValue={token.name}>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" src={token.logoURI} />
                    <span>{token.name}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>
          )}
          rules={{ required: "Please select a coin" }}
        />
      </div>
    </div>
  );
};

export default PaymentMethodSelector;