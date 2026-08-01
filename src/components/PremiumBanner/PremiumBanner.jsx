import React from "react";
import "./PremiumBanner.css";
import { FaSpotify, FaCrown } from "react-icons/fa";

const PremiumBanner = () => {
  return (
    <div className="premium-banner">

      <div className="premium-left">

        <FaSpotify className="spotify-icon" />

        <div>

          <h2>Spotify Premium</h2>

          <p>
            Ad-free music • Offline listening • Better sound quality
          </p>

        </div>

      </div>

      <button className="premium-btn">

        <FaCrown />

        Get Premium

      </button>

    </div>
  );
};

export default PremiumBanner;