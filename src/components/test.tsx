"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Genre {
  id: number;
  name: string;
}

export const GenreDropdown = () => {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
        params: {
          language: "en-US",
          api_key: API_KEY,
        },
      });

      setGenres(response.data.genres);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="z-40">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Genre</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuLabel className="text-lg font-semibold">
            Genres
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-sm text-gray-500">
            See lists of movies by genre
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {genres?.map((genre) => (
              <DropdownMenuItem key={genre.id} asChild>
                <Button
                  onClick={() => {
                    setSelectedGenre(genre.id);
                    router.push(`/genres/${genre.id}`);
                  }}
                  className={`text-[18px] font-[600] ${
                    selectedGenre === genre.id
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {genre.name}
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
