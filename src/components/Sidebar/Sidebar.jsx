import React, { useState } from "react";
import "./Sidebar.css";

import {
  MdHomeFilled,
  MdLibraryMusic,
  MdAdd,
  MdMenu,
  MdClose,
} from "react-icons/md";

import { IoSearch } from "react-icons/io5";
import { FaHeart, FaMusic } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { playlists } = usePlayer();

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Mobile Header */}

      <div className="mobile-header">
        <button className="menu-btn" onClick={openMenu}>
          <MdMenu />
        </button>

        <h2 className="mobile-logo">Spotify</h2>
      </div>

      {/* Overlay */}

      <div
        className={`overlay ${open ? "show-overlay" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Sidebar */}

      <aside className={`sidebar ${open ? "show" : ""}`}>

        <div className="sidebar-top">

          {/* Header */}

          <div className="sidebar-header">

            <h2 className="logo">Spotify</h2>

            <button
              className="close-btn"
              onClick={closeMenu}
            >
              <MdClose />
            </button>

          </div>

          {/* Main Menu */}

          <div className="menu">

            <NavLink
              to="/home"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <MdHomeFilled className="icon" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/search"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <IoSearch className="icon" />
              <span>Search</span>
            </NavLink>

            <NavLink
              to="/library"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <MdLibraryMusic className="icon" />
              <span>Your Library</span>
            </NavLink>


          </div>

          {/* Playlist Section */}

          <div className="playlist-section">

            <NavLink
              to="/playlist"
              className="playlist-btn"
              onClick={closeMenu}
            >
              <MdAdd />
              <span>Create Playlist</span>
            </NavLink>

          <NavLink
  to="/liked"
  onClick={closeMenu}
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  <FaHeart className="icon" />
  <span>Liked Songs</span>
</NavLink>

            <div className="playlist-title">
              Your Playlists
            </div>

            <div className="playlist-list">

              {playlists.length === 0 ? (

                <div className="empty-playlist">
                  No Playlist
                </div>

              ) : (

                playlists.map((playlist) => (

                  <NavLink
                    key={playlist.id}
                    to={`/playlist/${playlist.id}`}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "playlist-item active-playlist"
                        : "playlist-item"
                    }
                  >
                    <FaMusic />

                    <div className="playlist-info">

                      <span className="playlist-name">
                        {playlist.name}
                      </span>

                      <small>
                        {playlist.songs.length} Songs
                      </small>

                    </div>

                  </NavLink>

                ))

              )}

            </div>

          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;