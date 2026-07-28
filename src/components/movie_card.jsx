import "../css/movie_card.css";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
    const handleFavoriteClick = () => {
        if (onToggleFavorite) {
            onToggleFavorite(movie);
        }
    };
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={movie.url} alt={movie.title} />
            <div className="movie-overlay">
                <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>❤️</button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </div>
}

export default MovieCard;