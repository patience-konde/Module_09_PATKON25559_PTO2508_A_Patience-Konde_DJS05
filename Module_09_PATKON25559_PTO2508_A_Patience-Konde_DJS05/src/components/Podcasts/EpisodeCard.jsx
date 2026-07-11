import React from "react";
import { useAudio } from "../../context/AudioContext";
import styles from "./EpisodeCard.module.css";

function EpisodeCard({ episode, show }) {
  const { playEpisode } = useAudio();

  const handlePlay = () => {
    playEpisode({
      id: episode.id,
      title: episode.title,
      description: episode.description,
      audio: episode.file,
      image: show.image,
      showTitle: show.title,
    });
  };

  return (
    <article className={styles.episodeCard}>
      <div className={styles.episodeInfo}>
        <h3>{episode.title}</h3>

        <p className={styles.description}>
          {episode.description}
        </p>

        <span className={styles.duration}>
          Duration: {episode.duration || "Unknown"}
        </span>
      </div>

      <button
        className={styles.playButton}
        onClick={handlePlay}
      >
        ▶ Play
      </button>
    </article>
  );
}

export default EpisodeCard;