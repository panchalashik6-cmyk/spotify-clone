import React from "react";
import "./Lyrics.css";

import lyricsData from "../../data/lyrics";
import { usePlayer } from "../../context/PlayerContext";

const Lyrics = () => {
  const { currentSong, playSong } = usePlayer();

  if (!currentSong) {
    return (
      <div className="lyrics-page">
        <div className="no-lyrics">
          <h2>No Song Playing</h2>
          <p>Please play a song first.</p>
        </div>
      </div>
    );
  }

  const songLyrics = lyricsData.find(
    (item) => item.songId === currentSong.id
  );

  return (
    <div className="lyrics-page">
      {/* Header */}

      <div className="lyrics-header">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="lyrics-cover"
        />

        <div className="lyrics-info">
          <h1>{currentSong.title}</h1>

          <p>{currentSong.artist}</p>

          <button
            className="play-btn"
            onClick={() => playSong(currentSong.id)}
          >
            ▶ Play
          </button>
        </div>
      </div>

      {/* Lyrics */}

      {songLyrics ? (
        <div className="lyrics-box">
          {songLyrics.lyrics}
        </div>
      ) : (
        <div className="no-lyrics">
          <h2>Lyrics Not Available</h2>
          <p>
            Lyrics for this song have not been added yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Lyrics;