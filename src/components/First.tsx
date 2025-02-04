import { Moon } from "./Moon";
// import { Gener } from "./Gener";
export const First = () => {

  

  return (
    <div className="bg-[black] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <img src="/film.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Movie Z</h1>
        </div>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 rounded-md border-gray-300 dark:border-gray-700 bg-white text-gray-800">
            <option>Action</option>
            <option>Adventure</option>
            <option>Animation</option>
            <option>Comedy</option>
            <option>Crime</option>
            <option>Documentary</option>
            <option>Drama</option>
            <option>Family</option>
            <option>Fantasy</option>
            <option>Horror</option>
            <option>Music</option>
            <option>Mistery</option>
            <option>Romance</option>
            <option>Science</option>
            <option>TV Movie</option>
            <option>Thriller</option>
            <option>War</option>
            <option>Western</option>

          </select>
          {/* <Gener /> */}
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-md border-gray-300 dark:border-gray-700 bg-white text-gray-800"
          />
        </div>
        <button className="bg-[white] rounded-[8px] p-[8px]">
          <Moon />
        </button>
      </div>
    </div>
  );
};


// import { useEffect, useState } from "react";
// import { Moon } from "./Moon";
// import { Gener } from "./Gener"; // Import Gener component

// interface Genre {
//   id: number;
//   name: string;
// }

// export const First = () => {
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const response = await fetch(
//           `${TMDB_BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch genres");

//         const data = await response.json();
//         setGenres(data.genres || []);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGenres();
//   }, []);

//   return (
//     <div className="bg-[black] text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
//         <div className="flex items-center space-x-3">
//           <img src="/film.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-2xl font-bold">Movie Z</h1>
//         </div>

//         <div className="flex items-center space-x-4">
//           <select
//             className="px-3 py-2 rounded-md border-gray-300 dark:border-gray-700 bg-white text-gray-800"
//           >
//             {loading ? (
//               <option>Loading...</option>
//             ) : error ? (
//               <option>Error Loading Genres</option>
//             ) : (
//               genres.map((genre) => (
//                 <option key={genre.id} value={genre.id}>
//                   {genre.name}
//                 </option>
//               ))
//             )}
//           </select>

//           <input
//             type="text"
//             placeholder="Search"
//             className="px-4 py-2 rounded-md border-gray-300 dark:border-gray-700 bg-white text-gray-800"
//           />
//         </div>

//         <button className="bg-[white] rounded-[8px] p-[8px]">
//           <Moon />
//         </button>
//       </div>
//     </div>
//   );
// };
