import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);


  // Track audio progress
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (error) => {
      console.error("Audio error:", error);
      setIsPlaying(false);
    };


    audio.addEventListener(
      "timeupdate",
      updateProgress
    );

    audio.addEventListener(
      "loadedmetadata",
      updateDuration
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    audio.addEventListener(
      "error",
      handleError
    );


    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateProgress
      );

      audio.removeEventListener(
        "loadedmetadata",
        updateDuration
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      audio.removeEventListener(
        "error",
        handleError
      );
    };

  }, []);



  // Play selected episode
  const playEpisode = async (episode) => {
    const audio = audioRef.current;

    console.log("Selected episode:", episode);
    console.log("Audio source:", episode.audio);


    if (currentEpisode?.id !== episode.id) {

      audio.pause();

      audio.src = episode.audio;

      audio.load();

      setCurrentEpisode(episode);

      setCurrentTime(0);

      setDuration(0);
    }


    try {

      await audio.play();

      console.log("Audio started successfully");

      setIsPlaying(true);

    } catch (error) {

      console.error(
        "Audio playback failed:",
        error
      );

      setIsPlaying(false);
    }
  };



  // Pause audio
  const pauseEpisode = () => {

    audioRef.current.pause();

    setIsPlaying(false);

  };



  // Play / pause toggle
  const togglePlay = async () => {

    if (!currentEpisode) return;


    if (isPlaying) {

      pauseEpisode();

    } else {

      try {

        await audioRef.current.play();

        setIsPlaying(true);

      } catch (error) {

        console.error(
          "Toggle play failed:",
          error
        );

      }

    }

  };



  // Seek audio
  const seekAudio = (time) => {

    audioRef.current.currentTime = time;

    setCurrentTime(time);

  };



  // Volume control
  const changeVolume = (value) => {

    audioRef.current.volume = value;

    setVolume(value);

  };



  // Reset progress
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