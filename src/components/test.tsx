"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce"; // ✅ Prevents excessive API calls

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  const searchMovies = debounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          query: searchQuery,
          language: "en-US",
          api_key: API_KEY,
        },
      });

      setMovies(response.data.results || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    searchMovies(query);
  }, [query]);

  return (
    <div className="relative z-10">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 rounded-md border border-gray-600 bg-black text-white w-[300px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Loading & Error Handling */}
      {loading && <div className="text-gray-400 mt-2">Loading...</div>}
      {error && <div className="text-red-500 mt-2">Error: {error}</div>}

      {/* Search Results Box */}
      {movies.length > 0 && (
        <div className="absolute bg-[#1a1a1a] border border-gray-600 mt-2 w-[380px] rounded-lg shadow-lg max-h-[400px] overflow-y-auto p-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-all"
              onClick={() => router.push(`/moviecard/${movie.id}`)}
            >
              {/* Movie Poster */}
              {movie.poster_path ? (
                <img
                  className="h-[90px] w-[60px] rounded-md object-cover mr-3"
                  src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="h-[90px] w-[60px] bg-gray-600 rounded-md mr-3 flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}

              {/* Movie Details */}
              <div className="flex flex-col flex-grow">
                <span className="text-white font-semibold">{movie.title}</span>
                <div className="flex items-center text-gray-400 text-sm">
                  ⭐ {movie.vote_average.toFixed(1)}/10 &nbsp;•&nbsp;{" "}
                  {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                </div>
              </div>

              {/* "See more" Button */}
              <button className="ml-auto text-blue-400 hover:underline">See more →</button>
            </div>
          ))}

          {/* View All Results */}
          <div className="text-center mt-2">
            <button
              className="text-gray-400 hover:text-white hover:underline"
              onClick={() => router.push(`/search-results?q=${query}`)}
            >
              See all results for "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
