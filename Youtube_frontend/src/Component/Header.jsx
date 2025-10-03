import React, { useState , useEffect, useRef} from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import youtube_logo from '../assets/youtube.png';
import search_icon from '../assets/search.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSidebar } from './Sidebar.context.jsx';

function Header() {
    const navigate = useNavigate();
    const { setIsSidebarOpen } = useSidebar();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChannelCreated, setIsChannelCreated] = useState(false);
 

    // check token in local storage
    useEffect(() => {
      const verifyToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        try {
          const response = await axios.get(
            'http://localhost:4050/api/verify',
            {
              headers: {
                Authorization: `BEARER ${token}`,
              },
            }
          );
          if (response.data.user) {
            setIsLoggedIn(true);
            
            // Check if channel is created
            const userId = response.data.user._id;
            const channelResponse = await axios.get(`http://localhost:4050/api/channel/user/${userId}`, {
              headers: {
                Authorization: `BEARER ${token}`,
              },
            });
            setIsChannelCreated(channelResponse.data.length > 0);
          } else {
            setIsLoggedIn(false);
          }
          // console.log("User verified:", response.data.user);
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsLoggedIn(false);
        }
      };
      verifyToken();
    }, []);

    // console.log("rerender");
    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    };



  return (
    
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <Sidebar />

      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl text-gray-700 hover:bg-gray-100 p-2 rounded-full"
        >
          <FaBars />
        </button>
        <button onClick={() => navigate("/")} className="hidden md:inline-flex">
        <img
          src={youtube_logo} 
          alt="YouTube Logo"
          className="h-10 w-auto"
        /><span className="hidden md:inline  text-2xl text-gray-700">Youtube</span>
        </button>
      </div>

      {/* Center: Search */}
      <div className="flex items-center flex-1 max-w-xl mx-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
        />
        <button className='bg-gray-100 px-4 py-2 border border-gray-300 rounded-r-full hover:bg-gray-200'>
          <FaSearch className="text-2xl text-gray-600" />
        </button>
      </div>

      {/* Right: Icons */}
      <div>
        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/register")}
            className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-2 md:gap-4">
            {(!isChannelCreated && isLoggedIn) ?
              <button className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => navigate("/create-channel")}
              >
                Create Channel
              </button>
              :
              <button onClick={() => navigate("/my-channel")} className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base bg-gray-100 rounded hover:bg-gray-200">
                My Channel
              </button>
            }
            <button
              style={{ color: 'blue', fontWeight: 'bold' }}
              className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base rounded"
              onClick={handleLogout}
            >
              Sign Out
            </button>
            {/* Hide FaUserCircle on small screens */}
            <FaUserCircle className="hidden md:inline text-3xl md:text-6xl text-gray-700 hover:bg-gray-100 p-2 rounded-full" />
          </div>
          
        )}
        
      </div>
     </header>
);

}

export default Header;