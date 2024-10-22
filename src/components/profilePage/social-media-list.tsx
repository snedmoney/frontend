import Youtube from "@/assets/social-icons/youtube.svg";
import { RiInstagramFill } from "react-icons/ri";
import Facebook from "@/assets/social-icons/facebook.svg";
import Twitch from "@/assets/social-icons/twitch.svg";
import Tiktok from "@/assets/social-icons/tiktok.svg";
import Discord from "@/assets/social-icons/discord.svg";
import Twitter from "@/assets/social-icons/twitter.svg";
import { FaLink } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

type SocialAccounts = {
  [key: string]: string;
};

const socialMediaIcons: { [key: string]: (props: React.ComponentProps<'svg'>) => JSX.Element } = {
  'youtube': (props) => <Youtube {...props} />,
  'instagram': (props) => <RiInstagramFill {...props} size='30' />,
  'facebook': (props) => <Facebook {...props} />,
  'twitch': (props) => <Twitch {...props} />,
  'tiktok': (props) => <Tiktok {...props} />,
  'discord': (props) => <Discord {...props} />,
  'twitter': (props) => <Twitter {...props} />,
  'link1': (props) => <FaLink {...props} size='26' />,
  'link2': (props) => <FaLink {...props} size='26' className="fill-foreground/60" />
};

const socialAccounts = {
  'youtube': 'https://youtube.com/@asdf',
  'instagram': 'https://youtube.com/@asdf',
  'facebook': 'https://youtube.com/@asdf',
  'twitch': 'https://youtube.com/@asdf',
  'tiktok': 'https://youtube.com/@asdf',
  'discord': 'https://youtube.com/@asdf',
  'twitter': 'https://youtube.com/@asdf',
  'link1': 'https://youtube.com/@asdf',
  'link2': 'https://youtube.com/@asdf',
}

const renderSocialIcons = (socialAccounts: SocialAccounts) => {
  return Object.entries(socialAccounts).map(([name, url]) => {
    if (!url) return null;

    const IconComponent = socialMediaIcons[name];

    return (
      <Button
        as={Link}
        key={name}
        href={url}
        target="_blank"
        variant='light'
        rel="noopener noreferrer"
        radius='full'
        isIconOnly
      >
        <IconComponent className="w-[28px] h-[28px]"  width="28" height="28" />
      </Button>
    );
  }).filter(Boolean);
};

const SocialMediaList = () => {
  return (
    <div className='flex justify-center'>
      <div className="grid grid-cols-5 gap-4 auto-rows-auto">
        {renderSocialIcons(socialAccounts)}
      </div>
    </div>
  )
}

export default SocialMediaList;