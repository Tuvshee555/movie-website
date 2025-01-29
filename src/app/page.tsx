"use client"; // Ensure this is included at the top of your file

import { useState } from "react";
import { First } from "@/components/First";
import { PopularMovies } from "@/components/PopularMovies";
import { UpcomingMovies } from "@/components/UpcomingMovies";
import { TopRatedMovies } from "@/components/TopRatedMovies";

export default function Home() {
  const [showNext, setShowNext] = useState(false); // State to track if "See More" is clicked

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <First />
      <div className="max-w-7xl mx-auto p-4 space-y-12">
        <PopularMovies setShowNext={setShowNext} showNext={showNext} />
        
        {!showNext && <UpcomingMovies />}
        {!showNext && <TopRatedMovies />}
      </div>
    </div>
  );
}
