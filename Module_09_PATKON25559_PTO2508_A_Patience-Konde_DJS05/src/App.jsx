import { useEffect, useState } from "react";
import {browserRouter as Router, Route, Routes} from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchData";
import { genres } from "./data";
import Header from "./components/UI/Header";
import SearchBar from "./components/Filters/SearchBar";
import SortSelect from "./components/Filters/SortSelect";
import GenreFilter from "./components/Filters/GenreFilter";
import PodcastGrid from "./components/Podcasts/PodcastGrid";
import Pagination from "./components/UI/Pagination";
import ShowDetail from "./pages/ShowDetail";
import Home from "./pages/Home";
import PodcasTDetail from "./components/Podcasts/PodcastDetail";
import styles from "./App.module.css";

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
    <PodcastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </PodcastProvider>
  </>
);
}