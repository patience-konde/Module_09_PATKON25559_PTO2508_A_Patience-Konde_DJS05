/**
 * @function fetchPodcasts
 * Asynchronously fetches podcast data from the remote API and updates state accordingly.
 * Handles loading, error, and successful data response via provided state setters.
 *
 * @param {Function} setPodcasts - State setter function to update the podcasts array.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 *
 **/
export async function fetchPodcasts(setPodcasts, setError, setLoading) {
  try {
     const res = await fetch("https://podcast-api.netlify.app/shows");
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcasts(data);
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

/**
 * Handles loading, error, and data response for a single show ID
 * @param {string} id - The specific show ID to fetch
 * @param {Function} setShow - State setter to update the show data
 * @param {Function} setError - State setter to update error messages
 * @param {Function} setLoading - State setter to toggle loading state
 */
export async function fetchShowById(id, setShow, setError, setLoading) {
  try {
    setLoading(true);
    setError(null); // Clear previous errors
    const res = await fetch(`https://netlify.app{id}`);
    
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    
    const data = await res.json();
    setShow(data);
  } catch (err) {
    console.error("Failed to fetch show details:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

