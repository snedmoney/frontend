import { Tab, Tabs } from "@nextui-org/react";
import { RiShareBoxLine } from "react-icons/ri";

import { Navbar } from "@/components/navbar";
import ProfileHeader from "@/components/profilePage/profile-header";
import About from "@/components/profilePage/about";
import Home from "@/components/profilePage/home";
import UnderConstruction from "@/components/under-construction";

//TODO: Show 404 if profile page doesnt exist, probably done at route level
const ProfilePage = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex md:overflow-hidden">
        {/* Left Side - Profile Info and Bio (Desktop only) */}
        <div className="hidden md:flex md:flex-col md:w-1/2 border-r border-default-200 overflow-y-auto scrollbar-hide md:m-8 md:mb-0 md:mr-0 md:pr-8">
          <ProfileHeader />
          <div className="px-4 p-6 border-t border-default-200">
            <About />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:m-8 md:mb-0">
          {/* Profile Info (Only visible on mobile) */}
          <div className="md:hidden">
            <ProfileHeader />
          </div>
          <Tabs
            aria-label="Tab options"
            classNames={{
              tabList: "w-full bg-background md:px-0 md:pr-8 md:border-b-1",
              tab: "p-0",
              panel: "px-4 py-6 md:overflow-y-auto scrollbar-hide md:px-0",
              cursor: "w-full",
            }}
            color="primary"
            defaultSelectedKey="home"
            variant="underlined"
          >
            <Tab
              key="about"
              className="md:hidden"
              title={
                <div className="flex items-center space-x-2">
                  <span>About</span>
                </div>
              }
            >
              <About />
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
        <a className="text-center" href="/create/profile">
          Create your own page and start earning income!
          <RiShareBoxLine className="pl-2 inline-flex" size="22" />
        </a>
      </h2>
    </div>
  );
};

export default ProfilePage;
