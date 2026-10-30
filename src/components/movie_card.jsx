import "../css/movie_card.css";

function MovieCard({ movie, isFavorite, onToggleFavorite, onQuickView }) {
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
                    aria-label={`Quick view details for ${movie.title}`}
                >
                    {movie.url && movie.url !== "N/A" ? (
                        <img src={movie.url} alt="" loading="lazy" />
                    ) : (
                        <span className="poster-placeholder" aria-hidden="true">
                            {movie.title.charAt(0)}
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
                <h3 title={movie.title}>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </article>
    );
}

export default MovieCard;