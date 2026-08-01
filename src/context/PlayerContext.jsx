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
  // Shuffle
  // ==========================

  const [isShuffle, setIsShuffle] = useState(() => {
    const saved = localStorage.getItem("shuffle");
    return saved ? JSON.parse(saved) : false;
  });

  // ==========================
  // Repeat
  // ==========================

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
  // Favorite Artists
  // ==========================

  const [favoriteArtists, setFavoriteArtists] = useState(() => {
    const saved = localStorage.getItem("favoriteArtists");
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

  // ==========================
  // Current Song Object
  // ==========================

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
      "favoriteArtists",
      JSON.stringify(favoriteArtists)
    );
  }, [favoriteArtists]);

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

  // ==========================
  // Play Song (Index Based)
  // ==========================

  const playSong = (index) => {

    if (
      index < 0 ||
      index >= allSongs.length
    ) {
      return;
    }

    // Same song
    if (index === currentIndex) {
      setIsPlaying(true);
      return;
    }

    setCurrentIndex(index);
    setIsPlaying(true);

    const song = allSongs[index];

    // Recently Played
    setRecentSongs((prev) => {

      const filtered = prev.filter(
        (item) => item.id !== song.id
      );

      return [song, ...filtered].slice(0, 20);

    });

    // Queue
    const nextQueue = [
      ...allSongs.slice(index + 1),
      ...allSongs.slice(0, index),
    ];

    setQueue(nextQueue);
  };
    // ==========================
  // Pause Song
  // ==========================

  const pauseSong = () => {
    setIsPlaying(false);
  };

  // ==========================
  // Toggle Play / Pause
  // ==========================

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // ==========================
  // Next Song
  // ==========================

  const nextSong = () => {

    // Repeat Current Song
    if (isRepeat) {
      playSong(currentIndex);
      return;
    }

    // Shuffle Mode
    if (isShuffle) {

      const randomIndex = Math.floor(
        Math.random() * allSongs.length
      );

      playSong(randomIndex);
      return;
    }

    // Normal Next Song
    const nextIndex =
      (currentIndex + 1) % allSongs.length;

    playSong(nextIndex);
  };

  // ==========================
  // Previous Song
  // ==========================

  const previousSong = () => {

    const prevIndex =
      currentIndex === 0
        ? allSongs.length - 1
        : currentIndex - 1;

    playSong(prevIndex);
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

      setLikedSongs((prev) =>
        prev.filter(
          (item) => item.id !== song.id
        )
      );

    } else {

      setLikedSongs((prev) => [
        ...prev,
        song,
      ]);

    }

  };

  // ==========================
  // Follow Artist
  // ==========================

  const followArtist = (artist) => {

    const exists = favoriteArtists.find(
      (item) => item.id === artist.id
    );

    if (exists) return;

    setFavoriteArtists((prev) => [
      ...prev,
      artist,
    ]);

  };

  // ==========================
  // Unfollow Artist
  // ==========================

  const unfollowArtist = (artistId) => {

    setFavoriteArtists((prev) =>
      prev.filter(
        (artist) => artist.id !== artistId
      )
    );

  };

  // ==========================
  // Queue
  // ==========================

  const addToQueue = (song) => {

    setQueue((prev) => {

      const exists = prev.find(
        (item) => item.id === song.id
      );

      if (exists) return prev;

      return [...prev, song];

    });

  };

  const removeFromQueue = (songId) => {

    setQueue((prev) =>
      prev.filter(
        (song) => song.id !== songId
      )
    );

  };

  const clearQueue = () => {
    setQueue([]);
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

    setPlaylists((prev) => [
      ...prev,
      newPlaylist,
    ]);

  };

  // ==========================
  // Add Song To Playlist
  // ==========================

  const addSongToPlaylist = (
    playlistId,
    song
  ) => {

    setPlaylists((prev) =>
      prev.map((playlist) => {

        if (playlist.id !== playlistId)
          return playlist;

        const exists =
          playlist.songs.find(
            (item) => item.id === song.id
          );

        if (exists) return playlist;

        return {
          ...playlist,
          songs: [
            ...playlist.songs,
            song,
          ],
        };

      })
    );

  };

  // ==========================
  // Remove Song From Playlist
  // ==========================

  const removeSongFromPlaylist = (
    playlistId,
    songId
  ) => {

    setPlaylists((prev) =>
      prev.map((playlist) => {

        if (playlist.id !== playlistId)
          return playlist;

        return {
          ...playlist,
          songs: playlist.songs.filter(
            (song) => song.id !== songId
          ),
        };

      })
    );

  };

  // ==========================
  // Recently Played
  // ==========================

  const clearRecentHistory = () => {
    setRecentSongs([]);
  };

  // ==========================
  // Liked Songs
  // ==========================

  const clearLikedSongs = () => {
    setLikedSongs([]);
  };

  const isLiked = (songId) => {
    return likedSongs.some(
      (song) => song.id === songId
    );
  };

  // ==========================
  // Favorite Artists
  // ==========================

  const isFollowingArtist = (artistId) => {
    return favoriteArtists.some(
      (artist) => artist.id === artistId
    );
  };

  // ==========================
  // Queue Helpers
  // ==========================

  const clearQueueHistory = () => {
    setQueue([]);
  };

  const isInQueue = (songId) => {
    return queue.some(
      (song) => song.id === songId
    );
  };
    return (
    <PlayerContext.Provider
      value={{
        // ==========================
        // Songs
        // ==========================
        songs: allSongs,

        // ==========================
        // Current Song
        // ==========================
        currentSong,
        currentIndex,
        isPlaying,

        // ==========================
        // Player Controls
        // ==========================
        playSong,
        pauseSong,
        togglePlay,
        nextSong,
        previousSong,

        // ==========================
        // Shuffle & Repeat
        // ==========================
        isShuffle,
        isRepeat,
        toggleShuffle,
        toggleRepeat,

        // ==========================
        // Liked Songs
        // ==========================
        likedSongs,
        toggleLike,
        clearLikedSongs,
        isLiked,

        // ==========================
        // Favorite Artists
        // ==========================
        favoriteArtists,
        followArtist,
        unfollowArtist,
        isFollowingArtist,

        // ==========================
        // Recently Played
        // ==========================
        recentSongs,
        clearRecentHistory,

        // ==========================
        // Queue
        // ==========================
        queue,
        addToQueue,
        removeFromQueue,
        clearQueue,
        clearQueueHistory,
        isInQueue,

        // ==========================
        // Playlists
        // ==========================
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