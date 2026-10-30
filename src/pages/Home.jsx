import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/movie_card";
import "../css/Home.css";

async function searchMovies(query, signal) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("OMDb API key is not configured. Add VITE_OMDB_API_KEY to .env.local.");
  }

  const params = new URLSearchParams({ apikey: apiKey, s: query });
  const response = await fetch(`https://www.omdbapi.com/?${params}`, { signal });
  if (!response.ok) {
    throw new Error(`OMDb request failed (${response.status}). Please try again.`);
  }

  const data = await response.json();
  if (data.Response === "False") {
    if (data.Error === "Movie not found!") {
      return [];
    }
    throw new Error(data.Error || "OMDb returned an unexpected response.");
  }

  if (!Array.isArray(data.Search)) {
    throw new Error("OMDb returned an unexpected response.");
  }

  return data.Search.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    release_date: movie.Year,
    url: movie.Poster,
  }));
}

function Home({ favorites, onToggleFavorite, onQuickView }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const requestController = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    requestController.current = controller;

    searchMovies("star wars", controller.signal)
      .then(setMovies)
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load movies from OMDb.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setIsLoading(true);
    setError("");
    setHasSearched(true);

    try {
      setMovies(await searchMovies(query, controller.signal));
    } catch (requestError) {
      if (!controller.signal.aborted) {
        setError(requestError.message || "Unable to search OMDb. Please try again.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">A little more cinema</span>
          <h1>Find the film you didn’t know you needed.</h1>
          <p>Explore the stories, performances, and worlds worth watching.</p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by movie title..."
            aria-label="Search by movie title"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" disabled={isLoading}>
            {isLoading ? "Searching..." : "Find a film"}
          </button>
        </form>
      </section>

      {error && <p className="search-message search-error" role="alert">{error}</p>}
      {isLoading && <p className="search-message" role="status">Searching OMDb...</p>}

      <section className="collection">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{hasSearched ? "Your search" : "From OMDb · Star Wars"}</p>
            <h2>{hasSearched ? "Search results" : "Explore movies"}</h2>
          </div>
          {movies.length > 0 && (
            <span className="collection-count">{movies.length} films</span>
          )}
        </div>
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => {
              const isFavorite = favorites.some((item) => item.id === movie.id);
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={isFavorite}
                  onToggleFavorite={onToggleFavorite}
                  onQuickView={onQuickView}
                />
              );
            })
          ) : hasSearched && !isLoading && !error ? (
            <div className="no-results">No films found. Try another title.</div>
          ) : !isLoading && !error ? (
            <div className="no-results">No movies are available right now. Try searching for a title.</div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default Home;