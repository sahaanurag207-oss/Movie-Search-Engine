import MovieCard from "../components/movie_card";
import "../css/Favorites.css";

function Favorites({ favorites, onToggleFavorite, onQuickView }) {
  if (favorites.length === 0) {
    return (
      <section className="favorites">
        <div className="favorites-heading">
          <p className="section-kicker">Your personal collection</p>
          <h1>Favorites</h1>
          <p>Keep the films you want to come back to close at hand.</p>
        </div>
        <div className="favorites-empty">
          <span className="favorites-empty-icon" aria-hidden="true">♥</span>
          <h2>Your watchlist starts here</h2>
          <p>Tap the heart on any film you love and it’ll be waiting for you here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites">
      <div className="favorites-heading">
        <p className="section-kicker">Your personal collection</p>
        <h1>Favorites</h1>
        <p>{favorites.length} {favorites.length === 1 ? "film" : "films"} saved for later.</p>
      </div>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
}

export default Favorites;