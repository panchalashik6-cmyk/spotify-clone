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
  return (
    <div className="home">

      {/* Header */}
      <div className="home-header">
        <h1 className="home-title">
          Good Afternoon 👋
        </h1>

        <p className="home-subtitle">
          Welcome back! Enjoy your favorite music.
        </p>
      </div>

      {/* Quick Access */}
      <div className="quick-access">

        <div className="quick-card">
          ❤️
          <h3>Liked Songs</h3>
        </div>

        <div className="quick-card">
          🎧
          <h3>Daily Mix 1</h3>
        </div>

        <div className="quick-card">
          🔥
          <h3>Top Hits</h3>
        </div>

        <div className="quick-card">
          🎵
          <h3>Discover Weekly</h3>
        </div>

        <div className="quick-card">
          🎤
          <h3>Punjabi Hits</h3>
        </div>

        <div className="quick-card">
          💿
          <h3>Latest Albums</h3>
        </div>

      </div>

      {/* Recently Played */}
      <section className="section">

        <div className="section-header">
          <h2>Recently Played</h2>
          <span>Show all</span>
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

      {/* Popular Artists */}
      <section className="section">

        <div className="section-header">
          <h2>Popular Artists</h2>
          <span>Show all</span>
        </div>

        <div className="album-list">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              image={artist.image}
              name={artist.name}
            />
          ))}
        </div>

      </section>

      {/* Popular Albums */}
      <section className="section">

        <div className="section-header">
          <h2>Popular Albums</h2>
          <span>Show all</span>
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

      {/* Made For You */}
      <section className="section">

        <div className="section-header">
          <h2>Made For You</h2>
          <span>Show all</span>
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

      {/* New Releases */}
      <section className="section">

        <div className="section-header">
          <h2>New Releases</h2>
          <span>Show all</span>
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

      {/* Top Songs */}
      <section className="section">

        <div className="section-header">
          <h2>Top Songs</h2>
          <span>Show all</span>
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