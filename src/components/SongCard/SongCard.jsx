import React, { useState } from "react";
import "./SongCard.css";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaPlus,
} from "react-icons/fa";

import { usePlayer } from "../../context/PlayerContext";

const SongCard = ({ song }) => {
  const {
    songs,
    playSong,
    playlists = [],
    addSongToPlaylist,
    likedSongs,
    toggleLike,
  } = usePlayer();

  const [showPlaylist, setShowPlaylist] = useState(false);

  const handlePlay = () => {
    const index = songs.findIndex((item) => item.id === song.id);

    if (index !== -1) {
      playSong(index);
    }
  };

  const isLiked = likedSongs.some(
    (item) => item.id === song.id
  );

  return (
    <div className="song-card">
      {/* Left */}
      <div className="song-left">
        <img
          src={song.image}
          alt={song.title}
          className="song-image"
        />

        <div className="song-info">
          <h4>{song.title}</h4>
          <p>{song.artist}</p>
        </div>
      </div>

      {/* Right */}
      <div className="song-actions">

        {/* Like */}
        <button
          className={`icon-btn ${isLiked ? "liked" : ""}`}
          onClick={() => toggleLike(song)}
          title="Like Song"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Add Playlist */}
        <button
          className="icon-btn"
          title="Add To Playlist"
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylist(!showPlaylist);
          }}
        >
          <FaPlus />
        </button>

        {/* Play */}
        <button
          className="play-btn"
          onClick={handlePlay}
          title="Play"
        >
          <FaPlay />
        </button>

      </div>

      {/* Playlist Popup */}
      {showPlaylist && (
        <div className="playlist-popup">

          <div className="playlist-popup-title">
            Select Playlist
          </div>

          {playlists.length === 0 ? (

            <div className="empty-playlist-text">
              No Playlist Found
            </div>

          ) : (

            playlists.map((playlist) => (

              <button
                key={playlist.id}
                className="playlist-item"
                onClick={() => {
                  addSongToPlaylist(playlist.id, song);
                  setShowPlaylist(false);
                }}
              >
                🎵 {playlist.name}
              </button>

            ))

          )}

        </div>
      )}
    </div>
  );
};

export default SongCard;