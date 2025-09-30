import React, { useState } from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import youtube_logo from '../assets/youtube.png';
import search_icon from '../assets/search.png';
import "./Component_Css/Header.css"

function Header() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isChannelCreated, setIsChannelCreated] = useState(true);
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
        <button>Sign In</button>
            ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {(!isChannelCreated && isLoggedIn)?
          <button>Create Channel</button>
            : 
            <button>My Channel</button>
          }
          <button style={{ color: 'blue', fontWeight: 'bold' }}>Sign Out </button>
          <FaUserCircle className="text-6xl text-gray-700 hover:bg-gray-100 p-2 rounded-full" />
        </div>
        )}
    </div>
     </header>
);

}

export default Header;