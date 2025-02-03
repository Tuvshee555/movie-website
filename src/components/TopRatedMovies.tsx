"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { TopRatedNext } from "./TopRatedNext";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/components/MovieCard";

export const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  interface Movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
  }

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    axios
      .get(`${TMDB_BASE_URL}/movie/top_rated`, {
        params: { api_key: API_KEY, language: "en-US", page },
      })
      .then((res) => setMovies(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading)
    return <div className="text-center">Loading Top Rated Movies...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;


  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Top Rated Movies
        </h2>
        <button
          className="text-white bg-gray-800 p-2 rounded-lg h-[40px]"
          onClick={() => router.push(`toprated`)}
        >
          See more
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.slice(0, 10).map((movie:Movie) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            onClick={() => router.push(`/moviecard/${movie.id}`)}
          >
            <img
              src={
                movie.poster_path
                  ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}`
                  : "/fallback.jpg"
              }
              alt={movie.title}
              className="w-full h-[340px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ⭐ {movie.vote_average}/10
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
