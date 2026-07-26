import React from "react";
import "./PlaylistCard.css";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {

  const navigate = useNavigate();

  return (
    <div
      className="playlist-card"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <div className="playlist-image">

        <img
          src={playlist.image}
          alt={playlist.title}
        />

        <button className="playlist-play">

          <FaPlay />

        </button>

      </div>

      <h3>{playlist.title}</h3>

      <p>{playlist.description}</p>

    </div>
  );
};

export default PlaylistCard;