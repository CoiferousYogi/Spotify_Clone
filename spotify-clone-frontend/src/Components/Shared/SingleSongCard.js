import { Icon } from "@iconify/react/dist/iconify.js";
import "./SingleSongCard.css";
import { useContext } from "react";
import songContext from "../../Contexts/songContext";

const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  return (
    <div
      className="flex bg-transparent rounded-sm"
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div
        className="songImage group relative display-block w-14 h-14 bg-cover bg-center rounded-sm hover:cursor-pointer"
        style={{
          backgroundImage: `url("${info.thumbnail}" )`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 14 14"
          className="playPauseButton ml-4 mt-4 transition transform 
            ease-in-out invisible 
            absolute group-hover:visible"
        >
          <path
            fill="white"
            fillRule="evenodd"
            d="M2.676.02a1.74 1.74 0 0 0-.845.218a1.64 1.64 0 0 0-.895 1.433v10.677a1.64 1.64 0 0 0 .895 1.433a1.74 1.74 0 0 0 1.718-.016l8.63-5.338a1.61 1.61 0 0 0-.001-2.876L3.548.253A1.74 1.74 0 0 0 2.676.02"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="songInfo w-full grid grid-cols-12 bg-transparent">
        <div className="Content col-span-8 rounded-sm px-4 flex flex-col justify-evenly bg-transparent">
          <div className="songName text-white text-base hover:cursor-pointer">
            {info.name}
          </div>
          <div className="artistAlbumInfo text-gray-400 flex flex-row items-center">
            <span className="text-sm hover:underline hover:cursor-pointer">
              {info.artist.firstName + " " + info.artist.lastName}
            </span>
            <span>
              <Icon
                icon="icon-park-outline:dot"
                color="gray"
                width="0.7rem"
                height="0.7rem"
                className="mx-1"
              />
            </span>
            <span className="text-sm hover:underline hover:cursor-pointer">
              Voicenotes
            </span>
          </div>
        </div>
        <div className="likeDislikeIcons col-span-2 rounded-sm bg-transparent flex flex-row justify-evenly items-center">
          {/* Like Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="likeIcon hover:cursor-pointer hover:scale-125"
          >
            <g fill="white">
              <path
                fill="white"
                d="m15 10l-.493-.082A.5.5 0 0 0 15 10.5zM4 10v-.5a.5.5 0 0 0-.5.5zm16.522 2.392l.49.098zM6 20.5h11.36v-1H6zm12.56-11H15v1h3.56zm-3.067.582l.806-4.835l-.986-.165l-.806 4.836zM14.82 3.5h-.213v1h.213zm-3.126 1.559L9.178 8.832l.832.555l2.515-3.774zM7.93 9.5H4v1h3.93zM3.5 10v8h1v-8zm16.312 8.49l1.2-6l-.98-.196l-1.2 6zM9.178 8.832A1.5 1.5 0 0 1 7.93 9.5v1a2.5 2.5 0 0 0 2.08-1.113zm7.121-3.585A1.5 1.5 0 0 0 14.82 3.5v1a.5.5 0 0 1 .494.582zM18.56 10.5a1.5 1.5 0 0 1 1.471 1.794l.98.196a2.5 2.5 0 0 0-2.45-2.99zm-1.2 10a2.5 2.5 0 0 0 2.452-2.01l-.98-.196A1.5 1.5 0 0 1 17.36 19.5zm-2.754-17a3.5 3.5 0 0 0-2.913 1.559l.832.554a2.5 2.5 0 0 1 2.08-1.113zM6 19.5A1.5 1.5 0 0 1 4.5 18h-1A2.5 2.5 0 0 0 6 20.5z"
              />
              <path stroke="white" d="M8 10v10" />
            </g>
          </svg>
          {/* Dislike Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="dislikeIcon hover:cursor-pointer hover:scale-125"
          >
            <g fill="none">
              <path
                fill="white"
                d="m15 14l-.493.082A.5.5 0 0 1 15 13.5zM4 14v.5a.5.5 0 0 1-.5-.5zm16.522-2.392l.49-.098zM6 3.5h11.36v1H6zm12.56 11H15v-1h3.56zm-3.067-.582l.806 4.835l-.986.165l-.806-4.836zM14.82 20.5h-.213v-1h.213zm-3.126-1.558l-2.515-3.774l.832-.555l2.515 3.774zM7.93 14.5H4v-1h3.93zM3.5 14V6h1v8zm16.312-8.49l1.2 6l-.98.196l-1.2-6zM9.178 15.168A1.5 1.5 0 0 0 7.93 14.5v-1a2.5 2.5 0 0 1 2.08 1.113zm7.121 3.585a1.5 1.5 0 0 1-1.48 1.747v-1a.5.5 0 0 0 .494-.582zM18.56 13.5a1.5 1.5 0 0 0 1.471-1.794l.98-.196a2.5 2.5 0 0 1-2.45 2.99zm-1.2-10a2.5 2.5 0 0 1 2.452 2.01l-.98.196A1.5 1.5 0 0 0 17.36 4.5zm-2.754 17a3.5 3.5 0 0 1-2.913-1.558l.832-.555a2.5 2.5 0 0 0 2.08 1.113zM6 4.5A1.5 1.5 0 0 0 4.5 6h-1A2.5 2.5 0 0 1 6 3.5z"
              />
              <path stroke="white" d="M8 14V4" />
            </g>
          </svg>
          {/* Menu Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="kebabMenu hover:cursor-pointer hover:scale-125"
          >
            <path
              fill="none"
              stroke="white"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z"
            />
          </svg>
        </div>
        <div className="songDuration col-span-2 rounded-sm text-white flex flex-row items-center justify-evenly">
          3:32
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
