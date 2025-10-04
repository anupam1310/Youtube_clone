import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSearchWord } from "./SearchWord.context.jsx";

// VideoGrid component to display videos in a grid layout with filtering and search functionality
function VideoGrid() {
  const [videos, setVideos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [TABS, setTABS] = useState([
    "All",
    "Gaming",
    "Music",
    "Education",
    "Coding",
  ]);
  const { searchWord } = useSearchWord();

  // Fetch videos from backend
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

  // Filter videos based on search word
  useEffect(() => {
    if (searchWord.trim() === "") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) =>
          video.title.toLowerCase().includes(searchWord.toLowerCase())
        )
      );
    }
  }, [searchWord, videos]);

  // Filter videos based on selected tab
  useEffect(() => {
    if (selectedTab === "All") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) => video.tags && video.tags.includes(selectedTab))
      );
    }
  }, [selectedTab, videos]);

  // Extract unique tags from videos to create dynamic tabs
  useEffect(() => {
    const uniqueTags = [];
    videos.forEach((video) => {
      if (Array.isArray(video.tags)) {
        video.tags.forEach((tag) => {
          if (!uniqueTags.includes(tag)) {
            uniqueTags.push(tag);
          }
        });
      }
    });
    setTABS(["All", ...uniqueTags]);
  }, [videos]);

  // Render component
  return (
    <div className="px-4 py-6">
      {/* Filter Tabs - horizontal scroll */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-semibold border transition-all duration-200 whitespace-nowrap ${
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
