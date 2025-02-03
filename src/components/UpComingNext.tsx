"use client";

import { useEffect, useState } from "react";
import { First } from "./First";
import { useRouter } from "next/navigation";

export const UpcomingNext = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming movies");
        }

        const data = await response.json();
        setMovies(data.results);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, [API_KEY, TMDB_BASE_URL]);

  if (loading) {
    return <div>Loading upcoming movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <First />
      <div className="flex justify-center bg-black">
        <div>
          <div className="mt-[52px] flex justify-between bg-black">
            <h2 className="text-[30px] font-[600] text-white bg-[black]">
              Upcoming Movies - Page
            </h2>
            <button
              className="text-white bg-gray p-2 rounded-[8px]"
              onClick={() => router.back()}
            >
              ← Back
            </button>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {movies.map((movie: Movie) => (
              <div
                key={movie.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                onClick={() => router.push(`/moviecard/${movie.id}`)}
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
    </>
  );
};
