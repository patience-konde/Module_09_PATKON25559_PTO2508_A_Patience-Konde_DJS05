import { useAudio } from "../context/AudioContext";
import TrackInfo from "./TrackInfo";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import ResetProgress from "../components/UI/ResetProgress";

import styles from "./AudioPlayer.module.css";

export default function AudioPlayer() {
  const { currentEpisode } = useAudio();

  // Hide player until an episode is selected
  if (!currentEpisode) return null;

  return (
    <div className={styles.audioPlayer}>
      <TrackInfo />

      <PlayerControls />

      <ProgressBar />

      <VolumeControl />

      <ResetProgress />
    </div>
  );
}