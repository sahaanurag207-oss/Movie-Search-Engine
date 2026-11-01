# Movie Discovery

Movie Discovery is a responsive web application for searching movies and exploring their details. Search for a title, browse the OMDb results, open a movie's quick view, and keep a list of favorites while the app is open.

## Project overview

This project was built to provide a simple way to find movies and learn more about them in one place. The home page starts with a movie collection and includes a title search. Each result is displayed as a poster card, with an option to save it to Favorites or open its detail view. The Favorites page gathers saved cards so they can be revisited during the current session.
The OMDb API typically delivers response times in the range of 100 ms to 300 ms under normal conditions, with peak or un-cached requests occasionally taking up to 500 ms.

## Features

### Movie search and discovery

- Search the OMDb catalog by movie title.
- The home page loads an initial set of results when the app opens.
- Search results include a movie poster, title, and year when that information is available.
- Empty results, loading activity, and API errors are displayed with messages.
- A new search cancels any in-flight request, preventing an older response from replacing newer results.

### Movie details

Select **Quick view** on a movie card to open its details without leaving the current page. The app requests the full record from OMDb using the movie's IMDb ID. Depending on the data OMDb provides, the quick view can show:

- Poster, title, year, content rating, and runtime
- Genre and IMDb rating
- Plot summary
- Director, cast, and awards

The detail view displays a loading state while the request is in progress and an error message if the details cannot be loaded. Close it with the close button, by pressing Escape, or by clicking outside the dialog.

### Favorites

- Use the heart button on a movie card to add or remove that movie from Favorites.
- Open the Favorites page from the navigation to see saved movies.
- Remove a favorite from the Favorites page using its heart button.
- Favorites are currently stored in React app state. They remain available while navigating within the open app, but are not persisted after a page reload.

### Responsive interface

The layout adapts to desktop and mobile screen sizes. Movie posters use a placeholder when no poster is available, and the details dialog is optimized for smaller screens.

## API integration experience

I initially attempted to integrate the **TMDB API** to provide movie search and discovery data. I encountered problems during the integration and, despite trying to get it working, was unable to complete a reliable TMDB connection.

To keep the project moving, I switched to the **OMDb API**. I configured the app to send title-search requests to OMDb and use the returned IMDb IDs to fetch detailed information for individual movies. This allowed me to build both the movie search experience and the quick-view movie details feature around one working API.

The app uses OMDb for the data it displays; TMDB is not currently connected.

## Technology

- **React** for the user interface and component state
- **Vite** for local development and production builds
- **React Router** for navigation between the home and Favorites pages
- **CSS** for responsive page, card, navigation, and dialog styling
- **OMDb API** for movie search and detail data
- Browser `fetch` for API requests

## Requirements

- Node.js and npm
- An OMDb API key. Request one from the [OMDb API website](https://www.omdbapi.com/apikey.aspx).

## Installation and setup

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root (next to `package.json`) and add your API key:

   ```env
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```

   Replace `your_omdb_api_key` with the key issued to you by OMDb. Do not include quotation marks unless they are part of the key.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite in your browser.

The API key is required for both movie searches and detail requests. If it is missing or invalid, the app displays an error instead of movie data.

## Available commands

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Check the project with ESLint
```

## API key note

Vite exposes variables prefixed with `VITE_` to client-side code. This means the OMDb key is included in requests made by the user's browser and should not be treated as a secret in a deployed client-only app. For production deployments where the key must remain private, send OMDb requests through a server-side endpoint and keep the key on the server.
