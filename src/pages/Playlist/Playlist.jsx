import React, { useState } from "react";
import "./Playlist.css";
import { usePlayer } from "../../context/PlayerContext";
import SongCard from "../../components/SongCard/SongCard";
import { useParams } from "react-router-dom";

const Playlist = () => {
  const {
    playlists,
    createPlaylist,
    removeSongFromPlaylist,
  } = usePlayer();

  const { id } = useParams();

  const [playlistName, setPlaylistName] = useState("");

  const handleCreate = () => {
    if (!playlistName.trim()) return;

    createPlaylist(playlistName);
    setPlaylistName("");
  };

  const selectedPlaylist = id
    ? playlists.find((playlist) => playlist.id === Number(id))
    : null;

  // ==========================
  // SINGLE PLAYLIST PAGE
  // ==========================

  if (selectedPlaylist) {
    return (
      <div className="playlist-page">

        <div className="playlist-banner">

          <div className="playlist-cover">
            🎵
          </div>

          <div>

            <small>PLAYLIST</small>

            <h1>{selectedPlaylist.name}</h1>

            <p>{selectedPlaylist.songs.length} Songs</p>

          </div>

        </div>

        {selectedPlaylist.songs.length === 0 ? (

          <div className="empty-playlist">
            No songs in this playlist.
          </div>

        ) : (

          selectedPlaylist.songs.map((song) => (

            <div
              className="playlist-song"
              key={song.id}
            >

              <SongCard song={song} />

              <button
                className="remove-btn"
                onClick={() =>
                  removeSongFromPlaylist(
                    selectedPlaylist.id,
                    song.id
                  )
                }
              >
                Remove
              </button>

            </div>

          ))

        )}

      </div>
    );
  }

  // ==========================
  // ALL PLAYLISTS PAGE
  // ==========================

  return (
    <div className="playlist-page">

      <h1>Your Playlists</h1>

      <div className="playlist-create">

        <input
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) =>
            setPlaylistName(e.target.value)
          }
        />

        <button onClick={handleCreate}>
          Create
        </button>

      </div>

      {playlists.length === 0 ? (

        <div className="empty-playlist">
          No Playlist Found
        </div>

      ) : (

        playlists.map((playlist) => (

          <div
            className="playlist-box"
            key={playlist.id}
          >

            <div className="playlist-header">

              <h2>{playlist.name}</h2>

              <span>
                {playlist.songs.length} Songs
              </span>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default Playlist;