import React from "react";
import "./FansAlsoLike.css";
import { useNavigate } from "react-router-dom";

const FansAlsoLike = ({ artists, currentArtistId }) => {
  const navigate = useNavigate();

  const filteredArtists = artists
    .filter((artist) => artist.id !== currentArtistId)
    .slice(0, 6);

  return (
    <div className="fans-section">

      <h2>Fans Also Like</h2>

      <div className="fans-grid">

        {filteredArtists.map((artist) => (

          <div
            key={artist.id}
            className="fan-card"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >

            <img
              src={artist.image}
              alt={artist.name}
            />

            <h3>{artist.name}</h3>

            <p>Artist</p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default FansAlsoLike;