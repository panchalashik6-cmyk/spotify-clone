import { useRef, useState, useEffect } from "react";

const useAudio = (songs) => {
  const audioRef = useRef(new Audio());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Current Song
  const currentSong = songs[currentIndex];

  // Load Song
  useEffect(() => {
    if (!currentSong) return;

    audioRef.current.src = currentSong.audio;

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  // Play
  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Pause
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Toggle
  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  // Next Song
  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  // Previous Song
  const prevSong = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  };

  // Change Song
  const selectSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // Update Time
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return {
    currentSong,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    togglePlay,
    nextSong,
    prevSong,
    selectSong,
    audioRef,
  };
};

export default useAudio;