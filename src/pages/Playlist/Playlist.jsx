import React, { useState } from "react";
import "./Playlist.css";
import { usePlayer } from "../../context/PlayerContext";
import { FaPlay, FaMusic } from "react-icons/fa";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";

const Playlist = () => {

  const {
    playlists,
    songs,
    playSong,
    removeSongFromPlaylist,
  } = usePlayer();

  const [showPopup, setShowPopup] = useState(false);

  const playSelectedSong = (song) => {

    const index = songs.findIndex(
      (item) => item.id === song.id
    );

    if (index !== -1) {
      playSong(index);
    }

  };

  return (
    <div className="playlist-page">

      <div className="playlist-top">

        <h1>My Playlists</h1>

        <button
          className="new-playlist-btn"
          onClick={() => setShowPopup(true)}
        >
          + New Playlist
        </button>

      </div>

      {playlists.map((playlist) => (

        <div
          className="playlist-card"
          key={playlist.id}
        >

          <div className="playlist-header">

            <div>

              <h2>{playlist.name}</h2>

              <p>{playlist.songs.length} Songs</p>

            </div>

            {playlist.songs.length > 0 && (

              <button
                className="playlist-play-btn"
                onClick={() =>
                  playSelectedSong(
                    playlist.songs[0]
                  )
                }
              >
                <FaPlay />
              </button>

            )}

          </div>

          {playlist.songs.length === 0 ? (

            <div className="empty-playlist">

              <FaMusic />

              <p>No songs in this playlist</p>

            </div>

          ) : (

            playlist.songs.map((song, index) => (

              <div
                className="playlist-song"
                key={song.id}
              >

                <div
                  className="playlist-song-info"
                  onClick={() =>
                    playSelectedSong(song)
                  }
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

      {showPopup && (
        <CreatePlaylist
          onClose={() =>
            setShowPopup(false)
          }
        />
      )}

    </div>
  );
};

export default Playlist;