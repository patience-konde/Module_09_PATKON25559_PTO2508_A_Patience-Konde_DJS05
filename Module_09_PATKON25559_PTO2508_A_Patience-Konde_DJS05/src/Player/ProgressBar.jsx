import { useAudio } from "../context/AudioContext";
import styles from "./ProgressBar.module.css";

export default function ProgressBar() {
  const {
    currentTime,
    duration,
    seekAudio,
  } = useAudio();

  const handleChange = (event) => {
    seekAudio(Number(event.target.value));
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.progressContainer}>
      <span>
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleChange}
        className={styles.progressBar}
      />

      <span>
        {formatTime(duration)}
      </span>
    </div>
  );
}