import React from "react";
import "./AlbumSongs.css";
import {
  FaPlay,
  FaRegHeart,
  FaClock,
} from "react-icons/fa";

const AlbumSongs = ({
  songs,
  playSong,
}) => {
  return (
    <div className="album-songs">

      <div className="album-song-header">

        <span>#</span>

        <span>Title</span>

        <span>Album</span>

        <span>Plays</span>

        <span>
          <FaClock />
        </span>

      </div>

      {songs.map((song, index) => (

        <div
          key={song.id}
          className="album-song-row"
          onClick={() => playSong(song.id)}
        >

          <span className="song-index">

            {index + 1}

          </span>

          <div className="album-song-info">

            <img
              src={song.image}
              alt={song.title}
            />

            <div>

              <h4>{song.title}</h4>

              <p>{song.artist}</p>

            </div>

          </div>

          <span>

            {song.album || "Single"}

          </span>

          <span>

            {song.plays || "--"}

          </span>

          <div className="song-time">

            <FaRegHeart />

            <span>

              {song.duration || "--:--"}

            </span>

            <button
              className="song-play-btn"
              onClick={(e) => {
                e.stopPropagation();
                playSong(song.id);
              }}
            >
              <FaPlay />
            </button>

          </div>

        </div>

      ))}

    </div>
  );
};

export default AlbumSongs;