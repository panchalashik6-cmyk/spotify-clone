import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import songs from "../data/songs";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {

  // ==========================
  // Songs
  // ==========================

  const [allSongs] = useState(songs);

  // ==========================
  // Current Song
  // ==========================

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem("currentSong");
    return saved ? Number(saved) : 0;
  });

  const [isPlaying, setIsPlaying] = useState(false);

  // ==========================
  // Shuffle & Repeat
  // ==========================

  const [isShuffle, setIsShuffle] = useState(() => {
    const saved = localStorage.getItem("shuffle");
    return saved ? JSON.parse(saved) : false;
  });

  const [isRepeat, setIsRepeat] = useState(() => {
    const saved = localStorage.getItem("repeat");
    return saved ? JSON.parse(saved) : false;
  });

  // ==========================
  // Liked Songs
  // ==========================

  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });

  // ==========================
  // Recently Played
  // ==========================

  const [recentSongs, setRecentSongs] = useState(() => {
    const saved = localStorage.getItem("recentSongs");
    return saved ? JSON.parse(saved) : [];
  });

  // ==========================
  // Queue
  // ==========================

  const [queue, setQueue] = useState([]);

  // ==========================
  // Playlists
  // ==========================

  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("playlists");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "My Favorites",
            songs: [],
          },
        ];
  });

  // Current Song

  const currentSong = allSongs[currentIndex];
  // ==========================
// Save Local Storage
// ==========================

useEffect(() => {
  localStorage.setItem("currentSong", currentIndex);
}, [currentIndex]);

useEffect(() => {
  localStorage.setItem(
    "likedSongs",
    JSON.stringify(likedSongs)
  );
}, [likedSongs]);

useEffect(() => {
  localStorage.setItem(
    "recentSongs",
    JSON.stringify(recentSongs)
  );
}, [recentSongs]);

useEffect(() => {
  localStorage.setItem(
    "playlists",
    JSON.stringify(playlists)
  );
}, [playlists]);

useEffect(() => {
  localStorage.setItem(
    "shuffle",
    JSON.stringify(isShuffle)
  );
}, [isShuffle]);

useEffect(() => {
  localStorage.setItem(
    "repeat",
    JSON.stringify(isRepeat)
  );
}, [isRepeat]);
const playSong = (index) => {

  if (index < 0 || index >= allSongs.length) return;

  setCurrentIndex(index);
  setIsPlaying(true);

  const song = allSongs[index];

  // Recently Played
  setRecentSongs((prev) => {

    const filtered = prev.filter(
      (item) => item.id !== song.id
    );

    return [song, ...filtered].slice(0, 10);

  });

  // Queue

  const nextQueue = [
    ...allSongs.slice(index + 1),
    ...allSongs.slice(0, index),
  ];

  setQueue(nextQueue);
};

// ==========================
// Pause
// ==========================
const pauseSong = () => {
  setIsPlaying(false);
};

// ==========================
// Next Song
// ==========================
const nextSong = () => {
  if (isRepeat) {
    playSong(currentIndex);
    return;
  }

  if (isShuffle) {
    const randomIndex = Math.floor(Math.random() * allSongs.length);
    playSong(randomIndex);
    return;
  }

  const next = (currentIndex + 1) % allSongs.length;
  playSong(next);
};

// ==========================
// Previous Song
// ==========================
const previousSong = () => {
  const prev =
    currentIndex === 0
      ? allSongs.length - 1
      : currentIndex - 1;

  playSong(prev);
};

// ==========================
// Shuffle
// ==========================
const toggleShuffle = () => {
  setIsShuffle((prev) => !prev);
};

// ==========================
// Repeat
// ==========================
const toggleRepeat = () => {
  setIsRepeat((prev) => !prev);
};

// ==========================
// Like Song
// ==========================
const toggleLike = (song) => {
  const exists = likedSongs.find(
    (item) => item.id === song.id
  );

  if (exists) {
    setLikedSongs(
      likedSongs.filter(
        (item) => item.id !== song.id
      )
    );
  } else {
    setLikedSongs([...likedSongs, song]);
  }
};

// ==========================
// Create Playlist
// ==========================
const createPlaylist = (name) => {
  if (!name.trim()) return;

  const newPlaylist = {
    id: Date.now(),
    name,
    songs: [],
  };

  setPlaylists((prev) => [...prev, newPlaylist]);
};

// ==========================
// Add Song To Playlist
// ==========================
const addSongToPlaylist = (playlistId, song) => {
  setPlaylists((prev) =>
    prev.map((playlist) => {
      if (playlist.id !== playlistId) {
        return playlist;
      }

      const exists = playlist.songs.find(
        (item) => item.id === song.id
      );

      if (exists) return playlist;

      return {
        ...playlist,
        songs: [...playlist.songs, song],
      };
    })
  );
};

// ==========================
// Remove Song From Playlist
// ==========================
const removeSongFromPlaylist = (playlistId, songId) => {
  setPlaylists((prev) =>
    prev.map((playlist) => {
      if (playlist.id !== playlistId) {
        return playlist;
      }

      return {
        ...playlist,
        songs: playlist.songs.filter(
          (song) => song.id !== songId
        ),
      };
    })
  );
};
return (
  <PlayerContext.Provider
    value={{
      // Songs
      songs: allSongs,

      // Current Song
      currentSong,
      currentIndex,
      isPlaying,

      // Player Controls
      playSong,
      pauseSong,
      nextSong,
      previousSong,

      // Shuffle & Repeat
      isShuffle,
      isRepeat,
      toggleShuffle,
      toggleRepeat,

      // Likes
      likedSongs,
      toggleLike,

      // Recently Played
      recentSongs,

      // Queue
      queue,

      // Playlists
      playlists,
      createPlaylist,
      addSongToPlaylist,
      removeSongFromPlaylist,
    }}
  >
    {children}
  </PlayerContext.Provider>
);
};

export const usePlayer = () => useContext(PlayerContext);