import { Tab, Tabs } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";

import About from "@/components/profilePage/about";
import Home from "@/components/profilePage/home";
import ProfileHeader from "@/components/profilePage/profile-header";
import { RiShareBoxLine } from "react-icons/ri";
import UnderConstruction from "@/components/under-construction";
import useGetProfileByUsername from "@/hooks/use-get-profile-by-username";
import { useEffect } from "react";
import LoadingPage from "./loading-page";
import { SnedBirdIcon } from "@/components/sned-bird-icon";
import { useAccount } from "wagmi";

//TODO: Show 404 if profile page doesnt exist, probably done at route level
const ProfilePage = () => {
  const { address } = useAccount();
  const { username } = useParams();

  const {
    data: user,
    isError,
    isLoading,
    error,
    isFetching,
  } = useGetProfileByUsername(username);

  if (isLoading) {
    return <LoadingPage message={"fetching profile..."} />;
  }

  if (isError) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
        <SnedBirdIcon />
        <h3>Oops, there&apos;s no user with the username {username}</h3>
      </div>
    );
  }

  console.log(user?.user);

  return (
    <>
      {/* Left Side - Profile Info and Bio (Desktop only) */}
      <div className="flex-1 flex md:overflow-hidden">
        <div className="hidden md:flex md:flex-col md:w-1/2 border-r border-default-200 overflow-y-auto scrollbar-hide md:m-8 md:mb-0 md:mr-0 md:pr-8">
          <ProfileHeader
            isOwnProfile={user?.user.wallets[0].address === address}
            name={user?.user.name || ""}
            slogan={user?.user.slogan}
            socials={user?.user.socials}
          />
          <div className="px-4 p-6 border-t border-default-200">
            <About about={user?.user.about} />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col md:m-8 md:mb-0">
          {/* Profile Info (Only visible on mobile) */}
          <div className="md:hidden">
            <ProfileHeader
              name={user?.user.name || ""}
              isOwnProfile={user?.user.wallets[0].address === address}
              socials={user?.user.socials}
            />
          </div>
          <Tabs
            aria-label="Tab options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "w-full bg-background md:px-0 md:pr-8 md:border-b-1",
              tab: "p-0",
              panel: "px-4 py-6 md:overflow-y-auto scrollbar-hide md:px-0",
              cursor: "w-full",
            }}
            defaultSelectedKey="home"
          >
            <Tab
              key="about"
              title={
                <div className="flex items-center space-x-2">
                  <span>About</span>
                </div>
              }
              className="md:hidden"
            >
              <About about={user?.user.about} />
            </Tab>
            <Tab
              key="home"
              title={
                <div className="flex items-center space-x-2">
                  <span>Home</span>
                </div>
              }
            >
              <Home />
            </Tab>
            <Tab
              key="posts"
              title={
                <div className="flex items-center space-x-2">
                  <span>Posts</span>
                </div>
              }
            >
              <div className="flex justify-center">
                <UnderConstruction />
              </div>
            </Tab>
            <Tab
              key="membership"
              title={
                <div className="flex items-center space-x-2">
                  <span>Membership</span>
                </div>
              }
            >
              <div className="flex justify-center">
                <UnderConstruction />
              </div>
            </Tab>
            <Tab
              key="shop"
              title={
                <div className="flex items-center space-x-2">
                  <span>Shop</span>
                </div>
              }
            >
              <div className="flex justify-center">
                <UnderConstruction />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <h2 className="flex justify-center p-4 border-t-1 text-default-400 border-t-default-200 items-center hover:text-foreground text-sm md:text-md">
        <a href="/create/profile" className="text-center">
          Create your own page and start earning income!
          <RiShareBoxLine size="22" className="pl-2 inline-flex" />
        </a>
      </h2>
    </>
  );
};

export default ProfilePage;
