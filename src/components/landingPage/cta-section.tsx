import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { SiCashapp } from "react-icons/si";

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-primary/10">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wide">
          Ready to boost your earnings?
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
          Unlock Extra Revenue Streams with Sned
        </h2>
        <Button
          as={Link}
          className="px-8 py-6 text-lg font-semibold"
          color="primary"
          href="create/profile"
          size="lg"
          startContent={<SiCashapp className="text-2xl" />}
          target="_blank"
          variant="solid"
        >
          Start Earning
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
