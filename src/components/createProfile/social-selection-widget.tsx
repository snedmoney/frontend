import { Input, Tooltip, Divider } from "@nextui-org/react";
import { ReactNode, useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LuBadgeInfo } from "react-icons/lu";
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { useEffect } from "react";
import SocialIconDropdown from "./social-icon-dropdown";
import Youtube from "@/assets/social-icons/youtube.svg";
import Instagram from "@/assets/social-icons/instagram.svg";
import Facebook from "@/assets/social-icons/facebook.svg";
import Twitch from "@/assets/social-icons/twitch.svg";
import Tiktok from "@/assets/social-icons/tiktok.svg";
import Discord from "@/assets/social-icons/discord.svg";
import Twitter from "@/assets/social-icons/twitter.svg";
import { CreateProfileFlowData } from "@/providers/createProfileFlow/createProfileFlowContext";

export type SocialMediaMetaInfoProps = {
  name: keyof CreateProfileFlowData["socialAccounts"];
  label: string;
  icon: ReactNode;
  urlPattern: RegExp;
};

const socialMediaMetaInfo: SocialMediaMetaInfoProps[] = [
  {
    name: "youtube",
    label: "YouTube",
    icon: <Youtube height="22" width="22" />,
    urlPattern: /^(https:\/\/)(www\.)?youtube\.com\/@[\w-]+$/,
  },
  {
    name: "instagram",
    label: "Instagram",
    icon: <Instagram height="20" width="20" />,
    urlPattern: /^(https:\/\/)(www\.)?instagram\.com\/[\w.]+$/,
  },
  {
    name: "facebook",
    label: "Facebook",
    icon: <Facebook height="20" width="20" />,
    urlPattern: /^(https:\/\/)(www\.)?facebook\.com\/[\w.]+$/,
  },
  {
    name: "twitch",
    label: "Twitch",
    icon: <Twitch height="20" width="20" />,
    urlPattern: /^(https:\/\/)(www\.)?twitch\.tv\/[\w]+$/,
  },
  {
    name: "tiktok",
    label: "TikTok",
    icon: <Tiktok height="20" width="20" />,
    urlPattern: /^(https:\/\/)(www\.)?tiktok\.com\/@[\w.]+$/,
  },
  {
    name: "discord",
    label: "Discord",
    icon: <Discord height="20" width="20" />,
    urlPattern: /^https:\/\/.*discord/i,
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: <Twitter height="20" width="20" />,
    urlPattern: /^(https:\/\/)(www\.)?(twitter\.com|x\.com)\/[\w]+$/,
  },
  {
    name: "link1",
    label: "Link1",
    icon: <FaLink size="18" />,
    urlPattern: /^(https:\/\/)[\w-]+(\.[\w-]+)+[/#?]?.*$/,
  },
  {
    name: "link2",
    label: "Link2",
    icon: <FaLink className="fill-foreground/60" size="18" />,
    urlPattern: /^(https:\/\/)[\w-]+(\.[\w-]+)+[/#?]?.*$/,
  },
];

const SocialSelectionWidget = () => {
  const { control, setValue, getValues, trigger } =
    useFormContext<CreateProfileFlowData>();
  const [selectedSocial, setSelectedSocial] =
    useState<SocialMediaMetaInfoProps>(socialMediaMetaInfo[0]);
  const [addedSocials, setAddedSocials] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socialAccounts = getValues("socialAccounts");
    const initialAddedSocials = Object.entries(socialAccounts)
      .filter(([_, value]) => value !== "")
      .map(([key]) => key);

    setAddedSocials(initialAddedSocials);
  }, [getValues]);

  const validateUrl = useCallback(
    (value: string, platform: SocialMediaMetaInfoProps) => {
      if (!value) return true; // Allow empty values, remove if you want it to be required

      return (
        platform.urlPattern.test(value) ||
        `Invalid ${platform.label} URL format`
      );
    },
    [],
  );

  const availableSocials = socialMediaMetaInfo.filter(
    (social) => !addedSocials.includes(social.name),
  );

  useEffect(() => {
    if (
      availableSocials.length > 0 &&
      !availableSocials.some((s) => s.name === selectedSocial.name)
    ) {
      setSelectedSocial(availableSocials[0]);
    }
  }, [addedSocials, selectedSocial]);

  const addSocialInput = async () => {
    if (!inputValue) return;

    const isValid = await trigger(`socialAccounts.${selectedSocial.name}`);

    if (isValid && !addedSocials.includes(selectedSocial.name)) {
      setValue(`socialAccounts.${selectedSocial.name}`, inputValue, {
        shouldValidate: true,
      });

      setAddedSocials((prev) => [...prev, selectedSocial.name]);

      setInputValue("");
      if (availableSocials.length > 1) {
        const nextAvailable = availableSocials.find(
          (social) => social.name !== selectedSocial.name,
        );

        if (nextAvailable) {
          setSelectedSocial(nextAvailable);
        }
      }
    }
  };

  const removeSocialInput = (social: string) => {
    setAddedSocials((prev) => prev.filter((item) => item !== social));
    setValue(
      `socialAccounts.${social as keyof CreateProfileFlowData["socialAccounts"]}`,
      "",
      { shouldValidate: true },
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-small">Social Profiles</p>
        <Tooltip
          showArrow
          closeDelay={1000}
          color="secondary"
          content="Use the link icon to add other platforms."
        >
          <button type="button">
            <LuBadgeInfo size={12} />
          </button>
        </Tooltip>
      </div>
      <div className="mb-4 last:mb-0">
        <Controller
          control={control}
          name={`socialAccounts.${selectedSocial.name}`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              classNames={{ clearButton: "p-0 pr-2" }}
              description="Socials are displayed on your profile page"
              disabled={!availableSocials.length}
              endContent={
                !availableSocials.length ? (
                  <>🙈</>
                ) : (
                  <button
                    className="p-0 flex"
                    disabled={!inputValue}
                    type="button"
                    onClick={addSocialInput}
                  >
                    <MdOutlineAddCircle size={20} />
                  </button>
                )
              }
              errorMessage={error?.message}
              isInvalid={!!error}
              placeholder={
                !availableSocials.length
                  ? "Well done! We'll share them on your new page!"
                  : `Enter your ${selectedSocial.label} URL`
              }
              radius="sm"
              startContent={
                !availableSocials.length ? (
                  <>🥳</>
                ) : (
                  <SocialIconDropdown
                    selectedSocial={selectedSocial}
                    setSelectedSocial={(social) => {
                      setSelectedSocial(social);
                      setInputValue("");
                    }}
                    socialMediaMetaInfo={availableSocials}
                  />
                )
              }
              validationBehavior="aria"
              value={inputValue}
              variant="bordered"
              onChange={(e) => {
                setInputValue(e.target.value);
                field.onChange(e.target.value);
              }}
            />
          )}
          rules={{
            validate: (value) => validateUrl(value!, selectedSocial),
          }}
        />
      </div>
      {addedSocials.map((social) => (
        <div key={social} className="mb-4 last:mb-0">
          <Controller
            control={control}
            name={`socialAccounts.${social as keyof CreateProfileFlowData["socialAccounts"]}`}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                classNames={{ clearButton: "p-0" }}
                endContent={
                  <>
                    <Divider
                      className="bg-default-200 pr-0.5"
                      orientation="vertical"
                    />
                    <button
                      className="flex p-0 pl-3"
                      type="button"
                      onClick={() => removeSocialInput(social)}
                    >
                      <MdOutlineRemoveCircle
                        className="text-danger"
                        size={20}
                      />
                    </button>
                  </>
                }
                errorMessage={error?.message}
                isInvalid={!!error}
                labelPlacement="outside"
                placeholder={`Enter your ${social} URL`}
                radius="sm"
                startContent={
                  <>
                    {
                      socialMediaMetaInfo.find((info) => info.name === social)
                        ?.icon
                    }
                    <div className="pl-3" />
                    <Divider
                      className="bg-default-200 pl-0.5"
                      orientation="vertical"
                    />
                  </>
                }
                variant="bordered"
              />
            )}
            rules={{
              validate: (value) =>
                validateUrl(
                  value!,
                  socialMediaMetaInfo.find((info) => info.name === social)!,
                ),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SocialSelectionWidget;