import { useState } from "react";

function MoviePoster({ title, src, alt = "", loading = "lazy" }) {
  const [failedSource, setFailedSource] = useState("");
  const poster = typeof src === "string" && src.trim() && src.trim().toUpperCase() !== "N/A"
    ? src.trim()
    : "";
  const displayTitle = typeof title === "string" ? title.trim() : "";

  if (!poster || poster === failedSource) {
    return (
      <span className="poster-placeholder" aria-hidden="true">
        {displayTitle.charAt(0).toUpperCase() || "?"}
      </span>
    );
  }

  return (
    <img
      src={poster}
      alt={alt}
      loading={loading}
      onError={() => setFailedSource(poster)}
    />
  );
}

export default MoviePoster;
