import {
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/react";
import { useState } from "react";
import { SiCashapp } from "react-icons/si";

import { ThemeSwitch } from "../theme-switch";

import useTheme from "@/hooks/use-theme";

//TODO: conditionally render create your own page and share button. Render create your own page if not page owner. Render share button if page owner.
const logoURLWhite = new URL(
  "../../assets/logos/sample-logo1.png",
  import.meta.url,
).href;
const logoURLBlack = new URL(
  "../../assets/logos/sample-logo2.png",
  import.meta.url,
).href;

const NavbarLandingPage = () => {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <NextUINavbar
      className="bg-transparent z-50"
      classNames={{ base: "px-4 md:px-8", wrapper: "px-0" }}
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 pb-0"
            color="foreground"
            href="/"
          >
            {!isDark ? (
              <img alt="logo" height="38px" src={logoURLWhite} width="38px" />
            ) : (
              <img alt="logo" height="38px" src={logoURLBlack} width="38px" />
            )}
            <p className="font-bold text-foreground/80 pl-1 text-xl hidden md:block">
              Sned
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <Link
            className="font-bold"
            color="foreground"
            href="#challenges"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("challenges");
            }}
          >
            Challenges
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="font-bold"
            color="foreground"
            href="#features-and-benefits"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
          >
            Features & Benefits
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="font-bold"
            color="foreground"
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("faq");
            }}
          >
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <Button
          as={Link}
          color="primary"
          href="create/profile"
          target="_blank"
          variant="solid"
        >
          <SiCashapp />
          Start Earning
        </Button>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="font-bold"
            color="foreground"
            href="#challenges"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("challenges");
            }}
          >
            Challenges
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="font-bold"
            color="foreground"
            href="#features-and-benefits"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
          >
            Features & Benefits
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="font-bold"
            color="foreground"
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("faq");
            }}
          >
            FAQ
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default NavbarLandingPage;
