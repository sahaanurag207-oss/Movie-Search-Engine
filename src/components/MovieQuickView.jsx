import { useEffect, useRef, useState } from "react";
import "../css/MovieQuickView.css";

function hasValue(value) {
  return typeof value === "string" && value.trim() !== "" && value.trim().toUpperCase() !== "N/A";
}

function MovieQuickView({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    async function loadDetails() {
      if (!apiKey) {
        setError("OMDb API key is not configured. Add VITE_OMDB_API_KEY to .env.local.");
        setIsLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams({
          apikey: apiKey,
          i: movie.id,
          plot: "full",
        });
        const response = await fetch(`https://www.omdbapi.com/?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`OMDb request failed (${response.status}). Please try again.`);
        }

        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error || "Movie details could not be loaded.");
        }

        setDetails(data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load movie details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      controller.abort();
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [movie.id, onClose]);

  const displayDetails = details || {};
  const title = hasValue(displayDetails.Title)
    ? displayDetails.Title.trim()
    : hasValue(movie.title) ? movie.title.trim() : "Untitled movie";
  const poster = hasValue(displayDetails.Poster)
    ? displayDetails.Poster.trim()
    : hasValue(movie.url) ? movie.url.trim() : "";
  const releaseYear = hasValue(displayDetails.Year)
    ? displayDetails.Year.trim()
    : hasValue(movie.release_date) ? movie.release_date.trim() : "Year unavailable";

  return (
    <div
      className="quick-view-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="quick-view-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        aria-describedby={details ? "quick-view-plot" : undefined}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="quick-view-close"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>

        <div className="quick-view-poster">
          {poster && poster !== "N/A" ? (
            <img src={poster} alt={`${title} poster`} />
          ) : (
            <span className="poster-placeholder" aria-hidden="true">
              {title.charAt(0)}
            </span>
          )}
        </div>

        <div className="quick-view-content">
          <p className="section-kicker">Movie details</p>
          <h2 id="quick-view-title">{title}</h2>
          <p className="quick-view-meta">
            {[releaseYear, displayDetails.Rated, displayDetails.Runtime]
              .filter(hasValue)
              .map((value) => value.trim())
              .join(" · ")}
          </p>

          {hasValue(displayDetails.Genre) && (
            <p className="quick-view-genre">{displayDetails.Genre.trim()}</p>
          )}

          {isLoading ? (
            <p className="quick-view-status" role="status">Loading movie details...</p>
          ) : error ? (
            <p className="quick-view-error" role="alert">{error}</p>
          ) : (
            <>
              {hasValue(displayDetails.imdbRating) && (
                <p className="quick-view-rating">
                  <span aria-hidden="true">★</span> {displayDetails.imdbRating.trim()}
                  <span className="quick-view-rating-label"> IMDb</span>
                </p>
              )}
              <p className="quick-view-plot" id="quick-view-plot">
                {hasValue(displayDetails.Plot)
                  ? displayDetails.Plot.trim()
                  : "No plot summary is available."}
              </p>
              <dl className="quick-view-credits">
                {[
                  ["Director", displayDetails.Director],
                  ["Cast", displayDetails.Actors],
                  ["Awards", displayDetails.Awards],
                ]
                  .filter(([, value]) => hasValue(value))
                  .map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value.trim()}</dd>
                    </div>
                  ))}
              </dl>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default MovieQuickView;
