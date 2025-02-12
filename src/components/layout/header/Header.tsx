"use client"

import { Moon } from "./Moon";
import { GenreDropdown } from "./GenreDropdown";
import { useRouter } from "next/navigation";
import { SearchBar } from "./SearchBar"

export const First = () => {
  const router = useRouter()
  return (
    <div className="bg-[black] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div onClick={() => router.push(`/`)} className="flex items-center space-x-3 cursor-pointer">
          <img  src="/film.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Movie Z</h1>
        </div>
        <div className="lg:flex hidden items-center space-x-4 ">
          <GenreDropdown />
          <SearchBar/> 
        </div>
        <button className="bg-[white] rounded-[8px] p-[8px]">
          <Moon />
        </button>
      </div>
    </div>
  );
};
