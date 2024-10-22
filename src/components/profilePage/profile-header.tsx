import SocialMediaList from "./social-media-list";

//TODO: include social profiles
const ProfileHeader = () => {
  return (
    <div className="bg-background">
      <div className="h-72 relative">
        <img src="https://images.unsplash.com/photo-1725772685998-be930f3209b9?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="street photograph" className="w-full h-full" />
        <div className="absolute -bottom-10 inset-x-0 flex justify-center">
          <img className="w-24 h-24 bg-gray-400 rounded-full border-4 border-white" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        </div>
      </div>
      <div className="pt-12 pb-6 px-4 text-center">
        <div className="inline-block px-3 py-1 mb-2 text-sm bg-purple-100 text-purple-800 rounded-full font-medium">
          Rising Pro
        </div>
        <h1 className="text-xl font-bold text-default-900 mb-1">Joe Pasky | Urban Photographer</h1>
        <p className="text-default-500 mb-4">180 Donations</p>
        <div className="flex justify-center space-x-2 mb-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out">
            Hire Me
          </button>
          <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out">
            Subscribe
          </button>
          <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 p-2 rounded-full transition duration-150 ease-in-out">
            Share
          </button>
        </div>
        <SocialMediaList />
      </div>
    </div>
  );
}

export default ProfileHeader;