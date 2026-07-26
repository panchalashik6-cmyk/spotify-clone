import React from "react";
import "./Home.css";

import AlbumCard from "../../components/AlbumCard/AlbumCard";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import SongCard from "../../components/SongCard/SongCard";

import artists from "../../data/artists";
import songs from "../../data/songs";

import {
  recentlyPlayed,
  popularAlbums,
  madeForYou,
  newReleases,
} from "../../data/homeSections";

const Home = () => {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="home">

      {/* HEADER */}

      <div className="home-header">
        <h1 className="home-title">
          {greeting} 👋
        </h1>

        <p className="home-subtitle">
          Welcome back! Continue listening to your favourite music.
        </p>
      </div>

      {/* QUICK ACCESS */}

      <div className="quick-access">

        <div className="quick-card">
          <span>❤️</span>
          <h3>Liked Songs</h3>
        </div>

        <div className="quick-card">
          <span>🎧</span>
          <h3>Daily Mix 1</h3>
        </div>

        <div className="quick-card">
          <span>🔥</span>
          <h3>Top Hits</h3>
        </div>

        <div className="quick-card">
          <span>🎵</span>
          <h3>Discover Weekly</h3>
        </div>

        <div className="quick-card">
          <span>💻</span>
          <h3>Coding Mix</h3>
        </div>

        <div className="quick-card">
          <span>🎤</span>
          <h3>Punjabi Hits</h3>
        </div>

      </div>

      {/* RECENTLY PLAYED */}

      <section className="section">

        <div className="section-header">
          <h2>Recently Played</h2>
          <button className="show-btn">Show all</button>
        </div>

        <div className="album-list">

          {recentlyPlayed.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              image={album.image}
              title={album.title}
              artist={album.artist}
            />
          ))}

        </div>

      </section>

      {/* POPULAR ARTISTS */}

      <section className="section">

        <div className="section-header">
          <h2>Popular Artists</h2>
          <button className="show-btn">Show all</button>
        </div>

        <div className="album-list">

          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              image={artist.image}
              name={artist.name}
            />
          ))}

        </div>

      </section>

      {/* POPULAR ALBUMS */}

      <section className="section">

        <div className="section-header">
          <h2>Popular Albums</h2>
          <button className="show-btn">Show all</button>
        </div>

        <div className="album-list">

          {popularAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              image={album.image}
              title={album.title}
              artist={album.artist}
            />
          ))}

        </div>

      </section>

      {/* MADE FOR YOU */}

      <section className="section">

        <div className="section-header">
          <h2>Made For You</h2>
          <button className="show-btn">Show all</button>
        </div>

        <div className="album-list">

          {madeForYou.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              image={album.image}
              title={album.title}
              artist={album.artist}
            />
          ))}

        </div>

      </section>

      {/* NEW RELEASES */}

      <section className="section">

        <div className="section-header">
          <h2>New Releases</h2>
          <button className="show-btn">Show all</button>
        </div>

        <div className="album-list">

          {newReleases.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              image={album.image}
              title={album.title}
              artist={album.artist}
            />
          ))}

        </div>

      </section>

      {/* TOP SONGS */}

      <section className="section">

        <div className="section-header">
          <h2>Top Songs</h2>
          <button className="show-btn">Show all</button>
        </div>

        <div className="song-list">

          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
            />
          ))}

        </div>

      </section>

    </div>
  );
};

export default Home;