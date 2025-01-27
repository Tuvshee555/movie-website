export const First = () => {
  return (
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
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"></button>
        </div>
      </div>
    </>
  );
};
