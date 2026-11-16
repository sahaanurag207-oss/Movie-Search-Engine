import didYouMean from "didyoumean";

function getText(value) {
  if (typeof value !== "string") return "";
  const text = value.trim();
  return text && text.toUpperCase() !== "N/A" ? text : "";
}

export async function searchMovies(query, signal) {
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
    title: getText(movie.Title) || "Untitled movie",
    release_date: getText(movie.Year),
    url: getText(movie.Poster),
  }));
}

async function getSpellingCandidates(query, signal) {
  const words = [...query.matchAll(/[\p{L}\p{N}]+/gu)]
    .filter((match) => match[0].length >= 4)
    .slice(0, 4);

  return Promise.all(words.map(async (match) => {
    const word = match[0];
    const offset = match.index;
    const params = new URLSearchParams({ sp: word, max: "5" });
    const response = await fetch(`https://api.datamuse.com/words?${params}`, { signal });
    if (!response.ok) {
      throw new Error(`Spelling suggestion request failed (${response.status}).`);
    }

    const suggestions = await response.json();
    if (!Array.isArray(suggestions)) {
      throw new Error("Spelling suggestion service returned an unexpected response.");
    }

    const alternatives = suggestions
      .filter((item) => typeof item.word === "string" && item.word.toLowerCase() !== word.toLowerCase())
      .map((item) => item.word);
    const correctedWord = didYouMean(word, alternatives);
    if (!correctedWord) return null;

    return query.slice(0, offset) + correctedWord + query.slice(offset + word.length);
  }));
}

function getMatchingMovie(query, movies) {
  const title = didYouMean(query, movies.map((movie) => movie.title));
  const titleMatch = title
    ? movies.find((movie) => movie.title.toLowerCase() === title.toLowerCase())
    : null;
  if (titleMatch) return titleMatch;

  const queryWords = [...query.matchAll(/[\p{L}\p{N}]+/gu)]
    .map((match) => match[0])
    .filter((word) => word.length >= 4);
  const titleWords = [...new Set(movies.flatMap((movie) =>
    [...movie.title.matchAll(/[\p{L}\p{N}]+/gu)].map((match) => match[0])
  ))];

  for (const word of queryWords) {
    const matchedWord = didYouMean(word, titleWords);
    if (!matchedWord) continue;

    const match = movies.find((movie) =>
      [...movie.title.matchAll(/[\p{L}\p{N}]+/gu)]
        .some((titleWord) => titleWord[0].toLowerCase() === matchedWord.toLowerCase())
    );
    if (match) return match;
  }

  return null;
}

export async function searchMoviesWithFallback(query, signal) {
  const results = await searchMovies(query, signal);
  if (results.length > 0) {
    return { results, suggestion: "", suggestionError: "" };
  }

  let suggestionError = "";
  try {
    const candidates = await getSpellingCandidates(query, signal);
    for (const candidate of candidates) {
      if (!candidate || candidate.toLowerCase() === query.toLowerCase()) continue;
      const correctedResults = await searchMovies(candidate, signal);
      if (correctedResults.length > 0) {
        return {
          results: correctedResults,
          suggestion: correctedResults[0].title,
          suggestionError: "",
        };
      }
    }
  } catch (error) {
    if (signal.aborted || (error instanceof Error && error.name === "AbortError")) throw error;
    suggestionError = "Spelling suggestions are temporarily unavailable.";
  }

  if (query.length >= 5) {
    const prefix = query.slice(0, Math.ceil(query.length * 0.6));
    const prefixResults = await searchMovies(prefix, signal);
    const match = getMatchingMovie(query, prefixResults);
    if (match) {
      return { results: [match], suggestion: match.title, suggestionError: "" };
    }
  }

  return { results: [], suggestion: "", suggestionError };
}
