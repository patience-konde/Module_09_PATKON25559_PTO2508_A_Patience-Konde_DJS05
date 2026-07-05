
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePodcast } from "../context/PodcastContext";
import { fetchShowById } from "../api/fetchData";
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

    fetchShowById(
      id,
      setShow,
      setError,
      setLoading,
      fallbackShow
    );
  }, [id, allPodcasts]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!show) return <Error message="Podcast not found." />;

  const currentSeason =
    show.seasons && show.seasons.length > 0
      ? show.seasons[selectedSeasonIndex]
      : null;

  const totalEpisodes =
    show.seasons?.reduce(
      (total, season) => total + (season.episodes?.length || 0),
      0
    ) || 0;

  return (
    <div className="container">
      <Link to="/" className="backLink">
        ← Back
      </Link>

      <div className="podcastHeader">
        <img
          src={show.image}
          alt={show.title}
          className="coverImage"
        />

        <div className="podcastInfo">
          <h1>{show.title}</h1>

          <p>{show.description}</p>

          <div className="genresList">
            {show.genres?.map((genreId) => (
              <GenreTag key={genreId} id={genreId} />
            ))}
          </div>

          <p>
            <strong>Last Updated:</strong>{" "}
            {show.updated
              ? new Date(show.updated).toLocaleDateString()
              : "Unknown"}
          </p>

          <p>
            <strong>Seasons:</strong> {show.seasons?.length || 0}
          </p>

          <p>
            <strong>Total Episodes:</strong> {totalEpisodes}
          </p>
        </div>
      </div>

      {show.seasons?.length > 0 && (
        <>
          <aside className="seasonSidebar">

  <h3>Select Season</h3>

  <select
    className="seasonSelect"
    value={selectedSeasonIndex}
    onChange={(e) =>
      setSelectedSeasonIndex(Number(e.target.value))
    }
  >
    {show.seasons.map((season, index) => (
      <option key={season.id || index} value={index}>
        Season {index + 1} ({season.episodes?.length || 0} Episodes)
      </option>
    ))}
  </select>

</aside>

          {currentSeason && (
            <>
              <div className="seasonCard">
                {currentSeason.image && (
                  <img
                    src={currentSeason.image}
                    alt={currentSeason.title}
                    width="220"
                  />
                )}

                <h2>{currentSeason.title}</h2>

                <p>{currentSeason.description}</p>
              </div>

              <h2>Episodes</h2>

              {currentSeason.episodes?.length > 0 ? (
                currentSeason.episodes.map((episode, index) => (
                  <div key={episode.id || index} className="episodeCard">
                    <h3>
                      Episode {episode.episode || index + 1}: {episode.title}
                    </h3>

                    <p>{episode.description}</p>

                    {episode.file && (
                      <audio controls style={{ width: "100%" }}>
                        <source
                          src={episode.file}
                          type="audio/mpeg"
                        />
                      </audio>
                    )}
                  </div>
                ))
              ) : (
                <p>No episodes available for this season.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}