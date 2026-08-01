import React from "react";
import "./Artist.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlay, FaCheckCircle } from "react-icons/fa";

import artists from "../../data/artists";
import songs from "../../data/songs";
import albums from "../../data/albums";

import { usePlayer } from "../../context/PlayerContext";
import FansAlsoLike from "../../components/FansAlsoLike/FansAlsoLike";

const Artist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    playSong,
    favoriteArtists,
    followArtist,
    unfollowArtist,
  } = usePlayer();

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

  const artistSongs = songs.filter(
    (song) => song.artist === artist.name
  );

  const artistAlbums = albums.filter(
    (album) => album.artist === artist.name
  );

  const isFollowing = favoriteArtists.some(
    (item) => item.id === artist.id
  );

  return (
    <div className="artist-page">

      {/* ================= HEADER ================= */}

      <div
        className="artist-header"
        style={{
          backgroundImage: `url(${artist.banner || artist.image})`,
        }}
      >
        <div className="artist-overlay">

          <div className="artist-profile">
            <img
              src={artist.image}
              alt={artist.name}
            />
          </div>

          <p className="verified">
            <FaCheckCircle />
            Verified Artist
          </p>

          <h1>{artist.name}</h1>

          <p className="listeners">
            {artist.monthlyListeners} Monthly Listeners
          </p>

          <div className="artist-buttons">

            <button
              className="artist-play-btn"
              onClick={() => {
                if (artistSongs.length > 0) {
                  const firstSongIndex = songs.findIndex(
                    (item) => item.id === artistSongs[0].id
                  );

                  if (firstSongIndex !== -1) {
                    playSong(firstSongIndex);
                  }
                }
              }}
            >
              <FaPlay />
              Play
            </button>

            <button
              className={
                isFollowing
                  ? "following-btn"
                  : "follow-btn"
              }
              onClick={() => {
                if (isFollowing) {
                  unfollowArtist(artist.id);
                } else {
                  followArtist(artist);
                }
              }}
            >
              {isFollowing
                ? "Following"
                : "Follow"}
            </button>

          </div>

        </div>
      </div>

      {/* ================= POPULAR SONGS ================= */}

      <div className="artist-section">

        <h2>Popular</h2>

        {artistSongs.length === 0 ? (

          <p>No Songs Found</p>

        ) : (

          artistSongs.map((song, index) => {

            const songIndex = songs.findIndex(
              (item) => item.id === song.id
            );

            return (

              <div
                key={song.id}
                className="artist-song"
                onClick={() => {
                  if (songIndex !== -1) {
                    playSong(songIndex);
                  }
                }}
              >

                <span className="song-number">
                  {index + 1}
                </span>

                <img
                  src={song.image}
                  alt={song.title}
                />

                <div className="artist-song-info">

                  <h4>{song.title}</h4>

                  <p>{song.album || "Single"}</p>

                </div>

                <span className="song-plays">
                  {song.plays || "--"}
                </span>

                <span className="song-duration">
                  {song.duration || "--:--"}
                </span>

              </div>

            );

          })

        )}

      </div>

      {/* ================= ALBUMS ================= */}

      <div className="artist-section">

        <h2>Albums</h2>

        <div className="artist-albums">

          {artistAlbums.length === 0 ? (

            <p>No Albums Found</p>

          ) : (

            artistAlbums.map((album) => (

              <div
                key={album.id}
                className="artist-album-card"
                onClick={() => navigate(`/album/${album.id}`)}
              >

                <img
                  src={album.image}
                  alt={album.title}
                />

                <h4>{album.title}</h4>

                <p>{album.year}</p>

              </div>

            ))

          )}

        </div>

      </div>

      {/* ================= ABOUT ================= */}

      <div className="artist-section">

        <h2>About</h2>

        <p className="artist-about">

          {artist.bio
            ? artist.bio
            : `${artist.name} is one of the most popular artists on Spotify. Listen to the latest songs, albums, and top hits from ${artist.name}.`
          }

        </p>

      </div>

      {/* ================= FANS ALSO LIKE ================= */}

      <FansAlsoLike
        artists={artists}
        currentArtistId={artist.id}
      />

    </div>
  );
};

export default Artist;