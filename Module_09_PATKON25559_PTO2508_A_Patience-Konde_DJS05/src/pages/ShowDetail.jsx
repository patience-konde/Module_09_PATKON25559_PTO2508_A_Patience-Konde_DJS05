import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// API and UI Imports
import { fetchShowById } from '../api/fetchData';
import { usePodcast } from '../context/PodcastContext';
import GenreTag from '../components/UI/GenreTag';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';
import styles from './ShowDetail.module.css';

export default function ShowDetail() {
  const { id } = useParams();
  const { allPodcasts = [] } = usePodcast();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  useEffect(() => {
    const fallbackShow = allPodcasts.find((podcast) => String(podcast.id) === String(id));

    if (fallbackShow) {
      setShow({
        ...fallbackShow,
        seasons: fallbackShow.seasons || [],
      });
      setError(null);
      setLoading(false);
      return;
    }

    fetchShowById(id, setShow, setError, setLoading);
  }, [id, allPodcasts]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!show) return <Error message="No show data discovered." />;

  const currentSeason = show.seasons?.[selectedSeasonIndex] || show.seasons?.[0];

   return (
    <div className={styles.container}>
      
      {/* 1. Circular Back Link Button */}
      <div className={styles.backLinkContainer}>
        <Link to="/" className={styles.backLink} aria-label="Go back to home page">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>
      </div>

      {/* 2. Main Podcast Detail Banner */}
      <div className={styles.podcastHeader}>
        <div className={styles.imageContainer}>
          {show.image ? (
            <img src={show.image} alt={show.title} className={styles.coverImage} />
          ) : (
            <div className={styles.imagePlaceholder}>Podcast Cover Image</div>
          )}
        </div>
        
        <div className={styles.podcastInfo}>
          <h1>{show.title || 'Podcast Title'}</h1>
          <p className={styles.description}>
            {show.description || 'A detailed description of this amazing podcast...'}
          </p>
          
          {/* Metadata Grid Layout */}
          <div className={styles.metadataGrid}>
            
            {/* Dynamic Genre Tag loop mapping here */}
            <div>
              <span className={styles.label}>GENRES</span>
              <div className={styles.genresList}>
                {show.genres?.map((genreId) => (
                  <GenreTag key={genreId} id={genreId} />
                ))}
              </div>
            </div>

            <div>
              <span className={styles.label}>LAST UPDATED</span>
              <span className={styles.value}>
                {show.updated ? new Date(show.updated).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                }) : 'January 15, 2025'}
              </span>
            </div>
            <div>
              <span className={styles.label}>TOTAL SEASONS</span>
              <span className={styles.value}>{show.seasons?.length || 0} Seasons</span>
            </div>
            <div>
              <span className={styles.label}>TOTAL EPISODES</span>
              <span className={styles.value}>
                {show.seasons?.reduce((acc, s) => acc + (s.episodes?.length || 0), 0) || 0} Episodes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Season Selection Sub-Header */}
      <div className={styles.sectionDivider}>
        <h2>Current Season</h2>
        
        <select 
          className={styles.seasonSelect}
          value={selectedSeasonIndex}
          onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
        >
          {show.seasons?.map((season, index) => (
            <option key={season.id || index} value={index}>
              Season {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Active Season Overview Card */}
      {currentSeason && (
        <div className={styles.seasonOverviewCard}>
          <div className={styles.seasonMiniCover}>
            <span>Season {selectedSeasonIndex + 1}<br/>Cover</span>
          </div>
          <div className={styles.seasonOverviewText}>
            <h3>Season {selectedSeasonIndex + 1}: {currentSeason.title || 'Getting Started'}</h3>
            <p>{currentSeason.description || 'Introduction to the basics and foundational concepts.'}</p>
            <div className={styles.seasonMetaTags}>
              <span>{currentSeason.episodes?.length || 0} Episodes</span>
              <span>•</span>
              <span>Released 2024</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Episode List Rows */}
      <div className={styles.episodesWrapper}>
        {currentSeason?.episodes?.map((episode, idx) => (
          <div key={episode.id || idx} className={styles.episodeRow}>
            <div className={styles.episodeNumberBox}>
              <span>EP</span>
              <span>{episode.episode || idx + 1}</span>
            </div>
            
            <div className={styles.episodeBody}>
              <h4>Episode {episode.episode || idx + 1}: {episode.title}</h4>
              <p>{episode.description}</p>
              
              <div className={styles.episodeFooter}>
                <span className={styles.duration}>45 min</span>
                <span>•</span>
                <span className={styles.date}>Jan 1, 2024</span>
                
                {episode.file && (
                  <audio src={episode.file} controls className={styles.rowAudio} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

