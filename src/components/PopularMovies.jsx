"use client";

import { useEffect, useState } from "react";

export const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); 
  const [nextMovies, setNextMovies] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  const fetchMovies = async (pageNumber) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      const data = await response.json();
      return data.results; 
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(page);
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, [page]);

  const handleSeeMoreClick = async () => {
    const nextPage = page + 1;
    const data = await fetchMovies(nextPage);
    setMovies((prevMovies) => [...prevMovies, ...data]); 
    setPage(nextPage);
  };

  if (loading) {
    return <div className="text-center">Loading Popular Movies...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Popular Movies
        </h2>
        <div>
          <button className="text-white" onClick={handleSeeMoreClick}>
            See more
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.slice(0, 10).map((movie) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
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
};
