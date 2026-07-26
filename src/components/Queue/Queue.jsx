import React from "react";
import "./Queue.css";
import { FaMusic } from "react-icons/fa";
import { usePlayer } from "../../context/PlayerContext";

const Queue = () => {
  const {
    queue,
    songs,
    currentSong,
    playSong,
  } = usePlayer();

  return (
    <div className="queue">

      <div className="queue-header">
        <h2>Up Next</h2>
        <span>{queue.length} Songs</span>
      </div>

      {queue.length === 0 ? (

        <div className="queue-empty">
          <FaMusic className="empty-icon" />
          <h3>Queue is Empty</h3>
          <p>Play any song to build your queue.</p>
        </div>

      ) : (

        queue.map((song, index) => {

          const isActive =
            currentSong?.id === song.id;

          return (

            <div
              key={song.id}
              className={`queue-item ${
                isActive ? "active-song" : ""
              }`}
              onClick={() =>
                playSong(
                  songs.findIndex(
                    (item) => item.id === song.id
                  )
                )
              }
            >

              <span className="queue-number">
                {index + 1}
              </span>

              <img
                src={song.image}
                alt={song.title}
              />

              <div className="queue-info">

                <h4>{song.title}</h4>

                <p>{song.artist}</p>

              </div>

            </div>

          );

        })

      )}

    </div>
  );
};

export default Queue;