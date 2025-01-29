"use client"

import { useEffect, useState } from "react"
import { First } from "./First"

export const MovieCard = () => {
    const [MovieName, setMovieName] = useState("")
    const [MoviePhoto, setMoviePhoto] = useState("")
    const [Explan, setExplan] = useState("")
    const [Director, setDirector] = useState("")

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
    const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

    const fetchMovies = async ()




    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
          <First />
          <div className="max-w-7xl mx-auto p-4 space-y-12">
            <div></div>
          </div>
        </div>
      );
}