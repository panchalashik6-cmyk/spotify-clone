import React, { useState } from "react";
import "./Search.css";

import { IoSearch } from "react-icons/io5";

import songs from "../../data/songs";
import SongCard from "../../components/SongCard/SongCard";

const Search = () => {

  const [search, setSearch] = useState("");

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [
    {
      id:1,
      title:"Music",
      icon:"🎵",
    },
    {
      id:2,
      title:"Albums",
      icon:"💿",
    },
    {
      id:3,
      title:"Artists",
      icon:"🎤",
    },
    {
      id:4,
      title:"Podcasts",
      icon:"🎙️",
    },
    {
      id:5,
      title:"Trending",
      icon:"🔥",
    },
    {
      id:6,
      title:"Liked Songs",
      icon:"❤️",
    },
  ];

  return (

    <div className="search-page">

      {/* Header */}

      <div className="search-header">

        <h1>Search</h1>

        <p>
          Find your favourite songs, artists and albums.
        </p>

      </div>

      {/* Search Box */}

      <div className="search-box">

        <IoSearch className="search-icon" />

        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      {/* Browse Categories */}

      {search === "" && (

        <>

          <h2 className="browse-title">
            Browse All
          </h2>

          <div className="browse-grid">

            {categories.map((item)=>(

              <div
                className="browse-card"
                key={item.id}
              >

                <span>
                  {item.icon}
                </span>

                <h3>
                  {item.title}
                </h3>

              </div>

            ))}

          </div>

        </>

      )}

            {/* ==========================
          SEARCH RESULTS
      ========================== */}

      {search !== "" && (

        <>

          <div className="result-header">

            <h2>
              Search Results
            </h2>

            <span>
              {filteredSongs.length} Result
              {filteredSongs.length !== 1 && "s"}
            </span>

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

                <div className="no-result-icon">
                  🎵
                </div>

                <h2>No Songs Found</h2>

                <p>
                  Try searching with a different song or artist name.
                </p>

              </div>

            )}

          </div>

        </>

      )}

    </div>

  );
};

export default Search;