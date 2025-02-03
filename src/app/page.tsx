"use client";

import { First } from "@/components/First";
import { UpcomingMovies } from "@/components/UpcomingMovies";
import { TopRatedMovies } from "@/components/TopRatedMovies";
import { PopularMovies } from "@/components/PopularMovies";
import { CarouselDemo } from "@/components/CarouselDemo";

export default function Home() {

  return (
    <div className="bg-black min-h-screen text-white">
      <First />
      <CarouselDemo />

      <div className="max-w-7xl mx-auto p-4 space-y-12">
        <PopularMovies />
        <UpcomingMovies />
        <TopRatedMovies />
      </div>
    </div>
  );
}
