"use client";

import { useEffect, useState } from "react";
import { First } from "./First";
import { useParams, useRouter } from "next/navigation";

export const MovieCard = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams(); 
  const router = useRouter();
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      return data; 
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchMovie();
      setMovie(data);
      setLoading(false);
    };
    if (movieId) loadMovie();
  }, [movieId]);

  if (loading) return <div className="text-center">Loading movie details...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!movie) return <div className="text-center text-gray-500">Movie not found.</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <First />
      <div className="p-4 max-w-2xl mx-auto text-white">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="mt-2 text-gray-300">{movie.overview}</p>
        {movie.poster_path && (
          <img
            src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
            alt={movie.title}
            className="mt-4 rounded-lg shadow-lg"
          />
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => router.back()} 
        >
          ← Back
        </button>
      </div>
    </div>
  );
};
