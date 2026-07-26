import songs from "../data/songs";
import useAudio from "./useAudio";

const usePlayer = () => {

  const player = useAudio(songs);

  return {
    ...player,
    songs,
  };

};

export default usePlayer;