import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const [channelName, setChannelName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChannelName() {
      try {
        const response = await axios.get(`http://localhost:4050/api/channel/${video.channelId}`);
        setChannelName(response.data.channelName || "Unknown Channel");
      } catch (error) {
        setChannelName("Unknown Channel");
      }
    }
    fetchChannelName();
  }, [video.channelId]);

  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col cursor-pointer"
      onClick={() => navigate(`/video/${video._id}`)}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-gray-500 text-sm mb-1">{channelName}</p>
        <p className="text-gray-500 text-xs">
          {video.views} views
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
