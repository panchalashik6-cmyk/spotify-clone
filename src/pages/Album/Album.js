import React from "react";
import { useParams } from "react-router-dom";

import albums from "../../data/albums";
import songs from "../../data/songs";

import SongCard from "../../components/SongCard/SongCard";
import "./Album.css";

const Album = () => {
  const { id } = useParams();

  const album = albums.find(
    (item) => item.id === Number(id)
  );

  if (!album) {
    return (
      <div className="album-page">
        <h2 style={{ color: "white" }}>
          Album Not Found
        </h2>
      </div>
    );
  }

  const albumSongs = songs.filter((song) =>
    album.songs.includes(song.id)
  );

  return (
    <div className="album-page">

      <div className="album-header">

        <img
          src={album.image}
          alt={album.title}
          className="album-cover"
        />

        <div>

          <h1>{album.title}</h1>

          <p>{album.artist}</p>

          <p>{albumSongs.length} Songs</p>

        </div>

      </div>

      <div className="album-song-list">

        {albumSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
          />
        ))}

      </div>

    </div>
  );
};

export default Album;