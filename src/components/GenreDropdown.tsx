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
} from "@/components/ui/dropdown-menu"

interface Gener {
  id: number;
  key: string;
  name: string;
}

export const GenreDropdown = () => {
  const [genres, setGenres] = useState<Gener[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

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
      return null;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error {error}</h1>;

  return (
    <>
    <div className="z-40">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button >Genre</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-[500px] flex flex-col" >
        <DropdownMenuLabel className="text-[18px] font-[600]">Genres</DropdownMenuLabel>
        <DropdownMenuLabel>See lists of movies by genre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup >
          <DropdownMenuItem className="flex flex-wrap">
            {genres?.map((genres) => (
            <Button key={genres.id} onClick={() => router.push(`/genres/${genres.id}`)}>{genres.name}</Button>
          ))}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    </>
  );
};
