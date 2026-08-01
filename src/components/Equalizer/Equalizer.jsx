import React from "react";
import "./Equalizer.css";
import { usePlayer } from "../../context/PlayerContext";

const Equalizer = () => {
  const { isPlaying } = usePlayer();

  return (
    <div className={`equalizer ${isPlaying ? "playing" : ""}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Equalizer;