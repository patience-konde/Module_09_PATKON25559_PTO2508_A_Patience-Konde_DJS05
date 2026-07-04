import React from 'react';
import styles from './GenreTags.module.css';

// Object mapping standardized Netlify Podcast API numerical IDs to text labels
const GENRE_MAP = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

/**
 * GenreTag renders a styled tag pill transforming numerical IDs into text strings
 * @param {Object} props
 * @param {number|string} props.id - The numerical ID of the genre to display
 */
export default function GenreTag({ id }) {
  // Find name from map, or fallback gracefully to 'Unknown Genre' if missing
  const genreLabel = GENRE_MAP[id] || 'Technology'; 

  return (
    <span className={styles.tag}>
      {genreLabel}
    </span>
  );
}
