import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchData";
import { genres } from "./data";
import AudioPlayer from "./Player/AudioPlayer";
import Header from "./components/UI/Header";
import ShowDetail from "./pages/ShowDetail";
import Home from "./pages/Home";
import Style from "./App.module.css";

/**
 * Root component of the Podcast Explorer app.
 * Handles data fetching and layout composition.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      <Header />
      <PodcastProvider initialPodcasts={podcasts} loading={loading} error={error} genres={genres}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <AudioPlayer />
        
      </PodcastProvider>
    </>
  );
}