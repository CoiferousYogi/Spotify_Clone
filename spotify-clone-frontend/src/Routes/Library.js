import { useNavigate } from "react-router";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/serverHelpers";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      <div className="text-white text-xl p-5 font-semibold hover:underline hover:cursor-pointer">
        My Playlists
      </div>
      <div className="py-5 grid gap-5 grid-cols-5 p-5">
        {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="bg-transparent w-full shadow-lg rounded-lg p-3 hover:cursor-pointer hover:scale-105 hover:bg-[#1f1f1f]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate("/playlist/" + playlistId);
      }}
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

export default Library;
