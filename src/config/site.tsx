import { ReactNode } from 'react';
import { LuHeartHandshake } from "react-icons/lu";
import { TbInfoHexagon, TbSettings } from "react-icons/tb";
import { MdScreenshotMonitor, MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineBarChart } from "react-icons/ai";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useShareModal from '@/hooks/use-share-modal';
import { LiaUserPlusSolid } from "react-icons/lia";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BsPersonGear, BsPersonLock } from "react-icons/bs";
import { TbEyeCode } from "react-icons/tb";

export type SiteConfig = {
  icon: ReactNode;
  label: string;
  path?: string;
  action?: () => void;
  hasExternalLink?: boolean;
  newTab?: boolean;
  soon?: boolean;
}

export const siteConfig = {
  dashboard_nav_items: {
    main: [
      { icon: <AiOutlineBarChart size='20' />, label: "Dashboard", path: "user/dashboard" },
      { icon: <MdOutlineHistory size='20' />, label: 'Transaction history', path: 'user/history' },
      { icon: <TbEyeCode size='20' />, label: "View your page", path: "/profile/asdf", hasExternalLink: true },
    ],
    monetize: [
      { icon: <MdScreenshotMonitor size='20' />, label: 'Create your page', path: '/create/profile' },
      { icon: <FaHandHoldingHeart size='20' />, label: "Fundraise", path: "user/fundraise" },
      { icon: <BsPersonLock size='20' />, label: "Memberships", path: "user/memberships", soon: true },
      { icon: <MdOutlineShoppingCart size='20' />, label: "Shop", path: "user/shop", soon: true },
    ],
    settings: [
      // { icon: <TbSettings size='20' />, label: "Settings", path: "user/settings" },
      { icon: <BsPersonGear size='20' />, label: 'Manage page', path: 'user/profile' },
    ],
    more: [
      { icon: <LuHeartHandshake size='20' />, label: 'Need help?', path: '/', hasExternalLink: true },
    ],
  },
};

export type DropdownItemProps = {
  label: string;
  action?: () => void;
  href?: string;
  icon: ReactNode;
  color?: string;
  newTab?: boolean;
}

const dropdownIconClassName = "w-5 h-5 text-muted-foreground";

export const loggedOutItems: () => DropdownItemProps[] = () => {
  const { openConnectModal } = useConnectModal();
  const openShareModal = useShareModal();
  return (
    [
      { label: 'Join for free', icon: <LiaUserPlusSolid className={dropdownIconClassName} />, action: () => openConnectModal?.() },
      { label: 'Create your page', icon: <MdScreenshotMonitor className={dropdownIconClassName} />, href: '/create/profile', newTab: false }, //TODO: Dynamically change
      { label: 'Share this page', icon: <IoShareSocialOutline className={dropdownIconClassName} />, action: () => openShareModal() },
      { label: 'About', icon: <TbInfoHexagon className={dropdownIconClassName} />, href: '/about', newTab: false },
      { label: 'Need help?', icon: <LuHeartHandshake className={dropdownIconClassName} />, href: '', newTab: true }, //TODO: need discord link
    ]);
};

export const loggedInItems: () => DropdownItemProps[] = () => {
  const openShareModal = useShareModal();
  return ([
    { label: 'Dashboard', icon: <AiOutlineBarChart className={dropdownIconClassName} />, href: 'user/dashboard', newTab: false },
    { label: 'Manage your page', icon: <BsPersonGear className={dropdownIconClassName} />, href: 'user/profile', newTab: false },
    { label: 'Create your page', icon: <MdScreenshotMonitor className={dropdownIconClassName} />, href: '/create/profile', newTab: false },
    { label: 'View your page', icon: <TbEyeCode className={dropdownIconClassName} />, href: '/', newTab: false }, //TODO: Dynamically change
    { label: 'Share this page', icon: <IoShareSocialOutline className={dropdownIconClassName} />, action: () => openShareModal() },
    // { label: 'Settings', icon: <TbSettings className={dropdownIconClassName} />, href: '/settings' },
    { label: 'Transaction history', icon: <MdOutlineHistory className={dropdownIconClassName} />, href: 'user/history', newTab: false },
    { label: 'Need help?', icon: <LuHeartHandshake className={dropdownIconClassName} />, href: '', newTab: true }, //TODO: need discord link
  ]);
};