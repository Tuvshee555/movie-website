import {Moon} from "./Moon"
export const First = () => {
  return (

    <div className="bg-[black] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <img src="/film.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Movie Z</h1>
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="px-3 py-2 rounded-md border-gray-300 dark:border-gray-700 bg-white text-gray-800"
          >
            <option>Genre</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-md border-gray-300 dark:border-gray-700 bg-white text-gray-800"
          />
        </div>
        <button>
          <img src="/moon.png" alt="Theme Toggle" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
