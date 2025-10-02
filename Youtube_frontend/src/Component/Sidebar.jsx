import { FaHome, FaFire, FaRegCompass, FaBook , FaBars} from 'react-icons/fa';
import {useState,useEffect} from 'react';
import youtube_logo from '../assets/youtube.png';

function Sidebar({openSidebar}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(openSidebar? true : false);
    }, [openSidebar]);
  return (
    <aside className={`fixed top-0 left-0 h-screen w-60 bg-white border-r p-4 z-40 ${isOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col gap-2">
        {/* a button to hide the side bar based on value of state isOpen */}
        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => setIsOpen(false)}>
            {/* button should be a hamburger icon and on same line as that whould be written youtube with a logo of youtube */}
            <div className="flex items-center gap-2">
                <FaBars className="text-xl" />
                <img src={youtube_logo} alt="YouTube Logo" className="h-6" />
                <h2 className="text-xl font-bold">Youtube</h2>
            </div>
        </li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100"><FaHome className="inline mr-2" />Home</li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100"><FaFire className="inline mr-2" />Trending</li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100"><FaRegCompass className="inline mr-2" />Subscriptions</li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100"><FaBook className="inline mr-2" />Library</li>
        <hr className="my-2 border-t" />
      </ul>
    </aside>
  );
}

export default Sidebar;
