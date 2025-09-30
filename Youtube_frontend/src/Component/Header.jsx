import youtube_logo from '../assets/youtube.png';
import search_icon from '../assets/search.png';
import "./Component_Css/Header.css"
import { useState } from 'react';


function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="flex-div">
            <div className="nav-left flex-div">YouTube</div>
                <div className="hamburger_menu">☰</div>
                <div className="YouTube_logo"><img src={youtube_logo} alt="YouTube Logo" /></div>


            <div className="nav-center flex-div">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search<img src={search_icon} alt="Search Icon" /></button>
            </div>


            <div className="nav-right flex-div">
                {isLoggedIn ? (
                    <>
                        <button className="signin_button">Sign Out</button>
                        <button className="create_channel_button">Create Channel</button>
                    </>
                ) : (
                    <button className="signin_button">Sign In</button>
                )}
            </div>
        </div>
    </header>
  );    
}

export default Header;