import React from "react";
import "./ArtistCard.css";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ id, image, name }) => {

  const navigate = useNavigate();

  return (
    <div
      className="artist-card"
      onClick={() => navigate(`/artist/${id}`)}
    >

      <div className="artist-image">

        <img src={image} alt={name} />

        <button
          className="artist-play"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/artist/${id}`);
          }}
        >
          <FaPlay />
        </button>

      </div>

      <h4>{name}</h4>

      <p>Artist</p>

    </div>
  );
};

export default ArtistCard;