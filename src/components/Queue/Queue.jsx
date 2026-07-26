import React from "react";
import "./Queue.css";
import { usePlayer } from "../../context/PlayerContext";

const Queue = () => {
  const { queue, songs, playSong } = usePlayer();

  return (
    <div className="queue">
      <h2>Up Next</h2>

      {queue.length === 0 ? (
        <p>No songs in queue.</p>
      ) : (
        queue.map((song) => (
          <div
            key={song.id}
            className="queue-item"
            onClick={() =>
              playSong(
                songs.findIndex((item) => item.id === song.id)
              )
            }
          >
            <img src={song.image} alt={song.title} />

            <div>
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Queue;