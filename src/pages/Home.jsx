import MovieCard from "../components/movie_card";
import "../css/Home.css";
import { useState } from 'react';

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {id:1, title: "Inception", release_date: "2010-07-16", url: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"},
        {id:2, title: "The Dark Knight", release_date: "2008-07-18", url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"},
        {id:3, title: "Interstellar", release_date: "2014-11-07", url: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"},
        {id:4, title: "The Matrix", release_date: "1999-03-31", url: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"},
        {id:5, title: "The Shawshank Redemption", release_date: "1994-09-23", url: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"}
    ];
    const handleSearch = (event) => {
        event.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setSearchQuery("");
    }
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">Movie Search</span>
          <h1>Discover your next favorite film.</h1>
          <p>Search top titles, browse curated picks, and save favorites in a polished responsive interface.</p>
        </div>
      </section>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div className="movies-grid">
        {movies.map((movie) =>
          movie.title.toLowerCase().startsWith(searchQuery) && (
            <MovieCard key={movie.id} movie={movie} />
          )
        )}
      </div>
    </div>
  );
}

export default Home;