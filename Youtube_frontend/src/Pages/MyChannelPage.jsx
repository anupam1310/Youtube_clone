import { useEffect, useState } from "react";
import { SidebarProvider } from "../Component/Sidebar.context.jsx";
import Header from "../Component/Header.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoGrid from "../Component/VideoGrid.jsx";
import ChannelVideoCard from "../Component/ChannelVideoCard.jsx";

function MyChannelPage() {
  // Example data, replace with your actual channel/user data
  const [channel, setChannel] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

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
        const response = await axios.get(
          `http://localhost:4050/api/channel/user/${userInfo.data.user._id}`,
          {
            headers: {
              Authorization: `BEARER ${localStorage.getItem("token")}`,
            },
          }
        );
        setChannel(response.data[0]);
        // console.log("Channel data:", response.data[0].channelName);
        // console.log("fetched channel data");
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, []);

  useEffect(() => {
    async function fetchVideos() {
      try {
        if (!channel || !userInfo) return;

        const response = await axios.get(
          `http://localhost:4050/api/video/channel/${channel._id}`,
          {
            headers: {
              Authorization: `BEARER ${localStorage.getItem("token")}`,
            },
          }
        );
        setVideos(response.data);
        console.log("Fetched videos:", response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    fetchVideos();
  }, [channel, userInfo]);

  // Separate onDelete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:4050/api/video/${id}`, {
          headers: { Authorization: `BEARER ${token}` },
        });
        setVideos((prev) => prev.filter((v) => v._id !== id));
      } catch (error) {
        alert("Failed to delete video.");
      }
    }
  };

  if (!channel || !userInfo)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-200 mb-6"></div>
        <p className="text-lg text-gray-700 font-semibold">
          Loading your channel...
        </p>
      </div>
    );

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
            <h1 className="text-2xl md:text-3xl font-bold">
              {channel.channelName}
            </h1>
            <p className="text-gray-600">{channel.subscribers} subscribers</p>
          </div>
          <div className="flex space-x-4">
            <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
            onClick={() => navigate("/add-video")}>
              Add Video
            </button>   
            <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
              Customize Channel
            </button>
          </div>
        </div>

        {/* Videos Grid : fetch video from API and pass it to video card component */}
        <div className="mt-8 px-6">
          <h2 className="text-xl font-semibold mb-4">Videos</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.length === 0 ? (
              <p className="text-gray-500">No videos uploaded yet.</p>
            ) : (
              videos.map((video) => (
                <li key={video._id}>
                  <ChannelVideoCard video={video} onDelete={handleDelete} />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyChannelPage;
