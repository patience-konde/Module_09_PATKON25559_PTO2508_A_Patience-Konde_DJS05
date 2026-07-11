import { useAudio } from "../../context/AudioContext";
import styles from "./ResetProgress.module.css";

export default function ResetProgress() {
  const { currentEpisode, resetAudio } = useAudio();

  // Don't show button if nothing is playing
  if (!currentEpisode) return null;

  return (
    <button
      type="button"
      className={styles.resetButton}
      onClick={resetAudio}
    >
      Reset Progress
    </button>
  );
}