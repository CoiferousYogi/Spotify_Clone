import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import { Icon } from "@iconify/react/dist/iconify.js";
import songContext from "../../Contexts/songContext";
import { useContext } from "react";

const SongPlayerUI = () => {
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  const toggleSlider = () => {
    setIsSliderVisible(!isSliderVisible);
  };

  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  const { currentSong, setCurrentSong } = useContext(songContext);

  useEffect(() => {
    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong]);

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  //const { currentSong } = useContext(songContext);

  return (
    <div className="songPlayerUI w-full h-full bg-transparent grid grid-cols-12 p-0 m-0 bg-black">
      <div className="controlIcons col-span-3 flex flex-row justify-center items-center bg-transparent space-x-6">
        {/* Previous Icon */}
        <div className="previousIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:bg-gray-500 hover:bg-opacity-45 hover:cursor-pointer hover:scale-110">
          <Icon
            icon="fluent:previous-20-filled"
            width="20"
            height="20"
            color="white"
          />
        </div>
        {/* Play Icon */}
        <div>
          <Icon
            icon={isPaused ? "icon-park-solid:play" : "zondicons:pause-solid"}
            width="50"
            height="50"
            color="white"
            className="hover:scale-110 hover:cursor-pointer"
            onClick={togglePlayPause}
          />
        </div>
        {/* Next Icon */}
        <div className="nextIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:bg-gray-500 hover:bg-opacity-45 hover:cursor-pointer hover:scale-110">
          <Icon
            icon="fluent:next-20-filled"
            width="20"
            height="20"
            color="white"
          />
        </div>
        <div className="timeKeeper font-semibold text-xs text-neutral-300">
          <p>1:01 / 3:03</p>
        </div>
      </div>
      <div className="songCard bg-transparent col-span-6 flex flex-row items-center justify-center">
        <div
          className="iconImage w-14 h-14 bg-cover bg-center rounded-sm hover:cursor-pointer"
          style={{
            backgroundImage: `url("${currentSong.thumbnail}")`,
          }}
        ></div>
        <div className="songInfo flex flex-col space-x-4 mr-7">
          <span className="songName text-white font-semibold text-base ml-4">
            {currentSong.name}
          </span>
          <div className="songContent flex flex-row items-center justify-center">
            <span className="artistInfo text-gray-400 font-light text-sm">
              {currentSong.artist.firstName + " " + currentSong.artist.lastName}
            </span>
            <span>
              <Icon
                icon="icon-park-outline:dot"
                color="gray"
                width="0.7rem"
                height="0.7rem"
                className="mx-1 text-gray-400"
              />
            </span>
            <span className="albumInfo text-gray-400 text-sm hover:underline hover:cursor-pointer">
              Voicenotes
            </span>
          </div>
        </div>

        <div className="likeDislikeIcons flex flex-row items-center justify-evenly space-x-2">
          {/* Like Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            class="likeIcon hover:cursor-pointer fill-current hover:scale-125 hover:fill-current"
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
            width="30"
            height="30"
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
      </div>
      <div className="secondaryControls bg-transparent col-span-3 flex flex-row items-center">
        <div className="controlIcons w-full h-full bg-transparent">
          <div className="flex flex-row items-center justify-start h-full w-full bg-transparent">
            <div className="iconGrid grid grid-cols-12 h-full w-full">
              <div
                className="volButton col-span-6 flex flex-row-reverse items-center justify-center bg-transparent hover:cursor-pointer"
                onClick={toggleSlider}
                onMouseOver={toggleSlider}
              >
                {/* Volume Slider */}
                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="h-1.5 w-24 accent-red-500 hover:cursor-pointer"
                  />
                </div>
                {/* Mic Icon */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="white"
                        d="M13.26 3.3a1.1 1.1 0 0 1 1.734.78l.006.114v15.612a1.1 1.1 0 0 1-1.643.957l-.096-.062L6.68 16H4a2 2 0 0 1-1.995-1.85L2 14v-4a2 2 0 0 1 1.85-1.995L4 8h2.68zm6.407 3.483A7 7 0 0 1 22 12a7 7 0 0 1-2.333 5.217a1 1 0 1 1-1.334-1.49A5 5 0 0 0 20 12c0-1.48-.642-2.81-1.667-3.727a1 1 0 1 1 1.334-1.49m-2 2.236A4 4 0 0 1 19 11.999a4 4 0 0 1-1.333 2.982a1 1 0 0 1-1.422-1.4l.088-.09c.41-.368.667-.899.667-1.491a2 2 0 0 0-.548-1.376l-.119-.115a1 1 0 1 1 1.334-1.49"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="otherIcons col-span-6 flex flex-row items-center space-x-2">
                {/* Repeat Icon */}
                <svg
                  className="hover:cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="white"
                    d="M28 128a68.07 68.07 0 0 1 68-68h118.34l-17.17-17.17a4 4 0 0 1 5.66-5.66l24 24a4 4 0 0 1 0 5.66l-24 24a4 4 0 0 1-5.66-5.66L214.34 68H96a60.07 60.07 0 0 0-60 60a4 4 0 0 1-8 0m196-4a4 4 0 0 0-4 4a60.07 60.07 0 0 1-60 60H41.66l17.17-17.17a4 4 0 0 0-5.66-5.66l-24 24a4 4 0 0 0 0 5.66l24 24a4 4 0 1 0 5.66-5.66L41.66 196H160a68.07 68.07 0 0 0 68-68a4 4 0 0 0-4-4"
                  />
                </svg>
                {/* Shuffle Icon */}
                <svg
                  className="hover:cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="white"
                    d="M236.24 179.76a6 6 0 0 1 0 8.48l-24 24a6 6 0 0 1-8.48-8.48L217.52 190h-16.58a70.16 70.16 0 0 1-57-29.31l-41.71-58.4A58.11 58.11 0 0 0 55.06 78H32a6 6 0 0 1 0-12h23.06a70.16 70.16 0 0 1 57 29.31l41.71 58.4A58.11 58.11 0 0 0 200.94 178h16.58l-13.76-13.76a6 6 0 0 1 8.48-8.48Zm-92.06-74.41a5.9 5.9 0 0 0 3.48 1.12a6 6 0 0 0 4.89-2.51l1.19-1.67A58.11 58.11 0 0 1 200.94 78h16.58l-13.76 13.76a6 6 0 1 0 8.48 8.48l24-24a6 6 0 0 0 0-8.48l-24-24a6 6 0 0 0-8.48 8.48L217.52 66h-16.58a70.16 70.16 0 0 0-57 29.31L142.78 97a6 6 0 0 0 1.4 8.35m-32.36 45.3a6 6 0 0 0-8.37 1.39l-1.19 1.67A58.11 58.11 0 0 1 55.06 178H32a6 6 0 0 0 0 12h23.06a70.16 70.16 0 0 0 57-29.31l1.19-1.67a6 6 0 0 0-1.43-8.37"
                  />
                </svg>
                <Icon
                  icon="material-symbols-light:lyrics-sharp"
                  width="24"
                  height="24"
                  color="white"
                  className="hover:cursor-pointer"
                />
                <Icon
                  icon="material-symbols-light:devices-sharp"
                  width="24"
                  height="24"
                  color="white"
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPlayerUI;
