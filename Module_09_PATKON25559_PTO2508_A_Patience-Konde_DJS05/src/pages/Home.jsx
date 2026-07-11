import React from "react";
import { Link } from "react-router-dom";
import { usePodcast } from "../context/PodcastContext";
import GenreTags from "../components/UI/GenreTags";
import SearchBar from "../components/Filters/SearchBar";
import GenreFilter from "../components/Filters/GenreFilter";
import SortSelect from "../components/Filters/SortSelect";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
import styles from "./Home.module.css";

export default function Home() {
  const {
    podcasts = [],
    loading,
    error,
    genres = [],
  } = usePodcast();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error message={error.message || "Failed to fetch podcasts."} />
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.controls}>
        <SearchBar />
        <GenreFilter genres={genres} />
        <SortSelect />
      </section>

      <div className={styles.grid}>
        {podcasts.map((podcast) => (
          <div key={podcast.id} className={styles.card}>
            <img
              src={podcast.image}
              alt={podcast.title}
              className={styles.cardImage}
            />

            <div className={styles.cardContent}>
              <h3>{podcast.title}</h3>

              <div className={styles.genreContainer}>
                <GenreTags genres={podcast.genres} />
              </div>
                ))}
              </div>

              <p>
                {podcast.description
                  ? `${podcast.description.substring(0, 100)}...`
                  : "No description available."}
              </p>

              <Link
                to={`/show/${podcast.id}`}
                className={styles.viewButton}
              >
                View Show Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}