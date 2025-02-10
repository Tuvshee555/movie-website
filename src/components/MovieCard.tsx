

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { First } from "./Header";
import { useParams, useRouter } from "next/navigation";
import { Trailer } from "./Trailer";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
}

export const MovieCard = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { movieId } = useParams();
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const response = await axios.get<Movie>(`${TMDB_BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });

        setMovie(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <div className="text-center">Loading movie details...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!movie) return <div className="text-center text-gray-500">Movie not found.</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <First />

      <div className="p-4 mx-auto text-white">
        <h1 className="text-2xl text-black font-semibold">{movie.title}</h1>
        <p className="mt-2 text-red-500 font-medium">{movie.overview}</p>

        <div className="flex gap-8 justify-center mt-4">
          {movie.poster_path && (
            <img
              src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
              className="rounded-lg h-[430px] w-[288px] object-cover"
              alt={movie.title}
            />
          )}

          <div>
            {movie.backdrop_path && (
              <img
                src={`${TMDB_IMAGE_URL}/original${movie.backdrop_path}`}
                className="w-[760px] h-[430px] rounded-lg object-cover"
                alt={movie.title}
              />
            )}
            <Trailer />
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-4">
          {movie.genres?.map((g) => (
            <span key={g.id} className="text-lg text-green-500 font-semibold">
              {g.name}
            </span>
          ))}
        </div>

        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => router.push(`/`)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

