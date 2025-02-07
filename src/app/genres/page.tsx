"use client";
import { First } from "@/components/First";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Gener {
  id: number;
  name: string;
}
interface Movie {
  id: string;
  title: string;
  vote_average: number;
  poster_path: string;
}

export default function Home({}) {
  const [genres, setGenres] = useState<Gener[]>([]);
  // const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const rawGenreIds = searchParams.get("genreIds");
  const genreIds = rawGenreIds ? rawGenreIds.split(",") : [];

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const IMAGE_PATH = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
          params: {
            language: "en-US",
            api_key: API_KEY,
          },
        });
        setGenres(response.data.genres);
        console.log(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoadingMovies(true);
      setLoading(true);
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
          params: {
            language: "en-US",
            api_key: API_KEY,
            with_genres: genreIds.length > 0 ? genreIds.join(",") : undefined,
          },
        });
        setMovies(response.data.results);
        console.log(response);
      } catch (error: any) {
        setError(error.message);
        return null;
      } finally {
        setLoading(false);
        setLoadingMovies(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleSelected = (id: string) => {
    const params = new URLSearchParams(searchParams);
    const updatedGenres = genreIds.includes(id)
      ? genreIds.filter((g) => g !== id)
      : [...genreIds, id];

    params.set("genreIds", updatedGenres.join(","));
    router.push(`/genres?${params.toString()}`);
  };

  if (error) return <div className="flex justify-center">Error: {error}</div>;

  console.log("movies", movies);

  return (
    <>
      <First />
      <button
        className="text-white bg-gray-800 p-2 rounded-lg flex justify-center"
        onClick={() => router.back()}
      >
        back
      </button>
      <div className="flex gap-6 p-4 justify-evenly">
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-2">Genres</h2>
          <div className="flex flex-wrap gap-[8px]">
            {loading && genres.length === 0
              ? [...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-8 w-24 bg-gray-300 rounded-[8px]"
                  />
                ))
              : genres.map((genres: Gener) => (
                  <button
                    key={genres.id}
                    className={`p-2 cursor-pointer rounded-[8px] ${
                      genreIds.includes(String(genres.id))
                        ? "bg-[white] text-black border border-gray-800"
                        : "bg-black text-white"
                    }`}
                    onClick={() => handleSelected(String(genres.id))}
                  >
                    {genres.name}
                  </button>
                ))}
          </div>
        </div>
        <div className="bg-white w-1/2 grid grid-cols-5 gap-4 ">
          {loadingMovies
            ? [...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="cursor-pointer border border-black rounded-[8px] bg-gray-800"
                >
                  <Skeleton className="h-[244px] w-[165px] bg-gray-300 rounded-t-[8px]" />
                  <Skeleton className="h-6 w-24 bg-gray-400 m-2 rounded-md" />
                  <Skeleton className="h-6 w-24 bg-gray-400 m-2 rounded-md" />
                </div>
              ))
            : movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => router.push(`/moviecard/${movie.id}`)}
                  className="cursor-pointer border border-black rounded-[8px] bg-gray-800"
                >
                  <img
                    className="h-[244px] w-[165px] rounded-t-[8px]"
                    src={`${IMAGE_PATH}/w500${movie.poster_path}`}
                  />
                  <h1 className="text-start text-yellow-800">
                    {movie.vote_average.toFixed(1)}
                  </h1>
                  <h1 className="text-start font-semibold"> {movie.title}</h1>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
