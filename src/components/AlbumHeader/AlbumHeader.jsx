import React from "react";
import "./AlbumHeader.css";
import { FaPlay } from "react-icons/fa";

const AlbumHeader = ({ album, playSong }) => {
  return (
    <div className="album-header">

      <img
        src={album.image}
        alt={album.title}
      />

      <div className="album-info">

        <p className="album-type">
          Album
        </p>

        <h1>{album.title}</h1>

        <p>
          {album.artist}
        </p>

        <button
          className="album-play-btn"
          onClick={() =>
            playSong(album.songs[0])
          }
        >
          <FaPlay />
          Play
        </button>

      </div>

    </div>
  );
};

export default AlbumHeader;