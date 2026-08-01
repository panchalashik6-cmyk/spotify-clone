import React, { useState } from "react";
import "./Search.css";

import songs from "../../data/songs";
import albums from "../../data/albums";
import artists from "../../data/artists";

import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

const Search = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { playSong } = usePlayer();

  const filteredSongs = songs.filter(
    (song) =>
      song.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      song.artist
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const filteredAlbums = albums.filter(
    (album) =>
      album.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="search-page">

      <input
        type="text"
        placeholder="Search Songs, Albums, Artists..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Songs */}

      <h2>Songs</h2>

      <div className="search-grid">

        {filteredSongs.map((song) => (

          <div
            key={song.id}
            className="search-card"
            onClick={() => playSong(song.id)}
          >

            <img src={song.image} alt={song.title} />

            <h4>{song.title}</h4>

            <p>{song.artist}</p>

          </div>

        ))}

      </div>

      {/* Albums */}

      <h2>Albums</h2>

      <div className="search-grid">

        {filteredAlbums.map((album) => (

          <div
            key={album.id}
            className="search-card"
            onClick={() => navigate(`/album/${album.id}`)}
          >

            <img src={album.image} alt={album.title} />

            <h4>{album.title}</h4>

            <p>{album.artist}</p>

          </div>

        ))}

      </div>

      {/* Artists */}

      <h2>Artists</h2>

      <div className="search-grid">

        {filteredArtists.map((artist) => (

          <div
            key={artist.id}
            className="search-card"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >

            <img src={artist.image} alt={artist.name} />

            <h4>{artist.name}</h4>

            <p>Artist</p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Search;