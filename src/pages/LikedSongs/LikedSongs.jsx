import React from "react";
import "./LikedSongs.css";

import { FaHeart, FaPlay } from "react-icons/fa";

import { usePlayer } from "../../context/PlayerContext";

const LikedSongs = () => {

  const {
    likedSongs,
    playSong,
    songs,
  } = usePlayer();

  const likedList = songs.filter(song =>
    likedSongs.includes(song.id)
  );

  return (
    <div className="liked-page">

      {/* Header */}

      <div className="liked-header">

        <div className="liked-cover">
          <FaHeart />
        </div>

        <div>

          <p>Playlist</p>

          <h1>Liked Songs</h1>

          <span>
            {likedList.length} Songs
          </span>

        </div>

      </div>
            {/* ==========================
          SONG LIST
      ========================== */}

      <div className="liked-list">

        {likedList.length > 0 ? (

          likedList.map((song) => {

            const index = songs.findIndex(
              item => item.id === song.id
            );

            return (

              <div
                key={song.id}
                className="liked-song"
              >

                <div
                  className="liked-song-info"
                  onClick={() => playSong(index)}
                >

                  <img
                    src={song.image}
                    alt={song.title}
                  />

                  <div>

                    <h3>{song.title}</h3>

                    <p>{song.artist}</p>

                  </div>

                </div>

                <button
                  className="play-song-btn"
                  onClick={() => playSong(index)}
                >
                  <FaPlay />
                </button>

              </div>

            );

          })

        ) : (

          <div className="empty-liked">

            <FaHeart className="empty-icon" />

            <h2>No Liked Songs</h2>

            <p>
              Like your favourite songs and they will appear here.
            </p>

          </div>

        )}

      </div>

    </div>

  );
};

export default LikedSongs;