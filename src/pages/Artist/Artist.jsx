import React from "react";
import "./Artist.css";

import { useParams } from "react-router-dom";
import { FaPlay, FaCheckCircle } from "react-icons/fa";

import artists from "../../data/artists";
import songs from "../../data/songs";
import albums from "../../data/albums";
import { usePlayer } from "../../context/PlayerContext";

const Artist = () => {
  const { id } = useParams();

  const { playSong } = usePlayer();

  const artist = artists.find(
    (item) => item.id === Number(id)
  );

  if (!artist) {
    return (
      <div className="artist-page">
        <h1>Artist Not Found</h1>
      </div>
    );
  }

  // Songs of this artist
  const artistSongs = songs.filter(
    (song) => song.artist === artist.name
  );

  // Albums of this artist
  const artistAlbums = albums.filter(
    (album) => album.artist === artist.name
  );

  return (
    <div className="artist-page">

      {/* Header */}

      <div
        className="artist-header"
        style={{
          backgroundImage: `url(${artist.image})`,
        }}
      >
        <div className="artist-overlay">

          <p className="verified">

            <FaCheckCircle />

            Verified Artist

          </p>

          <h1>{artist.name}</h1>

          <p>
            {artist.monthlyListeners} Monthly Listeners
          </p>

          <button
            className="artist-play-btn"
            onClick={() => {
              if (artistSongs.length > 0) {
                const index = songs.findIndex(
                  (song) =>
                    song.id === artistSongs[0].id
                );

                playSong(index);
              }
            }}
          >
            <FaPlay />
            Play
          </button>

        </div>
      </div>

      {/* Popular Songs */}

      <div className="artist-section">

        <h2>Popular</h2>

        {artistSongs.map((song, index) => {

          const songIndex = songs.findIndex(
            (item) => item.id === song.id
          );

          return (

            <div
              key={song.id}
              className="artist-song"
              onClick={() => playSong(songIndex)}
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

          );

        })}

      </div>

      {/* Albums */}

      <div className="artist-section">

        <h2>Albums</h2>

        <div className="artist-albums">

          {artistAlbums.map((album) => (

            <div
              key={album.id}
              className="artist-album-card"
            >

              <img
                src={album.image}
                alt={album.title}
              />

              <h4>{album.title}</h4>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Artist;