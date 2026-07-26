import React, { useRef, useEffect, useState } from "react";
import "./MusicPlayer.css";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaRandom,
  FaRedo,
} from "react-icons/fa";

import { usePlayer } from "../../context/PlayerContext";

const MusicPlayer = () => {
  const audioRef = useRef(null);

  const {
    songs,
    currentSong,
    currentIndex,
    isPlaying,

    isShuffle,
    isRepeat,

    playSong,
    pauseSong,
    nextSong,
    previousSong,

    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  // ==========================
  // Play / Pause
  // ==========================

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      pauseSong();
    } else {
      audioRef.current.play();
      playSong(currentIndex);
    }
  };

  // ==========================
  // Auto Play
  // ==========================

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  // ==========================
  // Progress
  // ==========================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;

      setProgress((audio.currentTime / audio.duration) * 100);

      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", nextSong);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", nextSong);
    };
  }, [currentSong, nextSong]);

  // ==========================
  // Time Format
  // ==========================

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // ==========================
  // Seek
  // ==========================

  const handleSeek = (e) => {
    if (!audioRef.current) return;

    const value = e.target.value;

    setProgress(value);

    audioRef.current.currentTime =
      (value / 100) * audioRef.current.duration;
  };

  // ==========================
  // Volume
  // ==========================

  const handleVolume = (e) => {
    if (!audioRef.current) return;

    audioRef.current.volume = e.target.value / 100;
  };

  return (
    <div className="music-player">

      <audio
        ref={audioRef}
        src={currentSong?.audio}
        preload="metadata"
      />

      {/* LEFT */}

      <div className="player-left">

        <img
          src={currentSong?.image}
          alt={currentSong?.title}
          className="song-image"
        />

        <div>
          <h4>{currentSong?.title}</h4>
          <p>{currentSong?.artist}</p>
        </div>

      </div>

      {/* CENTER */}

      <div className="player-center">

        <div className="controls">

          <FaRandom
            onClick={toggleShuffle}
            className={isShuffle ? "active-btn" : ""}
            style={{ cursor: "pointer" }}
          />

          <FaStepBackward
            onClick={previousSong}
            style={{ cursor: "pointer" }}
          />

          <button
            className="play-btn"
            onClick={togglePlay}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <FaStepForward
            onClick={nextSong}
            style={{ cursor: "pointer" }}
          />

          <FaRedo
            onClick={toggleRepeat}
            className={isRepeat ? "active-btn" : ""}
            style={{ cursor: "pointer" }}
          />

        </div>

        <div className="progress">

          <span>{currentTime}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
          />

          <span>{duration}</span>

        </div>

      </div>

      {/* RIGHT */}

      <div className="player-right">

        <FaVolumeUp />

        <input
          type="range"
          min="0"
          max="100"
          defaultValue="70"
          onChange={handleVolume}
        />

      </div>

    </div>
  );
};

export default MusicPlayer;