import "./SongTable.css";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";

const SongTable = ({
  songs,
  playSong,
  likedSongs = [],
  toggleLike,
}) => {
  return (
    <div className="song-table">

      <div className="song-table-header">

        <span>#</span>

        <span>TITLE</span>

        <span>ALBUM</span>

        <span>LIKE</span>

        <span>TIME</span>

      </div>

      {songs.map((song, index) => (

        <div
          key={song.id}
          className="song-row"
          onClick={() => playSong(song.id)}
        >

          <span className="song-number">
            {index + 1}
          </span>

          <div className="song-title">

            <img
              src={song.cover}
              alt={song.title}
            />

            <div>

              <h4>{song.title}</h4>

              <p>{song.artist}</p>

            </div>

          </div>

          <span className="song-album">
            {song.album}
          </span>

          <span
            className="song-like"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(song.id);
            }}
          >
            {likedSongs.includes(song.id)
              ? <FaHeart />
              : <FaRegHeart />}
          </span>

          <span className="song-time">
            {song.duration}
          </span>

          <button className="row-play">

            <FaPlay />

          </button>

        </div>

      ))}

    </div>
  );
};

export default SongTable;