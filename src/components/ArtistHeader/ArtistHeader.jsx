import "./ArtistHeader.css";
import { FaCheckCircle, FaPlay } from "react-icons/fa";

const ArtistHeader = ({ artist, isFollowing, onFollow, onPlay }) => {
  return (
    <div
      className="artist-header"
      style={{
        backgroundImage: `url(${artist.banner || artist.image})`,
      }}
    >
      <div className="artist-overlay">
        <img
          src={artist.image}
          alt={artist.name}
          className="artist-image"
        />

        <div className="verified">
          <FaCheckCircle />
          <span>Verified Artist</span>
        </div>

        <h1>{artist.name}</h1>

        <p>{artist.monthlyListeners} Monthly Listeners</p>

        <div className="artist-actions">
          <button
            className="play-btn"
            onClick={onPlay}
          >
            <FaPlay />
            Play
          </button>

          <button
            className={
              isFollowing
                ? "following-btn"
                : "follow-btn"
            }
            onClick={onFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;