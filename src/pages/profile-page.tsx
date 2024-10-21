import { Navbar } from "@/components/navbar";
import ProfileHeader from "@/components/profilePage/profile-header";
import { Tab, Tabs } from "@nextui-org/react";
import About from '@/components/profilePage/about';

const ProfilePage = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex md:overflow-hidden md:p-8 md:pb-0">
        {/* Left Side - Profile Info and Bio (Desktop only) */}
        <div className="hidden md:flex md:flex-col md:w-2/5 border-r border-gray-200 overflow-y-auto">
          <ProfileHeader />
          <div className="px-4 py-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Bio</h2>
            <About />
          </div>
        </div>

        {/* Right Side - Full width on mobile, 3/5 on desktop */}
        <div className="w-full md:w-3/5 flex flex-col md:overflow-hidden">
          {/* Profile Info (Only visible on mobile) */}
          <div className="md:hidden">
            <ProfileHeader />
          </div>
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            // classNames={{
            //   tabList: "gap-6 w-full relative rounded-none p-0  border-divider flex justify-center",
            //   cursor: "w-full bg-[#22d3ee]",
            //   tab: "max-w-fit px-0 h-12",
            //   tabContent: "group-data-[selected=true]:text-[#06b6d4]"
            // }}
          >
            <Tab
              key="about"
              title={
                <div className="flex items-center space-x-2">
                  <span>About</span>
                </div>
              }
              className='md:hidden'
            >
              <About />
            </Tab>
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <span>Music</span>
                </div>
              }
            >
              some stuff2
            </Tab>
            <Tab
              key="videos"
              title={
                <div className="flex items-center space-x-2">
                  <span>Videos</span>
                </div>
              }
            >
              someStuff
            </Tab>
          </Tabs>
        </div>
      </div>
    </ div>
  );
}

export default ProfilePage;