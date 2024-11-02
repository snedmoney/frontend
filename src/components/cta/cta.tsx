import { FiSend, FiHeart, FiShield } from "react-icons/fi";

import { CTAItem } from "./cta-item";

export const CTA = () => {
  return (
    <section className="py-12 bg-default-100 mt-12">
      <div className="container">
        <h2 className="mb-12">
          Your easy, powerful, and trusted home for help
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <CTAItem
            description="Donate quickly and easily."
            icon={<FiSend size={32} />}
            title="Easy"
          />
          <CTAItem
            description="Send help right to the people and causes you care about."
            icon={<FiHeart size={32} />}
            title="Powerful"
          />
          <CTAItem
            description={
              <>
                Your donation is protected by the{" "}
                <span className="underline">GoFundMe Giving Guarantee</span>.
              </>
            }
            icon={<FiShield size={32} />}
            title="Trusted"
          />
        </div>
      </div>
    </section>
  );
};
