import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";

import { type SocialMediaMetaInfoProps } from "./social-selection-widget";

type SocialIconDropdownProps = {
  selectedSocial: SocialMediaMetaInfoProps;
  setSelectedSocial: (social: SocialMediaMetaInfoProps) => void;
  socialMediaMetaInfo: SocialMediaMetaInfoProps[];
};

const SocialIconDropdown = ({
  selectedSocial,
  setSelectedSocial,
  socialMediaMetaInfo,
}: SocialIconDropdownProps) => {
  return (
    <Dropdown classNames={{ content: "min-w-0" }}>
      <DropdownTrigger>
        <button className="flex items-center gap-1">
          {selectedSocial.icon} <FaChevronDown size="8" />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Social icon selection"
        selectedKeys={selectedSocial.name}
        onAction={(key) => {
          const selected = socialMediaMetaInfo.find(
            (info) => info.name === key,
          );

          setSelectedSocial(selected!);
        }}
      >
        {socialMediaMetaInfo.map((info) => (
          <DropdownItem key={info.name} className="pb-2" textValue={info.label}>
            {info.icon}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SocialIconDropdown;
