import React,{
  useRef,
  useEffect,
  useState,
  useCallback
} from "react";
import "./MusicPlayer.css";

import{
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedo,
  FaHeart,
  FaRegHeart,
  FaVolumeUp
}from "react-icons/fa";

import{
  MdQueueMusic
}from "react-icons/md";

import{
  useNavigate
}from "react-router-dom";

import{
  usePlayer
}from "../../context/PlayerContext";

import Equalizer from "../Equalizer/Equalizer";

const MusicPlayer=()=>{

const navigate=useNavigate();

const audioRef=useRef(null);

const{

currentSong,
currentIndex,

isPlaying,
isShuffle,
isRepeat,

likedSongs,

playSong,
pauseSong,

nextSong,
previousSong,

toggleShuffle,
toggleRepeat,

toggleLike

}=usePlayer();

const[progress,setProgress]=useState(0);

const[currentTime,setCurrentTime]=useState("0:00");

const[duration,setDuration]=useState("0:00");

const[volume,setVolume]=useState(80);

const liked=currentSong&&likedSongs.some(
song=>song.id===currentSong.id
);

// ======================
// FORMAT TIME
// ======================

const formatTime=(time)=>{

if(!time)return"0:00";

const min=Math.floor(time/60);

const sec=Math.floor(time%60);

return`${min}:${sec<10?"0":""}${sec}`;

};

// ======================
// PLAY / PAUSE
// ======================

const togglePlay = useCallback(() => {

  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    pauseSong();
  } else {
    playSong(currentIndex);
  }

}, [isPlaying, pauseSong, playSong, currentIndex]);
// ======================
// AUTO PLAY
// ======================

useEffect(()=>{

if(!audioRef.current)return;

if(isPlaying){

audioRef.current.play().catch(()=>{});

}else{

audioRef.current.pause();

}

},[currentSong,isPlaying]);

// ======================
// UPDATE PROGRESS
// ======================

useEffect(()=>{

const audio=audioRef.current;

if(!audio)return;

const update=()=>{

if(!audio.duration)return;

setProgress(
(audio.currentTime/audio.duration)*100
);

setCurrentTime(
formatTime(audio.currentTime)
);

setDuration(
formatTime(audio.duration)
);

};

audio.addEventListener(
"timeupdate",
update
);

audio.onended=()=>{

nextSong();

};

return()=>{

audio.removeEventListener(
"timeupdate",
update
);

audio.onended=null;

};

},[currentSong,nextSong]);

// ======================
// SEEK
// ======================

const handleSeek=(e)=>{

const value=Number(e.target.value);

setProgress(value);

audioRef.current.currentTime=
(value/100)*audioRef.current.duration;

};

// ======================
// VOLUME
// ======================

const handleVolume=(e)=>{

const value=Number(e.target.value);

setVolume(value);

if(audioRef.current){

audioRef.current.volume=value/100;

}

};
  // ======================
  // INITIAL VOLUME
  // ======================

 useEffect(() => {

  if (audioRef.current) {
    audioRef.current.volume = volume / 100;
  }

}, [volume]);
  // ======================
  // KEYBOARD SHORTCUTS
  // ======================

 useEffect(() => {

  const handleKey = (e) => {

    if (
      e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA"
    ) {
      return;
    }

    switch (e.code) {

      case "Space":
        e.preventDefault();
        togglePlay();
        break;

      case "ArrowRight":
        nextSong();
        break;

      case "ArrowLeft":
        previousSong();
        break;

      default:
        break;

    }

  };

  window.addEventListener("keydown", handleKey);

  return () => {
    window.removeEventListener("keydown", handleKey);
  };

}, [
  togglePlay,
  nextSong,
  previousSong,
]);
  // ======================
  // NO SONG
  // ======================

  if (!currentSong) return null;

  return (

    <div className="music-player">

      <audio
        ref={audioRef}
        src={currentSong.audio}
        preload="metadata"
      />

      {/* ======================
          LEFT SECTION
      ====================== */}

      <div className="player-left">

        <div
          className={`album-cover ${
            isPlaying
              ? "cover-playing"
              : ""
          }`}
          onClick={() => {

            if (currentSong.albumId) {

              navigate(
                `/album/${currentSong.albumId}`
              );

            }

          }}
        >

          <img
            src={currentSong.image}
            alt={currentSong.title}
            className={`song-image ${
              isPlaying
                ? "playing"
                : ""
            }`}
          />

          <div className="album-glow"></div>

        </div>

        <div className="song-details">

          <h4 title={currentSong.title}>
            {currentSong.title}
          </h4>

          <p
            className="artist-link"
            onClick={() => {

              if (currentSong.artistId) {

                navigate(
                  `/artist/${currentSong.artistId}`
                );

              }

            }}
          >
            {currentSong.artist}
          </p>

          {isPlaying && (

            <div className="playing-status">

              <Equalizer />

              <span>
                Now Playing
              </span>

            </div>

          )}

        </div>

      </div>

      {/* ======================
          CENTER SECTION
      ====================== */}

      <div className="player-center">

        <div className="controls">

          <FaRandom
            className={`control-icon ${
              isShuffle
                ? "active-btn"
                : ""
            }`}
            onClick={toggleShuffle}
          />

          <FaStepBackward
            className="control-icon"
            onClick={previousSong}
          />

         <button
  className="play-btn"
  onClick={togglePlay}
>
  {isPlaying ? (
    <FaPause size={20} color="#000000" />
  ) : (
    <FaPlay
      size={20}
      color="#000000"
      style={{ marginLeft: "2px" }}
    />
  )}
</button>
          <FaStepForward
            className="control-icon"
            onClick={nextSong}
          />

          <FaRedo
            className={`control-icon ${
              isRepeat
                ? "active-btn"
                : ""
            }`}
            onClick={toggleRepeat}
          />

        </div>
                {/* ======================
            PROGRESS BAR
        ====================== */}

        <div className="progress">

          <span>{currentTime}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className="progress-slider"
            onChange={handleSeek}
            style={{
              background: `linear-gradient(
                to right,
                #1DB954 ${progress}%,
                #4d4d4d ${progress}%
              )`,
            }}
          />

          <span>{duration}</span>

        </div>

      </div>

      {/* ======================
          RIGHT SECTION
      ====================== */}

      <div className="player-right">

        {/* LIKE */}

        <button
          className={`icon-btn ${
            liked ? "liked-btn" : ""
          }`}
          onClick={() => toggleLike(currentSong)}
          title="Like Song"
        >

          {liked ? (

            <FaHeart className="liked-icon" />

          ) : (

            <FaRegHeart />

          )}

        </button>

        {/* QUEUE */}

        <button
          className="icon-btn"
          onClick={() => navigate("/queue")}
          title="Queue"
        >

          <MdQueueMusic />

        </button>

        {/* LYRICS */}

        <button
          className="lyrics-btn"
          onClick={() => navigate("/lyrics")}
        >

          Lyrics

        </button>

        {/* VOLUME */}

        <div className="volume-box">

          <FaVolumeUp className="volume-icon" />

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            className="volume-slider"
            onChange={handleVolume}
            style={{
              background: `linear-gradient(
                to right,
                #1DB954 ${volume}%,
                #4d4d4d ${volume}%
              )`,
            }}
          />

        </div>

      </div>

    </div>

  );

};

export default MusicPlayer;