import './css/App.css';
import Favorites from './pages/Favorites';
import { Routes, Route } from 'react-router-dom';
import Nav_Bar from './components/Nav_Bar';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-shell">
      <Nav_Bar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
