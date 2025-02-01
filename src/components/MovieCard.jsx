"use client";

import { useEffect, useState } from "react";
import { First } from "./First";

export const MovieCard = () => {
  const [MovieName, setMovieName] = useState("");
  const [MoviePhoto, setMoviePhoto] = useState("");
  const [Explan, setExplan] = useState("");
  const [Director, setDirector] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("3");

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${id}/credits?api-key=${API_KEY}&language=en-US`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      const data = await response.json();
      console.log(data);
      
      return data.results;
    } catch (error) {
      setError(error.messege);
      return [];
    }

   
  };
  console.log("Cards");
  console.log(Explan.overview);
  
  

  useEffect(() => {
    const loadExplain = async () => {
      setLoading(true);
      const data = await fetchMovies(page);
      setExplan(data);
      setLoading(false);
    };
    loadExplain()

  }, [page]);



  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <First />
      <div>
        <h1 className="text-[white] text-[16px]">{Explan.overview}</h1>
      </div>
    </div>
  );
};
