import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "../Component/Sidebar.context.jsx";
import Header from "../Component/Header.jsx";



function AddVideoPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [result, setResult] = useState(null);
    const [showResult,setShowResult]=useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null);
        //extract video id from url and check it is a valid youtube url
        if (!videoURL.includes("youtube.com/watch?v=")) {
            setResult("Invalid YouTube URL");
            setShowResult(true);
            return;
        }
        const urlParts = videoURL.split("v=");
        const videoId = urlParts.length > 1 ? urlParts[1].split("&")[0] : null;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setResult("You must be logged in to upload a video");
                setShowResult(true);
                return;
            }
            // Fetching user info to get channelId
            const userResponse = await axios.get("http://localhost:4050/api/verify", {
                headers: { Authorization: `BEARER ${token}` },
            });
            const userInfo = userResponse.data.user;
            const userId = userInfo._id;
            const channelId = userInfo.channelId;
            if (!channelId) {
                setResult("You must have a channel to upload a video");
                setShowResult(true);
                return;
            }
            const response = await axios.post("/api/video", {
                title: title,
                description: description,
                tags: tags,
                videoId: videoId,
                channelId: channelId,
                userId: userId
            }, {
                headers: { Authorization: `BEARER ${token}` },
            });
            setResult("Video uploaded successfully!");
            setShowResult(true);
        } catch (error) {
            setResult("Error uploading video");
            setShowResult(true);
        }
    };
    return (
        <>
        <SidebarProvider>
          <Header />
        </SidebarProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Upload Video</h2>
                {result && <p className="text-red-500 mb-4">{result}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Tags</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Video URL</label>
                        <input
                            type="text"
                            value={videoURL}
                            onChange={(e) => setVideoURL(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Upload
                    </button>
                    {showResult && <p className="mt-4 text-center text-gray-700">{result}</p>}
                </form>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-500 hover:underline"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddVideoPage;
