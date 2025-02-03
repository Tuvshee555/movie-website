"use client";

import { useEffect, useState } from "react";
import { First } from "./First";
import { useParams, useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
}

export const MovieCard = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { movieId } = useParams();
  const router = useRouter();

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

      const data: Movie = await response.json();
      console.log(data);

      return data;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
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

  if (loading)
    return <div className="text-center">Loading movie details...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!movie)
    return <div className="text-center text-gray-500">Movie not found.</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <First />

      <div className="p-4 max-w-2xl mx-auto text-white">
        <h1 className="text-2xl text-black font-[600]">{movie.title}</h1>
        <p className="mt-2 text-[red] font-[500]">{movie.overview}</p>
        <div className="flex gap-[32px]">
          {movie.poster_path && (
            <img
              src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
              className="rounded-[8px] h-[430] w-[288]"
            />
          )}
          {movie.backdrop_path && (
            <img
              src={`${TMDB_IMAGE_URL}/original${movie.backdrop_path}`}
              className="w-[760px] h-[430px] rounded-[8px] object-cover"
            />
          )}
        </div>
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
