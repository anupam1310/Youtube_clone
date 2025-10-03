import {useEffect,useState} from "react";
import { SidebarProvider } from "../Component/Sidebar.context.jsx";
import Header from "../Component/Header.jsx";
import axios from "axios";

function MyChannelPage() {
  // Example data, replace with your actual channel/user data
    const [channel, setChannel] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {

        const userInfo = await axios.get("http://localhost:4050/api/verify", {
          headers: {
            Authorization: `BEARER ${localStorage.getItem("token")}`,
          },
        });
        setUserInfo(userInfo);
        // console.log("User ID:", userInfo.data.user._id);
        // console.log("fetched user id");
        const response = await axios.get(`http://localhost:4050/api/channel/user/${userInfo.data.user._id}`, {
          headers: {
            Authorization: `BEARER ${localStorage.getItem("token")}`,
          },
        });
        setChannel(response.data[0]);
        // console.log("Channel data:", response.data[0].channelName);
        // console.log("fetched channel data");
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, []);


  if (!channel || !userInfo) return <div>Loading channel...</div>;


  return (
    <>

      <SidebarProvider>
        <Header />
      </SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Banner */}
        <div className="w-full h-40 md:h-64 bg-gray-200 relative">
          <img
            src={channel.channelBannerURL}
            alt="Channel Banner"
            className="w-full h-full object-cover"
          />
          {/* Avatar */}
          <div className="absolute left-6 bottom-[-40px] md:bottom-[-60px]">
            {userInfo && (
              <img
                src={userInfo.data.user.avatar_url}
                alt="Channel Avatar"
                className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Channel Info */}
        <div className="pt-12 md:pt-20 px-6 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{channel.channelName}</h1>
            <p className="text-gray-600">{channel.subscribers} subscribers</p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
            Customize Channel
          </button>
        </div>

        {/* Videos Grid */}
        <div className="mt-8 px-6">
          <h2 className="text-xl font-semibold mb-4">Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {channel.videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-t"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {video.views} views • {video.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyChannelPage;