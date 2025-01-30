"use client";

import { useState, useEffect } from "react";
import { PopularNext } from "./PopularNext";
import { First } from "./First";
import { ArrowR } from "./ArrowR";

export const PopularMovies = ({ setShowNext, showNext }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(3);

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
      console.log(data);

      return data.results;
    } catch (error) {
      setError(error.message);
      return [];
    }
  };
  console.log("page1");
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(page);
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, [page]);

  const handleSeeMoreClick = () => {
    setShowNext(true); // Show the next page of movies when clicked
  };

  if (loading) {
    return <div className="text-center">Loading Popular Movies...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // If showNext is true, render PopularNext with the current page and back button
  if (showNext) {
    return <PopularNext onBack={() => setShowNext(false)} currentPage={page} />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Popular Movies
        </h2>
        <div>
          <button
            className="text-white bg-gray-800 p-2 rounded-lg"
            onClick={handleSeeMoreClick}
          >
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
              className="w-full h-[340px] object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {movie.title}
              </h3>
              <div className="flex gap-[5px]">
                <img src="./Stat.png" className="h-[23px] w-[23px]" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rating: {movie.vote_average}/10
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
