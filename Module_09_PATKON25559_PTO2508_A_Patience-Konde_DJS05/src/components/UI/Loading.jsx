import React from 'react';
import styles from './Loading.module.css'; // Adjust path if using global styles instead

export default function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}