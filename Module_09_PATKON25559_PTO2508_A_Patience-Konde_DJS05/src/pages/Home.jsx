import React from 'react';
import { Link } from 'react-router-dom';
import { usePodcast } from '../context/PodcastContext'; 
import GenreTag from '../components/UI/GenreTag'; // Importing GenreTag component
import SearchBar from '../components/UI/SearchBar';     
import GenreFilter from '../components/UI/GenreFilter'; 
import SortSelect from '../components/UI/SortSelect';   
import Loading from '../components/UI/Loading';         
import Error from '../components/UI/Error';             
import GenreTag from '../components/UI/GenreTag'; // Imported your GenreTag file
import styles from './Home.module.css';

export default function Home() {
  const { podcasts, loading, error, genres } = usePodcast();

  return (
    <main className={styles.main}>
      <section className={styles.controls}>
        <SearchBar />
        <GenreFilter genres={genres} />
        <SortSelect />
      </section>

      {loading && <Loading />}
      {error && <Error message={error.message || 'Failed to fetch podcasts.'} />}

      {!loading && !error && (
        <div className={styles.grid}>
          {podcasts.map((podcast) => (
            <div key={podcast.id} className={styles.card}>
              <img src={podcast.image} alt={podcast.title} className={styles.cardImage} />
              
              <div className={styles.cardContent}>
                <h3>{podcast.title}</h3>
                
                {/* Dynamically list Genre Tags if your podcast data contains a genres array */}
                <div className={styles.genreContainer}>
                  {podcast.genres?.map((genreId) => (
                    <GenreTag key={genreId} id={genreId} />
                  ))}
                </div>

                <p>{podcast.description?.substring(0, 100)}...</p>
                
                <Link to={`/show/${podcast.id}`} className={styles.viewButton}>
                  View Show Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}