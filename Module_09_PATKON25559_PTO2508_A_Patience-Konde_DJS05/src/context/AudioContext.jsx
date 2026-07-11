import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  // Update progress while audio is playing
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  // Play episode
  const playEpisode = (episode) => {
    const audio = audioRef.current;

    if (currentEpisode?.id !== episode.id) {
      audio.src = episode.audio;
      setCurrentEpisode(episode);
      setCurrentTime(0);
    }

    audio.play();
    setIsPlaying(true);
  };

  // Pause episode
  const pauseEpisode = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentEpisode) return;

    if (isPlaying) {
      pauseEpisode();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Change progress manually
  const seekAudio = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Change volume
  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  // Stop and reset audio
  const resetAudio = () => {
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;

    setCurrentTime(0);
    setIsPlaying(false);
  };

  const value = {
    audioRef,
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    volume,

    playEpisode,
    pauseEpisode,
    togglePlay,
    seekAudio,
    changeVolume,
    resetAudio,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudio must be used inside an AudioProvider"
    );
  }

  return context;
}