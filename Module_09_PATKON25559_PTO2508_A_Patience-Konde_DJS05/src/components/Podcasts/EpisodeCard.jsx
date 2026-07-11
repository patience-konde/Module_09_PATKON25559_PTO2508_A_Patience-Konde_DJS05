import React from "react";
import { useAudio } from "../../context/AudioContext";
import styles from "./EpisodeCard.module.css";

function EpisodeCard({ episode, show }) {
  const { playEpisode, pauseEpisode, currentEpisode, isPlaying } = useAudio();

  const isCurrentEpisode =
    currentEpisode?.id === episode.id;

  const handlePlay = () => {
    console.log("Episode clicked:", episode);

    if (isCurrentEpisode && isPlaying) {
      pauseEpisode();
      return;
    }

    playEpisode({
      id: episode.id,
      title: episode.title,
      description: episode.description,
      audio:
  episode.file &&
  !episode.file.includes("placeholder")
    ? episode.file
    : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
   
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
        {isCurrentEpisode && isPlaying
          ? "⏸ Pause"
          : "▶ Play"}
      </button>

    </article>
  );
}

export default EpisodeCard;