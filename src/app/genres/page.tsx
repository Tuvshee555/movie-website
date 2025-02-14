"use client";
import { First } from "@/components/layout/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { Skeleton } from "@/components/ui/skeleton";

interface Genre {
  id: number;
  name: string;
}
interface Movie {
  id: string;
  title: string;
  vote_average: number;
  poster_path: string | null;
  total_results: string | null
}

export default function Genres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0)
  const [loading, setLoading] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const rawGenreIds = searchParams.get("genreIds");
  const genreIds = rawGenreIds ? rawGenreIds.split(",") : [];
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const IMAGE_PATH = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
          params: { language: "en-US", api_key: API_KEY },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoadingMovies(true);
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
          params: {
            language: "en-US",
            api_key: API_KEY,
            with_genres: genreIds.length > 0 ? genreIds.join(",") : undefined,
            page: currentPage,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setTotalMovies(response.data.total_results)
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
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
    params.set("page", "1"); // Reset to first page when filtering
    router.push(`/genres?${params.toString()}`);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (selected + 1).toString());
    router.push(`/genres?${params.toString()}`);
  };

  return (
    <>
      <First />
      <div className="flex gap-6 p-4 justify-evenly">
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-2">Genres</h2>
          <div className="flex flex-wrap gap-[8px]">
            {loading
              ? [...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-8 w-24 bg-gray-300 rounded-[8px]" />
                ))
              : genres.map((genre) => (
                  <button
                    key={genre.id}
                    className={`p-2 cursor-pointer rounded-[8px] ${
                      genreIds.includes(String(genre.id))
                        ? "bg-white text-black border border-gray-800"
                        : "bg-black text-white"
                    }`}
                    onClick={() => handleSelected(String(genre.id))}
                  >
                    {genre.name}
                  </button>
                ))}
          </div>
        </div>

       
        <div className="bg-white w-1/2 grid grid-cols-5 gap-4">
        
          {loadingMovies
            ? [...Array(10)].map((_, index) => (
                <div key={index} className="cursor-pointer border border-black rounded-[8px] bg-gray-800">
                  <Skeleton className="h-[244px] w-[165px] bg-gray-300 rounded-t-[8px]" />
                  <Skeleton className="h-6 w-24 bg-gray-400 m-2 rounded-md" />
                  <Skeleton className="h-6 w-24 bg-gray-400 m-2 rounded-md" />
                </div>
              ))
            : movies.filter((movie) => {
              if (movie.poster_path !== null) {
                return movie.poster_path !== null
              }
            }).map((movie) => (
              
                <div key={movie.id} onClick={() => router.push(`/moviecard/${movie.id}`)} className="cursor-pointer border border-black rounded-[8px] bg-gray-800">
                  {movie.poster_path ? (
                    <img className="h-[244px] w-[165px] rounded-t-[8px]" src={`${IMAGE_PATH}/w500${movie.poster_path}`} alt={movie.title} />
                  ) : (
                    <div className="h-[244px] w-[165px] bg-gray-400 flex items-center justify-center rounded-t-[8px]">
                      <span className="text-gray-600">No Image</span>
                    </div>
                  )}
                  <h1 className="text-start text-yellow-800">{movie.vote_average.toFixed(1)}</h1>
                  <h1 className="text-start font-semibold">{movie.title}</h1>
                </div>
              ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel="‹ Previous"
          nextLabel="Next ›"
          breakLabel="..."
          pageCount={totalPages} // No limit, use the actual total pages
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="flex gap-2 text-white bg-black p-2 rounded-lg"
          pageClassName="px-3 py-1 rounded-md cursor-pointer"
          activeClassName="bg-white text-black"
          previousClassName="px-3 py-1 rounded-md cursor-pointer"
          nextClassName="px-3 py-1 rounded-md cursor-pointer"
          breakClassName="px-3 py-1"
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
}
