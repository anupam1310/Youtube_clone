import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";

const TABS = ["All", "Gaming", "Music", "Education", "Coding"];

function VideoGrid() {
  const [videos, setVideos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get("http://localhost:4050/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    if (selectedTab === "All") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) =>
          video.tags && video.tags.includes(selectedTab)
        )
      );
    }
  }, [selectedTab, videos]);

  return (
    <div className="px-4 py-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-semibold border transition-all duration-200 ${
              selectedTab === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideoGrid;
