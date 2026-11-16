import "../css/movie_card.css";

function getDisplayText(value, fallback) {
    if (typeof value !== "string") return fallback;
    const text = value.trim();
    return text && text.toUpperCase() !== "N/A" ? text : fallback;
}

function MovieCard({ movie, isFavorite, onToggleFavorite, onQuickView }) {
    const title = getDisplayText(movie.title, "Untitled movie");
    const releaseYear = getDisplayText(movie.release_date, "Year unavailable");
    const poster = getDisplayText(movie.url, "");

    const handleFavoriteClick = () => {
        if (onToggleFavorite) {
            onToggleFavorite(movie);
        }
    };
    return (
        <article className="movie-card">
            <div className="movie-poster">
                <button
                    type="button"
                    className="movie-quick-view"
                    onClick={() => onQuickView?.(movie)}
                    aria-label={`Quick view details for ${title}`}
                >
                    {poster ? (
                        <img src={poster} alt="" loading="lazy" />
                    ) : (
                        <span className="poster-placeholder" aria-hidden="true">
                            {title.charAt(0)}
                        </span>
                    )}
                    <span className="quick-view-label" aria-hidden="true">Quick view</span>
                </button>
                <div className="movie-overlay">
                    <button
                        type="button"
                        className={`favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={isFavorite}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 title={title}>{title}</h3>
                <p>{releaseYear}</p>
            </div>
        </article>
    );
}

export default MovieCard;