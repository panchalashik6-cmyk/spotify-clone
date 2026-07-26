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

      <div className="song-actions">
        <button
          className="icon-btn"
    onClick={() => toggleLike(song)}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>

        {playlists.length > 0 && (
          <button
            className="icon-btn"
            onClick={() => setShowPlaylist(!showPlaylist)}
          >
            <FaPlus />
          </button>
        )}

        <button
          className="play-btn"
          onClick={handlePlay}
        >
          <FaPlay />
        </button>
      </div>

      {showPlaylist && playlists.length > 0 && (
        <div className="playlist-popup">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              className="playlist-item"
              onClick={() => {
                if (addSongToPlaylist) {
                  addSongToPlaylist(playlist.id, song);
                }
                setShowPlaylist(false);
              }}
            >
              {playlist.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongCard;