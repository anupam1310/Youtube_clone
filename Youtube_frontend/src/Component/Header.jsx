import React, { useState , useEffect} from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import youtube_logo from '../assets/youtube.png';
import search_icon from '../assets/search.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Header() {
    const navigate = useNavigate();

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
          const response = await axios.post(
            'http://localhost:4050/api/verify',
            {},
            {
              headers: {
                Authorization: `BEARER ${token}`,
              },
            }
          );
          if (response.data.user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsLoggedIn(false);
        }
      };
      verifyToken();
    }, []);


    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    };

  return (
    
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <button className="text-2xl text-gray-700 hover:bg-gray-100 p-2 rounded-full">
          <FaBars />
        </button>
        <img
          src={youtube_logo} 
          alt="YouTube Logo"
          className="h-10 w-auto"
        /><span className="text-2xl text-gray-700">Youtube</span>
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
        <button onClick={() => navigate("/register")}>Sign In</button>
            ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {(!isChannelCreated && isLoggedIn)?
          <button>Create Channel</button>
            : 
            <button>My Channel</button>
          }
          <button style={{ color: 'blue', fontWeight: 'bold' }} onClick={handleLogout}>
            Sign Out
          </button>
          <FaUserCircle className="text-6xl text-gray-700 hover:bg-gray-100 p-2 rounded-full" />
        </div>
        )}
    </div>
     </header>
);

}

export default Header;