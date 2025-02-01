import {Moon} from "./Moon"
export const First = () => {
  return (
<<<<<<< HEAD
    <>
      <div className="flex justify-center w-screen h-screen">
        <div className="w-[70%] h-[36px] bg-green-500 flex  items-center justify-between gap-[12px]">
          <div className="flex gap-[8px] items-center">
            <img className="w-[20px] h-[20px]" src="./film.png" />
            <h1 className="text-[16px] text-[#4338ca]">Movie Z</h1>
          </div>
          <div className="flex gap-[8px] items-center">
            <div> helo</div>
            <div> helo </div>
          </div>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"><Moon/></button>
=======
    <div className="bg-[black] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <img src="/film.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Movie Z</h1>
>>>>>>> cea75b5e07e548902b440efd93b20cedd43ac098
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
