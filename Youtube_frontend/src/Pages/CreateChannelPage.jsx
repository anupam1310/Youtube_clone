import { useState } from "react";
import axios from "axios";
import Header from "../Component/Header.jsx";
import { Link } from "react-router-dom";

function CreateChannelPage() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBannerURL, setChannelBannerURL] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Basic validation of input fields
    if (channelName.length < 3) {
      setError("Channel name must be at least 3 characters long");
      return;
    }
    if (description.length < 10) {
      setError("Description must be at least 10 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("token");
        if (!token) {
        setError("User not authenticated");
        return;
      }
      //check if channel name already exists
      const existingChannel = await axios.get(`http://localhost:4050/api/channel/name/${channelName}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });

      if (existingChannel.data.length > 0) {
        console.log(existingChannel.data);
        setError("Channel name already exists");
        return;
      }

      const response = await axios.post(
        "http://localhost:4050/api/channel/create",
        { 
            channelName: channelName, 
            description: description, 
            channelBannerURL: channelBannerURL 
        },
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      setSuccess("Channel created successfully!");
      setChannelName("");
      setDescription("");
      setChannelBannerURL("");
      
    } catch (err) {
      setError(err.response?.data?.message || "Error creating channel");
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Channel
          </h1>
          <form onSubmit={handleCreateChannel} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Channel Name
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter channel name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your channel"
                rows={3}

              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Channel Banner URL
              </label>
              <input
                type="text"
                value={channelBannerURL}
                onChange={(e) => setChannelBannerURL(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional: Banner image URL"
                
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Create Channel
            </button>
          </form>
          {error && (
            <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-center text-green-600 text-sm">{success}</p>
          )}
          <Link to="/">
            <p className="mt-4 text-center text-blue-600 text-sm">
              Go back to Home
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreateChannelPage;
