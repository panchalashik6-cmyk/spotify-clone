import React, { useState } from "react";
import "./Playlist.css";
import { usePlayer } from "../../context/PlayerContext";
import SongCard from "../../components/SongCard/SongCard";

const Playlist = () => {
  const {
    playlists,
    createPlaylist,
    removeSongFromPlaylist,
  } = usePlayer();

  const [playlistName, setPlaylistName] = useState("");

  const handleCreate = () => {
    if (!playlistName.trim()) return;

    createPlaylist(playlistName);
    setPlaylistName("");
  };

  return (
    <div className="playlist-page">

      <h1>Your Playlists</h1>

      <div className="playlist-create">

        <input
          type="text"
          placeholder="Enter Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />

        <button onClick={handleCreate}>
          Create Playlist
        </button>

      </div>

      {playlists.map((playlist) => (

        <div className="playlist-box" key={playlist.id}>

          <div className="playlist-header">

            <h2>{playlist.name}</h2>

            <span>
              {playlist.songs.length} Songs
            </span>

          </div>

          {playlist.songs.length === 0 ? (

            <div className="empty-playlist">
              No songs in this playlist.
            </div>

          ) : (

            playlist.songs.map((song) => (

              <div key={song.id} className="playlist-song">

                <SongCard song={song} />

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeSongFromPlaylist(
                      playlist.id,
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

      ))}

    </div>
  );
};

export default Playlist;