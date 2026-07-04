import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// API and UI Imports (Adjust relative paths if your folders differ)
import { fetchShowById } from '../../api/fetchData'; 
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import styles from './ShowDetail.module.css';

export default function ShowDetail() {
  const { id } = useParams(); 
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSeason, setOpenSeason] = useState(null);

  // Triggers the imported fetch helper whenever the ID changes
  useEffect(() => {
    fetchShowById(id, setShow, setError, setLoading);
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!show) return <Error message="No show data discovered." />;

  return (
    <div className={styles.container}>
      {/* Back link navigation */}
      <Link to="/" className={styles.backLink}>
        ← Back to All Shows
      </Link>

      {/* Show header banner */}
      <div className={styles.headerSection}>
        <img src={show.image} alt={show.title} className={styles.showImage} />
        <div className={styles.showMetadata}>
          <h1>{show.title}</h1>
          <p className={styles.description}>{show.description}</p>
        </div>
      </div>

      {/* Accordion dropdown system for seasons */}
      <div className={styles.seasonsContainer}>
        <h2>Seasons ({show.seasons?.length || 0})</h2>
        
        {show.seasons?.map((season, index) => {
          const seasonNumber = index + 1;
          const isOpen = openSeason === seasonNumber;

          return (
            <div key={season.id || seasonNumber} className={styles.seasonWrapper}>
              
              <button 
                className={styles.seasonToggle} 
                onClick={() => setOpenSeason(isOpen ? null : seasonNumber)}
              >
                <span>Season {seasonNumber}: {season.title} ({season.episodes?.length || 0} Episodes)</span>
                <span>{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className={styles.episodesList}>
                  {season.episodes?.map((episode) => (
                    <div key={episode.id || episode.file} className={styles.episodeCard}>
                      <div className={styles.episodeInfo}>
                        <h4>{episode.episode}. {episode.title}</h4>
                        <p>{episode.description}</p>
                      </div>
                      
                      {episode.file && (
                        <audio controls src={episode.file} className={styles.audioPlayer}>
                          Your browser does not support audio playback.
                        </audio>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}