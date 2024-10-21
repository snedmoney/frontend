import { RiInstagramFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import Youtube from "@/assets/social-icons/youtube.svg";
import Facebook from "@/assets/social-icons/facebook.svg";
import Twitch from "@/assets/social-icons/twitch.svg";
import Tiktok from "@/assets/social-icons/tiktok.svg";
import Discord from "@/assets/social-icons/discord.svg";
import Twitter from "@/assets/social-icons/twitter.svg";

type SocialAccounts = {
  [key: string]: string;
};

const socialMediaIcons: {
  [key: string]: (props: React.ComponentProps<"svg">) => JSX.Element;
} = {
  youtube: (props) => <Youtube {...props} />,
  instagram: (props) => <RiInstagramFill {...props} size="22" />,
  facebook: (props) => <Facebook {...props} />,
  twitch: (props) => <Twitch {...props} />,
  tiktok: (props) => <Tiktok {...props} />,
  discord: (props) => <Discord {...props} />,
  twitter: (props) => <Twitter {...props} />,
  link1: (props) => <FaLink {...props} size="18" />,
  link2: (props) => <FaLink {...props} color="#A1A1A1" size="18" />,
};

const socialAccounts = {
  youtube: "https://youtube.com/@asdf",
  instagram: "https://youtube.com/@asdf",
  facebook: "https://youtube.com/@asdf",
  twitch: "https://youtube.com/@asdf",
  tiktok: "https://youtube.com/@asdf",
  discord: "https://youtube.com/@asdf",
  twitter: "https://youtube.com/@asdf",
  link1: "https://youtube.com/@asdf",
  link2: "https://youtube.com/@asdf",
};

const renderSocialIcons = (socialAccounts: SocialAccounts) => {
  return Object.entries(socialAccounts)
    .map(([name, url]) => {
      if (!url) return null;

      const IconComponent = socialMediaIcons[name];

      return (
        <Button
          key={name}
          isIconOnly
          as={Link}
          href={url}
          radius="full"
          rel="noopener noreferrer"
          target="_blank"
          variant="light"
        >
          <IconComponent className="w-[20px] h-[20px]" height="20" width="20" />
        </Button>
      );
    })
    .filter(Boolean);
};

const SocialMediaList = () => {
  return (
    <div className="flex justify-center flex-wrap">
      {renderSocialIcons(socialAccounts)}
    </div>
  );
};

export default SocialMediaList;
