import { useAudio } from "../context/AudioContext";
import styles from "./PlayerControls.module.css";

export default function PlayerControls() {
  const {
    isPlaying,
    togglePlay,
  } = useAudio();

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.playButton}
        onClick={togglePlay}
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
    </div>
  );
}