import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Component/Header.jsx";
import { SidebarProvider } from "../Component/Sidebar.context.jsx";


// Video Player Page with video playback, likes/dislikes, comments, and sidebar with random videos
function VideoPlayerPage() {
  const { id } = useParams(); 
  const [videoData, setVideoData] = useState(null);
  const [randomVideos, setRandomVideos] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [commenterNames, setCommenterNames] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch video data
  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await axios.get(
          `http://localhost:4050/api/video/${id}`
        );
        setVideoData(response.data);
      } catch (error) {
        // handle error
      }
    }
    fetchVideo();
  }, [id]);

  // Fetch random videos
  useEffect(() => {
    async function fetchRandomVideos() {
      try {
        console.log("Fetching random videos");
        const response = await axios.get("http://localhost:4050/api/videos");
        //randomise videos
        response.data.sort(() => Math.random() - 0.5);
        setRandomVideos(response.data);
      } catch (error) {
        console.log("Error fetching random videos:", error);
      }
    }
    fetchRandomVideos();
  }, []);

  // Like/Dislike handlers
  const handleLike = async () => {
    if (!token) return alert("Please login to like videos.");
    try {
      await axios.post(
        `http://localhost:4050/api/video/${id}/like`,
        {},
        {
          headers: { Authorization: `BEARER ${token}` },
        }
      );
      setVideoData({ ...videoData, likes: videoData.likes + 1 });
    } catch (error) {}
  };

  const handleDislike = async () => {
    if (!token) return alert("Please login to dislike videos.");
    try {
      await axios.post(
        `http://localhost:4050/api/video/${id}/dislike`,
        {},
        {
          headers: { Authorization: `BEARER ${token}` },
        }
      );
      setVideoData({ ...videoData, dislikes: videoData.dislikes + 1 });
    } catch (error) {}
  };

  // Comment handlers
  const handleAddComment = async () => {
    if (!token) return alert("Please login to comment.");
    try {
      const response = await axios.post(
        `http://localhost:4050/api/video/${id}/comment`,
        { text: commentText },
        { headers: { Authorization: `BEARER ${token}` } }
      );
      setVideoData({
        ...videoData,
        comments: [...videoData.comments, response.data],
      });
      setCommentText("");
    } catch (error) {}
  };

  const handleEditComment = async (commentId) => {
    if (!token) return alert("Please login to edit comments.");
    try {
      const response = await axios.put(
        `http://localhost:4050/api/video/${id}/comment/${commentId}`,
        { text: editingCommentText },
        { headers: { Authorization: `BEARER ${token}` } }
      );
      setVideoData({
        ...videoData,
        comments: videoData.comments.map((c) =>
          c.commentId === commentId ? { ...c, text: editingCommentText } : c
        ),
      });
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (error) {}
  };

  const handleDeleteComment = async (commentId) => {
    if (!token) return alert("Please login to delete comments.");
    try {
      await axios.delete(
        `http://localhost:4050/api/video/${id}/comment/${commentId}`,
        { headers: { Authorization: `BEARER ${token}` } }
      );
      setVideoData({
        ...videoData,
        comments: videoData.comments.filter((c) => c.commentId !== commentId),
      });
    } catch (error) {}
  };

  // Fetch commenter names
  useEffect(() => {
    async function fetchNames() {
      if (!videoData || !videoData.comments) return;
      // console.log("Fetching commenter names");
      const names = {};
      await Promise.all(
        videoData.comments.map(async (comment) => {
          try {
            const response = await axios.get(
              `http://localhost:4050/api/user/${comment.userId}`
            );
            console.log(response);
            console.log(
              "Fetched name for userId",
              comment.userId,
              ":",
              response.data.name
            );
            names[comment.userId] = response.data.name;
          } catch {
            names[comment.userId] = "Unknown";
          }
        })
      );
      setCommenterNames(names);
    }
    fetchNames();
  }, [videoData]);

  // Loading state
  if (!videoData)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row gap-6 px-4 py-6">
        {/* Main Video Section */}
        <div className="flex-1">
          <div className="aspect-video bg-black mb-4">
            <iframe
              title={videoData.title}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoData.videoId}`}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">{videoData.title}</h1>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-gray-600">{videoData.views} views</span>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleLike}
            >
              👍 {videoData.likes}
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleDislike}
            >
              👎 {videoData.dislikes}
            </button>
          </div>
          <p className="mb-4 text-gray-700">{videoData.description}</p>

          {/* Comments */}

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Comments</h2>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 flex-1"
                placeholder="Add a comment..."
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddComment}
              >
                Comment
              </button>
            </div>
            <ul>
              {videoData.comments.map((comment) => (
                <li key={comment.commentId} className="mb-3 border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {console.log(commenterNames)}
                      {commenterNames[comment.userId] || "Unknown"}
                    </span>

                    <div className="flex gap-2">
                      <button
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => {
                          setEditingCommentId(comment.commentId);
                          setEditingCommentText(comment.text);
                        }}
                        disabled={token ? false : true}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline text-sm"
                        onClick={() => handleDeleteComment(comment.commentId)}
                        disabled={token ? false : true}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {editingCommentId === comment.commentId ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 flex-1"
                      />
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        onClick={() => handleEditComment(comment.commentId)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-700">{comment.text}</p>
                  )}
                  <span className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Sidebar - Random Videos */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <h2 className="text-lg font-semibold mb-4">Up Next</h2>
          <div className="flex flex-col gap-4">
            {randomVideos.map((video) => (
              <div
                key={video._id}
                className="flex gap-3 cursor-pointer hover:bg-gray-100 rounded p-2"
                onClick={() => navigate(`/video/${video._id}`)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

export default VideoPlayerPage;
