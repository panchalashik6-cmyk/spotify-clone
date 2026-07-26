import albums from "./albums";

// Recently Played (1-5)
export const recentlyPlayed = albums.slice(0, 5);

// Popular Albums (6-10)
export const popularAlbums = albums.slice(5, 10);

// Made For You (11-15)
export const madeForYou = albums.slice(10, 15);

// New Releases (16-20)
export const newReleases = albums.slice(15, 20);