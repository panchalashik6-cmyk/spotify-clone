import React from "react";
import "./Sidebar.css";

import { MdHomeFilled, MdLibraryMusic, MdAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Top */}

      <div className="sidebar-top">
        <h2 className="logo">Spotify</h2>

        <div className="menu">

       <NavLink
  to="/home"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
            <MdHomeFilled className="icon" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <IoSearch className="icon" />
            <span>Search</span>
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <MdLibraryMusic className="icon" />
            <span>Your Library</span>
          </NavLink>

        </div>
      </div>

      {/* Playlist */}

      <div className="playlist-section">

        <div className="playlist-btn">
          <MdAdd />
          <span>Create Playlist</span>
        </div>

        <div className="playlist-btn">
          <FaHeart />
          <span>Liked Songs</span>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;