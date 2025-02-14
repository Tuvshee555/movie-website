"use client";

import { First } from "@/components/layout/header/Header";
import { CarouselDemo } from "@/components/CarouselDemo";
import { MoviesList } from "@/components/MovieList";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <First />
      <CarouselDemo />
      <div className="max-w-7xl mx-auto p-4 space-y-12">
        <MoviesList
          category="popular"
          title="Popular Movies"
        />
        <MoviesList
          category="top_rated"
          title="Top Rated Movies"
        />
        <MoviesList
          category="upcoming"
          title="Upcoming Movies"
        />
      </div>
    </div>
  );
}
