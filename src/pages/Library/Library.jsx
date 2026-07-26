import React from "react";
import "./Library.css";
import { usePlayer } from "../../context/PlayerContext";
import SongCard from "../../components/SongCard/SongCard";

const Library = () => {
  const { likedSongs, recentSongs } = usePlayer();

  return (
    <div className="library">

      <div className="library-section">
        <h2>❤️ Liked Songs</h2>

        {likedSongs.length > 0 ? (
          likedSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
            />
          ))
        ) : (
          <div className="empty-box">
            <h3>No Liked Songs</h3>
            <p>Tap the ❤️ icon to like your favorite songs.</p>
          </div>
        )}
      </div>

      <div className="library-section">
        <h2>🕒 Recently Played</h2>

        {recentSongs.length > 0 ? (
          recentSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
            />
          ))
        ) : (
          <div className="empty-box">
            <h3>No Recently Played Songs</h3>
            <p>Play a song to see it here.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Library;