import { Icon } from "@iconify/react";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../../Utils/serverHelpers";

const TopMenu = ({ text, buttonText }) => {
  const [isSearchFocussed, setIsSearchFocussed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText,
    );
    setSongData(response.data);
    setSearchText("");
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 bg-transparent">
        {/* Left: Icon (Spotify icon / home) */}
        <div className="flex items-center space-x-4">
          <button className="focus:outline-none">
            <Icon icon="bi:spotify" color="white" height="33px" />
          </button>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-1 mx-8 bg-transparent w-full flex items-center align-middle justify-center">
          <div className="relative w-7/12">
            <input
              type="text"
              placeholder="What do you want to play?"
              className={`w-full bg-[#1f1f1f] text-white rounded-full pl-12 py-2 placeholder-gray-400 focus:outline-none ${isSearchFocussed ? "border border-white" : "transparent"}`}
              onFocus={() => {
                setIsSearchFocussed(true);
              }}
              onBlur={() => {
                setIsSearchFocussed(false);
              }}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchSong();
                }
              }}
            />
            {/* Search Icon inside the input */}
            <div className="absolute inset-y-0 left-0 pl-4 mt-1 flex items-center align-middle  justify-center pt-2 pointer-events-none w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                strokeWidth="1.5"
                strokeOpacity="1"
                className="bi bi-search w-7 h-7 text-gray-400"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Mic Icon inside the input */}
            <div className=" absolute inset-y-0 right-0 pl-4 mt-1 mr-2 flex items-center align-middle justify-center pt-2 pointer-events-none w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                strokeWidth="1.5"
                strokeOpacity="1"
                className="bi bi-mic w-8 h-8 text-gray-400 hover:cursor-pointer hover:text-white"
                viewBox="0 0 25 25"
              >
                <path
                  d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Sign Up and Log In Buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white">
            {buttonText}
          </button>
          <button className="bg-white text-black rounded-full py-2 px-4">
            {text}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default TopMenu;
