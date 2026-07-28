import "../css/movie_card.css";
function MovieCard({movie}) {
    function onfavouriteClick() {
        alert("favourite clicked");
    }
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={movie.url} alt={movie.title} />
            <div className="movie-overlay">
                <button className="favorite-btn" onClick={onfavouriteClick}>❤️</button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </div>

}

export default MovieCard;