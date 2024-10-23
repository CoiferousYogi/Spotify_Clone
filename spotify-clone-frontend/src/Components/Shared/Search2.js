const SearchBarSm = () => {
  return (
    <div className="flex-1 mx-4">
      <div className="relative">
        <input
          type="text"
          placeholder="What do you want to play?"
          className="w-full bg-gray-900 text-white rounded-full pl-12 py-2 placeholder-gray-400 focus:outline-none"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m2.85-5.15A7.5 7.5 0 11.5 9a7.5 7.5 0 0115 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBarSm;
