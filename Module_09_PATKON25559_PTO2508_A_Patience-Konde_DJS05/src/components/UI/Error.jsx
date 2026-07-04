import React from 'react';
import styles from './Error.module.css'; // Create this file or import your shared UI styles

export default function Error({ message }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <p className={styles.errorMessage}>
        {message || "An unexpected error occurred. Please try again."}
      </p>
    </div>
  );
}