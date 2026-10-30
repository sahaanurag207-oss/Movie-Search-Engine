# 🎬 React Movie Search Engine

A fast, responsive, and intuitive web application built with **React** and **Tailwind CSS** that lets users search and discover movies in real-time. Powered by the **TMDB (The Movie Database) API** / **OMDb API**, it displays up-to-date movie information, ratings, plot summaries, and trailers.

---

## ✨ Features

- 🔍 **Movie Search:** Search OMDb titles and browse matching movies.
- 🍿 **Detailed Movie Pages:** View posters, release dates, ratings, plot synopses, and genre tags.
- 📱 **Fully Responsive:** Seamless layout designed for desktop, tablet, and mobile displays.
- ⚡ **Skeleton Loading States:** Clean UI indicators during network requests for smoother UX.
- 📑 **Pagination & Infinite Scroll:** Browse through extensive lists of search results effortlessly.
- 💾 **Favorites / Watchlist:** Save your favorite movies to `localStorage` to view them later.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+ (Hooks & Functional Components)
- **Styling:** Tailwind CSS / Styled-Components
- **API Handling:** Axios / Native Fetch API with Custom Hooks
- **Movie Data:** TMDB API / OMDb API
- **Build Tool:** Vite / Create React App

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- An API Key from [TMDB API](https://www.themoviedb.org/) or [OMDb API](http://www.omdbapi.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/react-movie-search.git](https://github.com/your-username/react-movie-search.git)
   cd react-movie-search
   npm install
   ```

2. Create a `.env.local` file in the project root and add your OMDb API key:
   ```env
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Vite exposes `VITE_` variables in browser code. The key is included in requests from the user's browser, so use a server-side proxy if the key must remain private.