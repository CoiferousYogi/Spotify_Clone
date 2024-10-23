const SearchBar = () => {
  return (
    <form className="flex items-center max-w-lg mx-auto">
      <label for="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="voice-search"
          className="bg-[#191414] border border-gray-300 text-gray-900 text-base rounded-full focus:ring-white focus:border-white block w-full ps-10 p-2.5  dark:bg-[#191414] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white dark:hover:border-white"
          placeholder="What do you want to play?"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
            />
          </svg>
        </button>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ms-2 text-base font-medium text-white bg-[#191414] rounded-full border border-gray-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#191414] dark:hover:border-white dark:hover:bg-[#1db954] dark:focus:ring-white"
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
