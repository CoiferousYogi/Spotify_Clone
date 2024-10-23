import { Icon } from "@iconify/react";
//import SearchBar from "../Components/Shared/SearchBar";
import TopMenu from "../Components/Shared/TopMenu";
import { useState } from "react";
import "./Home.css";

const focusCardsData = [
  {
    title: "Happy Hits",
    description: "Hits to boost your mood and fill you with happiness",
    imgUrl:
      "https://images.pexels.com/photos/3979116/pexels-photo-3979116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const spotifyPlaylistsCardData = [
  {
    title: "This is one",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const HomeComponent = () => {
  return (
    <div className="mainComponent w-full h-full flex flex-col bg-black">
      <div className="headerMenu w-full mb-2">
        <TopMenu className="w-full" buttonText="Log In" text="Sign Up" />
      </div>
      <br></br>
      <br></br>
      <div className="parent flex flex-col h-5/6 w-full px-2 py-2 overflow-x-hidden">
        <div className="grid grid-cols-12 gap-2 h-5/6 w-full bg-transparent overflow-hidden">
          {/* This div is the parent grid div */}
          <div className="leftPanel col-span-3 bg-[#191414] rounded-lg px-2 py-2 pb-10">
            {/* Sidebar on the left side */}

            {/* div for the Library component */}
            <div className="librarySection flex flex-row align-middle py-5 pl-5 justify-between">
              <div className="iconText flex flex-row align-middle items-center justify-center hover:cursor-pointer">
                <Icon
                  icon="fluent:library-32-filled"
                  color="#9CA3AF"
                  height="30px"
                  className="hover:fill-white"
                />
                <p className=" text-gray-400 font-bold text-lg pl-2 hover:text-white">
                  Your Library
                </p>
              </div>
              <button className="rounded-full bg-transparent w-6 h-6 flex flex-row align-middle items-center justify-center mr-3 hover:bg-[#1f1f1f]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#9CA3AF"
                    d="M222 128a6 6 0 0 1-6 6h-82v82a6 6 0 0 1-12 0v-82H40a6 6 0 0 1 0-12h82V40a6 6 0 0 1 12 0v82h82a6 6 0 0 1 6 6"
                    className="hover:fill-white"
                  />
                </svg>
              </button>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <div className="flex flex-col">
              {/* Create Playlist button */}
              <div className="bg-[#1f1f1f] min-h-[120px] w-full rounded-lg flex flex-col align-middle mb-5 hover:cursor-pointer">
                <div className="textContent bg-transparent w-11/12 h-5 my-4 mx-4 mb-4 pb-6">
                  <p className="mainText text-white font-medium">
                    Create your first playlist
                  </p>
                  <p className="subText text-white font-medium text-xs pt-1">
                    It's easy, we'll help you
                  </p>
                </div>
                <button className="actionCallButton bg-white rounded-full w-5/12 h-7 my-4 mx-4 mb-4 text-black font-medium text-sm hover:scale-105">
                  Create Playlist
                </button>
              </div>

              {/* Follow Podcasts Button */}
              <div className="bg-[#1f1f1f] min-h-[120px] w-full rounded-lg flex flex-col align-middle mb-5 hover:cursor-pointer">
                <div className="textContent bg-transparent w-11/12 h-5 my-4 mx-4 mb-4 pb-6">
                  <p className="mainText text-white font-medium">
                    Let's find some podcasts to follow
                  </p>
                  <p className="subText text-white font-medium text-xs pt-1">
                    We'll keep you updated with latest episodes
                  </p>
                </div>
                <button className="actionCallButton bg-white rounded-full w-5/12 h-7 my-4 mx-4 mb-4 text-black font-medium text-sm hover:scale-105">
                  Browse Podcasts
                </button>
              </div>
            </div>

            <div className="px-2 pt-40">
              <div className="border border-gray-700 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                <Icon icon="carbon:earth-europe-africa" />
                <div className="ml-2 text-sm font-semibold">English</div>
              </div>
            </div>
          </div>

          <div className="mainContent col-span-9 bg-[#191414] rounded-lg overflow-y-scroll">
            {/* Main content on right side */}
            <div className="content p-8 pt-0 overflow-y-visible">
              <PlaylistView titleText="Focus" cardsData={focusCardsData} />
              <PlaylistView
                titleText="Spotify Playlists"
                cardsData={spotifyPlaylistsCardData}
              />
              <PlaylistView
                titleText="Sound of India"
                cardsData={focusCardsData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="playlistName flex flex-row items-center justify-between">
        <div className="text-2xl font-semibold mb-5 hover:underline hover:cursor-pointer">
          {titleText}
        </div>
        <div className="text-sm font-semibold mb-5 hover:underline hover:cursor-pointer">
          See More
        </div>
      </div>
      <div className="w-full flex justify-between space-x-4">
        {
          // cardsData will be an array
          cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-transparent w-1/5 shadow-lg rounded-lg p-3 hover:cursor-pointer hover:scale-105 hover:bg-[#1f1f1f]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative">
        <img
          className="w-full h-32 md:w-72 block rounded"
          src={imgUrl}
          alt={title}
        />
        <div
          className={`absolute bg-black rounded bg-opacity-0 ${
            isHovered ? "bg-opacity-60" : ""
          } w-full h-full top-0 flex items-center ${
            isHovered ? "opacity-100" : "opacity-0"
          } transition justify-evenly`}
        >
          <button className="hover:scale-110 text-white transform translate-y-3 group-hover:translate-y-0 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </button>

          <button className="hover:scale-110 text-white transform translate-y-3 group-hover:translate-y-0 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
            </svg>
          </button>

          <button className="hover:scale-110 text-white transform translate-y-3 group-hover:translate-y-0 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-white text-base font-semibold text-left w-full py-1">
          {title}
        </h3>
        <p className="text-gray-400 font-light text-xs">{description}</p>
      </div>
    </div>
  );
};

export default HomeComponent;
