import React from "react";
import {
  IoWalletOutline,
  IoStorefrontOutline,
  IoGlobeOutline,
  IoStatsChartOutline,
} from "react-icons/io5";

import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid";
import useTheme from "@/hooks/use-theme";

const profileImg = new URL(
  "../../assets/landing-page/profile.png",
  import.meta.url,
).href;
const dashboardImg = new URL(
  "../../assets/landing-page/dashboard.png",
  import.meta.url,
).href;
const historyImg = new URL(
  "../../assets/landing-page/transaction-history.png",
  import.meta.url,
).href;
const fundraiseImg = new URL(
  "../../assets/landing-page/fundraise.png",
  import.meta.url,
).href;
const multichainImg = new URL(
  "../../assets/landing-page/multichain.png",
  import.meta.url,
).href;
const profileImgDark = new URL(
  "../../assets/landing-page/profile-dark.png",
  import.meta.url,
).href;
const dashboardImgDark = new URL(
  "../../assets/landing-page/dashboard-dark.png",
  import.meta.url,
).href;
const historyImgDark = new URL(
  "../../assets/landing-page/transaction-history-dark.png",
  import.meta.url,
).href;
const fundraiseImgDark = new URL(
  "../../assets/landing-page/fundraise-dark.png",
  import.meta.url,
).href;
const multichainImgDark = new URL(
  "../../assets/landing-page/multichain-dark.png",
  import.meta.url,
).href;

const BenefitsSection = () => {
  const { isDark } = useTheme();
  const benefits = [
    {
      title: "Easy Tipping and Donations",
      description:
        "Enable your audience to support you directly with just a few clicks, fostering stronger creator-fan relationships.",
      image: `${isDark ? profileImgDark : profileImg}`,
      icon: <IoWalletOutline className="h-6 w-6 text-primary" />,
      className: "md:col-span-3",
    },
    {
      title: "Fundraise",
      description:
        "Sell your products or services effortlessly with our user-friendly e-commerce tools, designed specifically for creators.",
      image: `${isDark ? fundraiseImgDark : fundraiseImg}`,
      icon: <IoStorefrontOutline className="h-6 w-6 text-primary" />,
      className: "md:col-span-2",
    },
    {
      title: "Multi-chain Support",
      description:
        "Accept payments in various cryptocurrencies across multiple blockchain networks, expanding your potential audience.",
      image: `${isDark ? multichainImgDark : multichainImg}`,
      icon: <IoGlobeOutline className="h-6 w-6 text-primary" />,
      className: "md:col-span-1",
    },
    {
      title: "Simplified E-commerce",
      description:
        "Sell your products or services effortlessly with our user-friendly e-commerce tools, designed specifically for creators.",
      image: `${isDark ? dashboardImgDark : dashboardImg}`,
      icon: <IoStorefrontOutline className="h-6 w-6 text-primary" />,
      className: "md:col-span-1",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Gain valuable insights into your earnings and audience engagement with our comprehensive analytics tools.",
      image: `${isDark ? dashboardImgDark : dashboardImg}`,
      icon: <IoStatsChartOutline className="h-6 w-6 text-primary" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <section className="py-16 px-4 bg-default-200" id="features">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-primary font-bold mb-2">SOLUTIONS</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Packed with creator-centric features
        </h1>
        <p className="text-center text-foreground-600 mb-16 max-w-2xl mx-auto">
          From easy tipping to multi-chain support, our platform offers
          everything you need to monetize your content effectively.
        </p>
        <BentoGrid className="mx-auto md:auto-rows-[35rem]">
          {benefits.map((benefit, i) => (
            <BentoGridItem
              key={i}
              className={benefit.className}
              description={benefit.description}
              header={
                <div className="group relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-transparent transition-all duration-300 ease-in-out group-hover:bg-default-200 group-hover:translate-x-2" />
                  <img
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                    src={benefit.image}
                  />
                </div>
              }
              icon={benefit.icon}
              title={benefit.title}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default BenefitsSection;
