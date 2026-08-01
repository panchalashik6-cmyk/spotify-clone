import React, { useState } from "react";
import "./CreatePlaylist.css";
import { FaTimes } from "react-icons/fa";
import { usePlayer } from "../../context/PlayerContext";

const CreatePlaylist = ({ onClose }) => {
  const [playlistName, setPlaylistName] = useState("");

  const { createPlaylist } = usePlayer();

  const handleCreate = () => {
    if (!playlistName.trim()) return;

    createPlaylist(playlistName);

    setPlaylistName("");

    onClose();
  };

  return (
    <div className="playlist-modal">

      <div className="playlist-box">

        <button
          className="close-btn"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2>Create Playlist</h2>

        <input
          type="text"
          placeholder="Enter Playlist Name"
          value={playlistName}
          onChange={(e) =>
            setPlaylistName(e.target.value)
          }
        />

        <button
          className="create-btn"
          onClick={handleCreate}
        >
          Create Playlist
        </button>

      </div>

    </div>
  );
};

export default CreatePlaylist;