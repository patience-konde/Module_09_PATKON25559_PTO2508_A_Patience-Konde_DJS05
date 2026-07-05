
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { usePodcast } from "../context/PodcastContext";
import GenreTag from "../components/UI/GenreTag";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
import "./ShowDetail.css";

export default function ShowDetail() {
  const { id } = useParams();
  const { allPodcasts = [] } = usePodcast();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  useEffect(() => {
    const fallbackShow = allPodcasts.find(
      (podcast) => String(podcast.id) === String(id)
    );

    if (fallbackShow) {
      setShow({
        ...fallbackShow,
        seasons: Array.isArray(fallbackShow.seasons) ? fallbackShow.seasons : [],
      });
      setSelectedSeasonIndex(0);
      setError(null);
      setLoading(false);
      return;
    }

    setError("Podcast not found.");
    setLoading(false);
  }, [id, allPodcasts]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!show) return <Error message="Podcast not found." />;

  const safeSeasonIndex = Math.max(
    0,
    Math.min(selectedSeasonIndex, (show.seasons?.length || 1) - 1)
  );

  const currentSeason =
    Array.isArray(show.seasons) && show.seasons.length > 0
      ? show.seasons[safeSeasonIndex]
      : null;

  const totalEpisodes = Array.isArray(show.seasons)
    ? show.seasons.reduce(
        (total, season) => total + (season.episodes?.length || 0),
        0
      )
    : 0;

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
    color: "#f8fafc",
    padding: "24px",
    fontFamily: "Inter, Arial, sans-serif",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(8px)",
  };

  const linkStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    background: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    textDecoration: "none",
    marginBottom: "16px",
  };

  const imageStyle = {
    width: "220px",
    height: "220px",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.28)",
  };

  const selectStyle = {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "#ffffff",
    color: "#111827",
    minWidth: "220px",
    fontWeight: 600,
  };

  const seasonBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap",
    padding: "14px 16px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  const seasonOverviewStyle = {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginTop: "16px",
    padding: "16px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    flexWrap: "wrap",
  };

  const metadataStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginTop: "16px",
  };

  const genreRowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(92px, max-content))",
    gap: "8px",
    marginTop: "6px",
  };

  const episodeRowStyle = {
    display: "grid",
    gridTemplateColumns: "72px 1fr",
    gap: "16px",
    alignItems: "start",
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  const episodeNumberStyle = {
    minWidth: "56px",
    padding: "10px",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#111827",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1.2,
  };

  return (
    <div className="container" style={pageStyle}>
      {/* Back Button */}
      <div className="backLinkContainer">
        <Link to="/" className="backLink" aria-label="Back" style={linkStyle}>
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

      {/* Header */}
      <div className="podcastHeader" style={{ ...cardStyle, display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div className="imageContainer">
          {show.image ? (
            <img
              src={show.image}
              alt={show.title}
              className="coverImage"
              style={imageStyle}
            />
          ) : (
            <div className="imagePlaceholder">No Image</div>
          )}
        </div>

        <div className="podcastInfo">
          <h1>{show.title}</h1>
          <p className="description">{show.description}</p>

          <div className="metadataGrid" style={metadataStyle}>
            <div>
              <span className="label">GENRES</span>
              <div className="genresList" style={genreRowStyle}>
                {show.genres?.map((genreId) => (
                  <GenreTag key={genreId} id={genreId} />
                ))}
              </div>
            </div>

            <div>
              <span className="label">LAST UPDATED</span>
              <span className="value">
                {show.updated
                  ? new Date(show.updated).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>

            <div>
              <span className="label">TOTAL SEASONS</span>
              <span className="value">
                {Array.isArray(show.seasons) ? show.seasons.length : 0}
              </span>
            </div>

            <div>
              <span className="label">TOTAL EPISODES</span>
              <span className="value">{totalEpisodes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Season Selector */}
      <div className="sectionDivider" style={seasonBarStyle}>
        <h2 style={{ margin: 0 }}>Current Season</h2>
        <select
          className="seasonSelect"
          style={selectStyle}
          value={safeSeasonIndex}
          onChange={(e) => {
            const nextIndex = Math.min(
              Number(e.target.value),
              Math.max(0, (show.seasons?.length || 1) - 1)
            );
            setSelectedSeasonIndex(nextIndex);
          }}
        >
          {Array.isArray(show.seasons) &&
            show.seasons.map((season, index) => (
              <option key={season.id || index} value={index}>
                Season {index + 1} ({season.episodes?.length || 0} episodes)
              </option>
            ))}
        </select>
      </div>

      {/* Season Overview */}
      {currentSeason && (
        <div className="seasonOverviewCard" style={seasonOverviewStyle}>
          <div className="seasonMiniCover">
            {currentSeason.image ? (
              <img
                src={currentSeason.image}
                alt={currentSeason.title}
              />
            ) : (
              <span>Season {selectedSeasonIndex + 1}</span>
            )}
          </div>

          <div className="seasonOverviewText">
            <h3>Season {selectedSeasonIndex + 1}</h3>
            <p>{currentSeason.description}</p>
            <div className="seasonMetaTags">
              <span>
                {currentSeason.episodes?.length || 0} Episodes
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Episodes */}
      <div className="episodesWrapper">
        {!currentSeason?.episodes?.length ? (
          <div style={{ ...cardStyle, padding: "16px", textAlign: "center" }}>
            No episodes available for this season.
          </div>
        ) : (
          currentSeason.episodes.map((episode, index) => (
          <div
            key={episode.id || index}
            className="episodeRow"
            style={episodeRowStyle}
          >
            <div className="episodeNumberBox" style={episodeNumberStyle}>
              <span>EP</span>
              <span>{episode.episode || index + 1}</span>
            </div>

            <div className="episodeBody">
              <h4>
                Episode {episode.episode || index + 1}:{" "}
                {episode.title}
              </h4>
              <p>{episode.description}</p>

              <div className="episodeFooter">
                {episode.file && (
                  <audio
                    controls
                    src={episode.file}
                    className="rowAudio"
                  />
                )}
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
