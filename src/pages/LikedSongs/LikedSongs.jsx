import React from "react";
import "./LikedSongs.css";
import { usePlayer } from "../../context/PlayerContext";
import { FaHeart, FaPlay } from "react-icons/fa";

const LikedSongs = () => {
  const {
    likedSongs,
    playSong,
    toggleLike,
  } = usePlayer();

  return (
    <div className="liked-page">

      <div className="liked-header">

        <div className="liked-icon">
          <FaHeart />
        </div>

        <div>
          <p>Playlist</p>

          <h1>Liked Songs</h1>

          <span>{likedSongs.length} Songs</span>
        </div>

      </div>

      {likedSongs.length === 0 ? (

        <div className="empty-liked">

          <h2>No Liked Songs ❤️</h2>

          <p>Like songs to see them here.</p>

        </div>

      ) : (

        likedSongs.map((song, index) => (

          <div
            key={song.id}
            className="liked-song"
          >

            <div
              className="liked-info"
              onClick={() => playSong(song.id)}
            >

              <span>{index + 1}</span>

              <img
                src={song.image}
                alt={song.title}
              />

              <div>

                <h4>{song.title}</h4>

                <p>{song.artist}</p>

              </div>

            </div>

            <div className="liked-actions">

              <button
                onClick={() => playSong(song.id)}
              >
                <FaPlay />
              </button>

              <button
                onClick={() => toggleLike(song)}
              >
                <FaHeart />
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default LikedSongs;