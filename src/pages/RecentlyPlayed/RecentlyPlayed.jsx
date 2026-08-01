import React from "react";
import "./RecentlyPlayed.css";
import { usePlayer } from "../../context/PlayerContext";

const RecentlyPlayed = () => {

  const {
    recentSongs,
    songs,
    playSong,
  } = usePlayer();

  const handlePlay = (song) => {

    const index = songs.findIndex(
      (item) => item.id === song.id
    );

    if (index !== -1) {
      playSong(index);
    }

  };

  return (
    <div className="recent-section">

      <h2>Recently Played</h2>

      {recentSongs.length === 0 ? (

        <div className="empty-recent">
          <p>No recently played songs.</p>
        </div>

      ) : (

        <div className="recent-grid">

          {recentSongs.map((song) => (

            <div
              key={song.id}
              className="recent-card"
              onClick={() => handlePlay(song)}
            >

              <img
                src={song.image}
                alt={song.title}
              />

              <h4>{song.title}</h4>

              <p>{song.artist}</p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default RecentlyPlayed;