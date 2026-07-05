const FALLBACK_PODCASTS = [
  {
    id: 1,
    title: "The Daily Boost",
    description:
      "A practical podcast for building better habits, improving focus, and creating a calmer daily routine.",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
    updated: "2024-08-15",
    genres: [1, 6],
    seasons: [
      {
        title: "Season One",
        description: "Start the week with simple routines and mindset shifts.",
        episodes: [
          { id: 101, episode: 1, title: "Morning Focus", description: "A simple morning ritual." },
          { id: 102, episode: 2, title: "Deep Work", description: "How to protect your best hours." },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "True Stories Unpacked",
    description:
      "Investigative storytelling that breaks down the facts behind strange and compelling events.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
    updated: "2024-10-02",
    genres: [2, 8],
    seasons: [
      {
        title: "Season One",
        description: "A closer look at leading stories and what really happened.",
        episodes: [
          { id: 201, episode: 1, title: "The Missing Signal", description: "A case study in incomplete information." },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "History in Motion",
    description:
      "Short episodes that connect the past to the present with vivid storytelling.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
    updated: "2024-06-21",
    genres: [3, 5],
    seasons: [
      {
        title: "Season One",
        description: "Explore how old events shape the modern world.",
        episodes: [
          { id: 301, episode: 1, title: "The Silk Road", description: "How trade changed civilizations." },
        ],
      },
    ],
  },
];

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
    setLoading(true);
   const res = await fetch("https://podcast-api.netlify.app");

    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const data = await res.json();
    setPodcasts(Array.isArray(data) && data.length ? data : FALLBACK_PODCASTS);
    setError(null);
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setPodcasts(FALLBACK_PODCASTS);
    setError(null);
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
export async function fetchShowById(
  id,
  setShow,
  setError,
  setLoading,
  fallbackShow = null
) {
  try {
    setLoading(true);
    setError(null);

   const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);

    if (!res.ok) {
      if (fallbackShow) {
        setShow({
          ...fallbackShow,
          seasons: Array.isArray(fallbackShow.seasons)
            ? fallbackShow.seasons.map(season => ({
                ...season,
                episodes: Array.isArray(season.episodes) ? season.episodes : [],
              }))
            : [],
        });
        return;
      }
      throw new Error(`Status: ${res.status}`);
    }

    const data = await res.json();

    // Normalize seasons and episodes
    const normalizedSeasons = Array.isArray(data.seasons)
      ? data.seasons.map(season => ({
          ...season,
          episodes: Array.isArray(season.episodes) ? season.episodes : [],
        }))
      : [];

    setShow({
      ...data,
      seasons: normalizedSeasons,
    });
  } catch (err) {
    console.error("Failed to fetch show details:", err);
    if (fallbackShow) {
      setShow({
        ...fallbackShow,
        seasons: Array.isArray(fallbackShow.seasons)
          ? fallbackShow.seasons.map(season => ({
              ...season,
              episodes: Array.isArray(season.episodes) ? season.episodes : [],
            }))
          : [],
      });
    } else {
      setError(err.message || "Failed to fetch show.");
    }
  } finally {
    setLoading(false);
  }
}


