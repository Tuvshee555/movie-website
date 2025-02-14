"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { First } from "@/components/layout/header/Header";

const categories = {
  popular: { key: "Popular", title: "Popular Movies" },
  top_rated: { key: "Top rated", title: "Top Rated Movies" },
  upcoming: { key: "Upcoming", title: "Upcoming Movies" },
} as { [_key: string]: { key: string; title: string } };

export default function MoviesPage() {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData: { [key: string]: any[] } = {};
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_KEY, TMDB_BASE_URL]);

  console.log(movies);

  if (loading)
    return <div className="text-white text-center">Loading movies...</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      <First />
      <div className="max-w-7xl mx-auto p-4 space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            {categories[category].key}
          </h2>
          <div className="grid lg:grid-cols-5 gap-6">
            {movies?.slice(0, 20).map((movie: any) => (
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
    </div>
  );
}
