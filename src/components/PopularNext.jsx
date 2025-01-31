"use client";

import { useEffect, useState } from "react";

export const PopularNext = ({ onBack, currentPage }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${
            currentPage + 1
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_KEY, TMDB_BASE_URL, currentPage]);
  console.log("nextPOP");

  if (loading) {
    return <div>Loading Popular Movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center bg-black">
      <div className="w-[1280px] align-center">
        <div className="flex justify-between mb-6 mt-[52px]">
          <h2 className="text-3xl font-bold text-white dark:text-white">
            Popular Movies - Page {currentPage + 1}
          </h2>
          <button
            className="text-white bg-gray-800 p-2 rounded-lg"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
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
    </div>
  );
};
