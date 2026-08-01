import albums from "./albums";

// Recently Played
export const recentlyPlayed = albums.slice(0, 5);

// Popular Albums
export const popularAlbums = albums.slice(5, 10);

// Made For You
export const madeForYou = albums.slice(0, 5);

// New Releases
export const newReleases = albums.slice(5, 10);