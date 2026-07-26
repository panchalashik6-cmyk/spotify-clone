import React from "react";
import "./Navbar.css";
import profileImg from "../../assets/profile/ashikimg.png";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

import {
  FaChevronLeft,
  FaChevronRight,
  FaBell,
} from "react-icons/fa";

import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="navbar">

      <div className="navbar-left">

        <button className="nav-btn" onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </button>

        <button className="nav-btn" onClick={() => navigate(1)}>
          <FaChevronRight />
        </button>

        <div className="search-box">
          <IoSearch />
          <input
            type="text"
            placeholder="What do you want to play?"
          />
        </div>

      </div>

      <div className="navbar-right">

        <button className="premium-btn">
          Explore Premium
        </button>
{/* 
        <button className="install-btn">
          Install App
        </button> */}

        <button className="bell-btn">
          <FaBell />
        </button>

        <img
          src={profileImg}
          alt="profile"
          className="profile-img"
        />

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;