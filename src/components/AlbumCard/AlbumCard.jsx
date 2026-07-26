import React from "react";
import "./AlbumCard.css";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AlbumCard = ({ id, image, title, artist }) => {

  const navigate = useNavigate();

  return (
    <div
      className="album-card"
      onClick={() => navigate(`/album/${id}`)}
    >
      <div className="album-image">

        <img src={image} alt={title} />

        <button
          className="play-icon"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/album/${id}`);
          }}
        >
          <FaPlay />
        </button>

      </div>

      <h4>{title}</h4>

      <p>{artist}</p>

    </div>
  );
};

export default AlbumCard;