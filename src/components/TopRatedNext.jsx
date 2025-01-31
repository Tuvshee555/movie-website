"use client";

import { useEffect, useState } from "react";

export default function TopRatedNext() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top-rated movies");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, [API_KEY, TMDB_BASE_URL]);
  console.log("TopRatedNex");
  

  if (loading) {
    return <div>Loading top-rated movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        All Top Rated Movies
      </h2>
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Display all the top-rated movies */}
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[340px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rating: {movie.vote_average}/10
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
