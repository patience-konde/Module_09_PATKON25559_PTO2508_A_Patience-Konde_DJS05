
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePodcast } from "../context/PodcastContext";
import { fetchShowById } from "../api/fetchData";
import GenreTags from "../components/UI/GenreTags";
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
    <div className="backLinkContainer">
      <Link to="/" className="backLink">
        ← Back to Podcasts
      </Link>
    </div>

    {/* Podcast Header */}
    <div className="podcastHeader">
      <div className="imageContainer">
        <img
          src={show.image}
          alt={show.title}
          className="coverImage"
        />
      </div>

      <div className="podcastInfo">
        <h1>{show.title}</h1>

        <p className="description">{show.description}</p>

        <div className="genresList">
          {show.genres?.map((genreId) => (
            <GenreTags key={genreId} id={genreId} />
          ))}
        </div>

        <div className="metadataGrid">
          <div>
            <span className="label">Last Updated</span>
            <span className="value">
              {show.updated
                ? new Date(show.updated).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>

          <div>
            <span className="label">Seasons</span>
            <span className="value">
              {show.seasons?.length || 0}
            </span>
          </div>

          <div>
            <span className="label">Episodes</span>
            <span className="value">{totalEpisodes}</span>
          </div>
        </div>
      </div>
    </div>

    {show.seasons?.length > 0 && (
      <div className="contentLayout">

        {/* Episodes */}
        <section className="episodesSection">

          {currentSeason && (
            <>
              <div className="seasonOverviewCard">
                {currentSeason.image && (
                  <div className="seasonMiniCover">
                    <img
                      src={currentSeason.image}
                      alt={currentSeason.title}
                    />
                  </div>
                )}

                <div className="seasonOverviewText">
                  <h3>{currentSeason.title}</h3>

                  <p>{currentSeason.description}</p>

                  <div className="seasonMetaTags">
                    <span>
                      {currentSeason.episodes?.length || 0} Episodes
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="episodesTitle">Episodes</h2>

              <div className="episodesWrapper">
                {currentSeason.episodes?.length > 0 ? (
                  currentSeason.episodes.map((episode, index) => (
                    <div
                      key={episode.id || index}
                      className="episodeRow"
                    >
                      <div className="episodeNumberBox">
                        <span>
                          {episode.episode || index + 1}
                        </span>
                      </div>

                      <div className="episodeBody">
                        <h4>{episode.title}</h4>

                        <p>{episode.description}</p>

                        {episode.file && (
                          <audio
                            controls
                            className="rowAudio"
                          >
                            <source
                              src={episode.file}
                              type="audio/mpeg"
                            />
                            Your browser does not support audio.
                          </audio>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No episodes available for this season.</p>
                )}
              </div>
            </>
          )}
        </section>

        {/* Sidebar */}
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
              <option
                key={season.id || index}
                value={index}
              >
                Season {index + 1} ({season.episodes?.length || 0} Episodes)
              </option>
            ))}
          </select>
        </aside>

      </div>
    )}
  </div>
);
}