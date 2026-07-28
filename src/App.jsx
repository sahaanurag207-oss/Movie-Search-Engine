import { useState } from 'react';
import './css/App.css';
import Favorites from './pages/Favorites';
import { Routes, Route } from 'react-router-dom';
import Nav_Bar from './components/Nav_Bar';
import Home from './pages/Home';

function App() {
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item.id === movie.id);
      if (exists) {
        return currentFavorites.filter((item) => item.id !== movie.id);
      }
      return [...currentFavorites, movie];
    });
  };

  return (
    <div className="app-shell">
      <Nav_Bar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
