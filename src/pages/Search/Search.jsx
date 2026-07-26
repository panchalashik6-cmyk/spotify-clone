import React, { useState } from "react";
import "./Search.css";

import songs from "../../data/songs";
import SongCard from "../../components/SongCard/SongCard";

const Search = () => {
  const [search, setSearch] = useState("");

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-page">

      <h1>Search</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search songs or artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="search-result">

        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
            />
          ))
        ) : (
          <div className="no-result">
            <h2>No Songs Found 🎵</h2>
          </div>
        )}

      </div>

    </div>
  );
};

export default Search;