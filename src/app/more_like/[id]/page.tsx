"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  vote_average: number;
  overview: string;
  backdrop_path?: string;
  genres: { id: number; name: string }[];
}

export default function More_like () {
  const { id: movieId } = useParams();
  const numericMovieId = Number(movieId);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    if (!numericMovieId) return;

    const fetchSimilar = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${numericMovieId}/similar`,
          { params: { language: "en-US", api_key: API_KEY } }
        );
        setSimilar(response.data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [numericMovieId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      <h1 className="text-2xl font-semibold text-center text-black mb-6">
        More Like This
      </h1>
      <div className="grid grid-cols-4 gap-6 justify-items-center">
        {similar
          ?.filter((movie) => movie.poster_path) // Only include movies with images
          .slice(0, 20)
          .map((movie) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/moviecard/${movie.id}`)}
            >
              <img
                src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
                className="w-[190px] h-[281px]"
              />
              <div className="flex">
                <img src="/star.png" className="h-[16px]" />
                <h1>{movie.vote_average.toFixed(1)}</h1>
              </div>
              <h1>{movie.title}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};
