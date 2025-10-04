import { FaHome, FaFire, FaRegCompass, FaBook, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import youtube_logo from "../assets/youtube.png";
import { useSidebar } from "./Sidebar.context.jsx";
// Sidebar component with non functional navigation links and toggle functionality
function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // render sidebar only if isSidebarOpen is true
  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-60 bg-white border-r p-4 z-40 ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <ul className="flex flex-col gap-2">
        <li
          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="flex items-center gap-2">
            <FaBars className="text-xl" />
            <img src={youtube_logo} alt="YouTube Logo" className="h-6" />
            <h2 className="text-xl font-bold">Youtube</h2>
          </div>
        </li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100">
          <FaHome className="inline mr-2" />
          Home
        </li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100">
          <FaFire className="inline mr-2" />
          Trending
        </li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100">
          <FaRegCompass className="inline mr-2" />
          Subscriptions
        </li>
        <hr className="my-2 border-t" />
        <li className="py-2 px-4 hover:bg-gray-100">
          <FaBook className="inline mr-2" />
          Library
        </li>
        <hr className="my-2 border-t" />
      </ul>
    </aside>
  );
}

export default Sidebar;
