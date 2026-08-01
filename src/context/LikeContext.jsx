// import React, { createContext, useContext, useEffect, useState } from "react";

// const LikeContext = createContext();

// export const LikeProvider = ({ children }) => {
//   const [likedSongs, setLikedSongs] = useState(() => {
//     return JSON.parse(localStorage.getItem("likedSongs")) || [];
//   });

//   useEffect(() => {
//     localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
//   }, [likedSongs]);

//   const toggleLike = (id) => {
//     if (likedSongs.includes(id)) {
//       setLikedSongs(likedSongs.filter((songId) => songId !== id));
//     } else {
//       setLikedSongs([...likedSongs, id]);
//     }
//   };

//   return (
//     <LikeContext.Provider
//       value={{ likedSongs, toggleLike }}
//     >
//       {children}
//     </LikeContext.Provider>
//   );
// };

// export const useLike = () => useContext(LikeContext);