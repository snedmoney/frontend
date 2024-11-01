import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-default-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 w-full md:w-auto text-center md:text-left">
            <h3 className="text-foreground font-semibold mb-2">
              JOIN OUR COMMUNITY
            </h3>
            <p className="text-foreground-600 mb-4">
              Connect with creators, get support, and stay updated.
            </p>
            <Button
              as={Link}
              className="mx-auto md:mx-0"
              color="primary"
              href="https://discord.gg/rKqEUHPR2m"
              startContent={<FaDiscord />}
              target="_blank"
            >
              Join our Discord
            </Button>
          </div>
          <div className="flex space-x-6">
            <Link isExternal href="https://discord.gg/rKqEUHPR2m">
              <FaDiscord className="text-2xl text-foreground hover:text-primary transition-colors" />
            </Link>
            <Link isExternal href="https://x.com/sneddotmoney">
              <FaXTwitter className="text-2xl text-foreground hover:text-primary transition-colors" />
            </Link>
            <Link isExternal href="https://github.com/snedmoney">
              <FaGithub className="text-2xl text-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-foreground-600 text-sm">
            © 2024 - Sned. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
