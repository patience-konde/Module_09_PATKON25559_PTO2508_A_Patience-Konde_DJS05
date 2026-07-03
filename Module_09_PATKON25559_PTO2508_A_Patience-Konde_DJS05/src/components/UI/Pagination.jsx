import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const { page, totalPages, setPage } = useContext(PodcastContext);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => setPage((current) => Math.max(1, current - 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
