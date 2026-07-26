import React from "react";
import "./ArtistCard.css";
import { FaPlay } from "react-icons/fa";

const ArtistCard = ({ image, name }) => {
  return (
    <div className="artist-card">

      <div className="artist-image">

        <img src={image} alt={name} />

        <button className="artist-play">
          <FaPlay />
        </button>

      </div>

      <h4>{name}</h4>

      <p>Artist</p>

    </div>
  );
};

export default ArtistCard;