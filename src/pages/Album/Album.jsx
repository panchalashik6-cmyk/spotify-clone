import React from "react";
import "./Album.css";

import { useParams } from "react-router-dom";
import { FaPlay, FaHeart, FaClock } from "react-icons/fa";

import albums from "../../data/albums";
import songs from "../../data/songs";

import { usePlayer } from "../../context/PlayerContext";

const Album = () => {
  const { id } = useParams();

  const { playSong } = usePlayer();

  // Find Selected Album
  const album = albums.find(
    (item) => item.id === Number(id)
  );

  // Album Not Found
  if (!album) {
    return (
      <div className="album-page">
        <h1>Album Not Found</h1>
      </div>
    );
  }

  // Songs of Selected Album
  const albumSongs = songs.filter((song) =>
    album.songs.includes(song.id)
  );

  // Play First Song
  const handlePlayAlbum = () => {
    if (albumSongs.length > 0) {
      const songIndex = songs.findIndex(
        (item) => item.id === albumSongs[0].id
      );

      if (songIndex !== -1) {
        playSong(songIndex);
      }
    }
  };

  return (
    <div className="album-page">

      {/* Album Header */}

      <div className="album-header">

        <img
          src={album.image}
          alt={album.title}
          className="album-cover"
        />

        <div className="album-info">

          <p className="album-type">
            Album
          </p>

          <h1 className="album-title">
            {album.title}
          </h1>

          <p className="album-artist">
            {album.artist}
          </p>

          <div className="album-meta">
            <span>🎵 {albumSongs.length} Songs</span>
            <span> • </span>
            <span>2026</span>
          </div>

          <div className="album-actions">

            <button
              className="play-btn"
              onClick={handlePlayAlbum}
            >
              <FaPlay />
              Play
            </button>

            <button className="like-btn">
              <FaHeart />
            </button>

          </div>

        </div>

      </div>

      {/* Song List */}

      <div className="song-table">

        <div className="song-heading">

          <span>#</span>

          <span>Title</span>

          <span>Artist</span>

          <span>
            <FaClock />
          </span>

        </div>

        {albumSongs.map((song, index) => {

          const songIndex = songs.findIndex(
            (item) => item.id === song.id
          );

          return (

            <div
              key={song.id}
              className="song-row"
              onClick={() => playSong(songIndex)}
            >

              <span className="song-number">
                {index + 1}
              </span>

              <div className="song-info">

                <img
                  src={song.image}
                  alt={song.title}
                  className="song-image"
                />

                <div>

                  <h4>{song.title}</h4>

                  <p>{song.artist}</p>

                </div>

              </div>

              <span className="song-artist">
                {song.artist}
              </span>

              <span className="song-duration">
                3:25
              </span>

            </div>

          );
        })}

      </div>

    </div>
  );
};

export default Album;