import React from "react";
import { useNavigate } from "react-router-dom";

function ChannelVideoCard({ video, onDelete }) {
  // Convert videoId to YouTube thumbnail URL
  const thumbnailUrl = video.thumbnailUrl || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition flex flex-col"
    onClick={() => navigate(`/video/${video._id}`)}
    >
      <img
        src={thumbnailUrl}
        alt={video.title}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg mb-2">{video.title}</h3>
          <p className="text-gray-500 text-sm">{video.views} views</p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this video?")) {
              onDelete(video._id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ChannelVideoCard;