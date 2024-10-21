
//TODO: include social profiles
const ProfileHeader = () => {
  return (
    <div className="bg-white">
      <div className="h-48 bg-gray-300 relative">
        <div className="absolute -bottom-10 inset-x-0 flex justify-center">
          <div className="w-24 h-24 bg-gray-400 rounded-full border-4 border-white"></div>
        </div>
      </div>
      <div className="pt-12 pb-6 px-4 text-center">
        <div className="inline-block px-3 py-1 mb-2 text-sm bg-purple-100 text-purple-800 rounded-full font-medium">
          Rising Pro
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Catalin|TheCeliacin Italy</h1>
        <p className="text-gray-500 mb-4">180 Subscribers</p>
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
      </div>
    </div>
  );
}

export default ProfileHeader;
