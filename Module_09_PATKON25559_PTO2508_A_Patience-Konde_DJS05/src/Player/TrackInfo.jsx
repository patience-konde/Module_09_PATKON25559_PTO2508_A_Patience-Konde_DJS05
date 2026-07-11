import { useAudio } from "../context/AudioContext";
import styles from "./TrackInfo.module.css";

export default function TrackInfo() {
  const { currentEpisode } = useAudio();

  if (!currentEpisode) return null;

  return (
    <div className={styles.trackInfo}>
      <h3>
        {currentEpisode.title}
      </h3>

      {currentEpisode.description && (
        <p>
          {currentEpisode.description}
        </p>
      )}
    </div>
  );
}