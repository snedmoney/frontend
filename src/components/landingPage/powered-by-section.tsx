import useTheme from "@/hooks/use-theme";
import WormHoleDark from "@/assets/landing-page/partner-logos/wormhole-dark.svg";
import WormHoleLight from "@/assets/landing-page/partner-logos/wormhole-light.svg";
import UniswapDark from "@/assets/landing-page/partner-logos/uniswap-dark.svg";
import UniswapLight from "@/assets/landing-page/partner-logos/uniswap-light.svg";
import PancakeSwapDark from "@/assets/landing-page/partner-logos/pancake-dark.svg";
import PancakeSwapLight from "@/assets/landing-page/partner-logos/pancake-light.svg";
import PythDark from "@/assets/landing-page/partner-logos/pyth-dark.svg";

const PoweredBySection = () => {
  const { isDark } = useTheme();

  const partners = [
    { name: "Wormhole", dark: WormHoleDark, light: WormHoleLight },
    { name: "Uniswap", dark: UniswapDark, light: UniswapLight },
    { name: "PancakeSwap", dark: PancakeSwapDark, light: PancakeSwapLight },
    { name: "Pyth", dark: PythDark, light: PythDark },
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Powered By
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner) => (
            <div key={partner.name} className="flex-shrink-0 p-4">
              {isDark ? (
                <partner.dark className="h-8 sm:h-10 md:h-12 w-auto" />
              ) : (
                <partner.light className="h-8 sm:h-10 md:h-12 w-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoweredBySection;
