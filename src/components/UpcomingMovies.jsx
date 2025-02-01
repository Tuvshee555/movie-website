"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UpcomingNext } from "./UpComingNext";


export const UpcomingMovies = ({ setShowNext, showNext }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  const fetchUpcomingMovies = async (pageNumber) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
      }

      const data = await response.json();
      console.log(data);

      return data.results;
    } catch (error) {
      setError(error.message);
      return [];
    }
  };
  console.log("pageUpComing");
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchUpcomingMovies(page);
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, [page]);

  const handleSeeMoreClick = (movieType) => {
    router.push(`/${movieType}`);
    setShowNext(true);
  };

  if (loading) {
    return <div className="text-center">Loading upcoming movies...</div>;
  }

  if (error) {
    return <div className="text-center text-[red]">Error: {error}</div>;
  }
  if (showNext) {
    return (
      <UpcomingNext onBack={() => setShowNext(false)} currentPage={page} />
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Upcoming Movies
        </h2>
        <div>
          <button
            className="text-white bg-[gray] p-2 rounded-[8px]"
            onClick={() => handleSeeMoreClick("upcoming")}
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
