import { useAudio } from "../context/AudioContext";
import styles from "./VolumeControl.module.css";

export default function VolumeControl() {
  const {
    volume,
    changeVolume,
  } = useAudio();

  return (
    <div className={styles.volumeControl}>
      <span>
        🔊
      </span>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(event) =>
          changeVolume(Number(event.target.value))
        }
        className={styles.volumeSlider}
      />
    </div>
  );
}