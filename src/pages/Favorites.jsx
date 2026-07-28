import MovieCard from "../components/movie_card";
import "../css/Favorites.css";

function Favorites({ favorites, onToggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorites Movies Yet</h2>
        <p>Click the heart icon on a movie to add it to your favorites.</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;