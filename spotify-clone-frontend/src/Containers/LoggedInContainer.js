import { Icon } from "@iconify/react";
import TopMenu from "../Components/Shared/TopMenu";
import { useLayoutEffect, useContext, useState, useRef } from "react";
import songContext from "../Contexts/songContext";
import { Howl, Howler } from "howler";
import IconText from "../Components/Shared/IconText";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../Utils/serverHelpers";
//import { makeAuthenticatedGETRequest } from "../Utils/serverHelpers";
//import { useParams } from "react-router";
//import { useEffect } from "react";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    // the following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload,
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

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
  //   return (
  //     <div className="mainComponent w-full h-full flex flex-col bg-black">
  //       <div className={`${currentSong ? "h-9/10" : "h-full"} w-full bg-black`}>
  //         <div className="headerMenu w-full mb-2">
  //           <TopMenu className="w-full" text="RP" buttonText="Add Songs" />
  //         </div>
  //         <br />
  //         <br />
  //         <div className="parent flex flex-col h-full w-full bg-transparent px-2 py-2 overflow-x-hidden">
  //           <div className="grid grid-cols-12 gap-2 h-full bg-transparent overflow-hidden">
  //             {/* This div is the parent grid div */}
  //             <div className="leftPanel col-span-3 h-full bg-[#191414] rounded-lg px-2 py-2 overflow-hidden">
  //               {/* Sidebar on the left side */}
  //               <div className="librarySection flex flex-row align-middle py-5 pl-5 justify-between">
  //                 <div className="iconText flex flex-row align-middle items-center justify-center hover:cursor-pointer">
  //                   <Icon
  //                     icon="fluent:library-32-filled"
  //                     color="#9CA3AF"
  //                     height="30px"
  //                     className="hover:fill-white"
  //                   />
  //                   <p className="text-gray-400 font-bold text-lg pl-2 hover:text-white">
  //                     Your Library
  //                   </p>
  //                 </div>
  //                 <button className="rounded-full bg-transparent w-6 h-6 flex flex-row align-middle items-center justify-center mr-3 hover:bg-[#1f1f1f]">
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     width="1.5em"
  //                     height="1.5em"
  //                     viewBox="0 0 256 256"
  //                   >
  //                     <path
  //                       fill="#9CA3AF"
  //                       d="M222 128a6 6 0 0 1-6 6h-82v82a6 6 0 0 1-12 0v-82H40a6 6 0 0 1 0-12h82V40a6 6 0 0 1 12 0v82h82a6 6 0 0 1 6 6"
  //                       className="hover:fill-white"
  //                     />
  //                   </svg>
  //                 </button>
  //               </div>

  //               <br />
  //               <br />
  //               <br />

  //               <div className="flex flex-col">
  //                 <IconText
  //                   iconName={"material-symbols:home"}
  //                   displayText={"Home"}
  //                 />
  //                 <IconText
  //                   iconName={"mdi:compass-outline"}
  //                   displayText={"Explore"}
  //                 />
  //                 <IconText
  //                   iconName={"material-symbols:add-box"}
  //                   displayText={"Create Playlist"}
  //                 />
  //                 <IconText
  //                   iconName={"mdi:cards-heart"}
  //                   displayText={"Liked Songs"}
  //                 />
  //                 <IconText
  //                   iconName={"iconamoon:music-album-light"}
  //                   displayText={"My Music"}
  //                   active
  //                 />
  //               </div>
  //             </div>

  //             <div className="px-2 pt-40">
  //               <div className="border border-gray-700 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
  //                 <Icon icon="carbon:earth-europe-africa" />
  //                 <div className="ml-2 text-sm font-semibold">English</div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="mainContent col-span-9 bg-[#191414] rounded-lg overflow-y-auto">
  //             {/* Main content on right side */}
  //             <div className="content p-8 pt-0">{children}</div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* This is song Player UI */}
  //       {currentSong && (
  //         <div className="songPlayer bg-transparent h-1/10 w-full grid grid-cols-12 bg-black">
  //           <div className="controlIcons col-span-3 flex flex-row justify-center items-center bg-transparent space-x-6">
  //             {/* Previous Icon */}
  //             <div className="previousIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:bg-gray-500 hover:bg-opacity-45 hover:cursor-pointer hover:scale-110">
  //               <Icon
  //                 icon="fluent:previous-20-filled"
  //                 width="20"
  //                 height="20"
  //                 color="white"
  //               />
  //             </div>
  //             {/* Play Icon */}
  //             <div>
  //               <Icon
  //                 icon={
  //                   isPaused ? "icon-park-solid:play" : "zondicons:pause-solid"
  //                 }
  //                 width="50"
  //                 height="50"
  //                 color="white"
  //                 className="hover:scale-110 hover:cursor-pointer"
  //                 onClick={togglePlayPause}
  //               />
  //             </div>
  //             {/* Next Icon */}
  //             <div className="nextIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:bg-gray-500 hover:bg-opacity-45 hover:cursor-pointer hover:scale-110">
  //               <Icon
  //                 icon="fluent:next-20-filled"
  //                 width="20"
  //                 height="20"
  //                 color="white"
  //               />
  //             </div>
  //             <div className="timeKeeper font-semibold text-xs text-neutral-300">
  //               <p>1:01 / 3:03</p>
  //             </div>
  //           </div>
  //           <div className="songCard bg-transparent col-span-6 flex flex-row items-center justify-center">
  //             <div
  //               className="iconImage w-14 h-14 bg-cover bg-center rounded-sm hover:cursor-pointer"
  //               style={{
  //                 backgroundImage: `url("${currentSong.thumbnail}")`,
  //               }}
  //             ></div>
  //             <div className="songInfo flex flex-col space-x-4 mr-7">
  //               <span className="songName text-white font-semibold text-base ml-4">
  //                 {currentSong.name}
  //               </span>
  //               <div className="songContent flex flex-row items-center justify-center">
  //                 <span className="artistInfo text-gray-400 font-light text-sm">
  //                   {currentSong.artist.firstName +
  //                     " " +
  //                     currentSong.artist.lastName}
  //                 </span>
  //                 <span>
  //                   <Icon
  //                     icon="icon-park-outline:dot"
  //                     color="gray"
  //                     width="0.7rem"
  //                     height="0.7rem"
  //                     className="mx-1 text-gray-400"
  //                   />
  //                 </span>
  //                 <span className="albumInfo text-gray-400 text-sm hover:underline hover:cursor-pointer">
  //                   Voicenotes
  //                 </span>
  //               </div>
  //             </div>

  //             <div className="likeDislikeIcons flex flex-row items-center justify-evenly space-x-2">
  //               {/* Like Icon */}
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="white"
  //                 width="30"
  //                 height="30"
  //                 viewBox="0 0 24 24"
  //                 class="likeIcon hover:cursor-pointer fill-current hover:scale-125 hover:fill-current"
  //               >
  //                 <g fill="white">
  //                   <path
  //                     fill="white"
  //                     d="m15 10l-.493-.082A.5.5 0 0 0 15 10.5zM4 10v-.5a.5.5 0 0 0-.5.5zm16.522 2.392l.49.098zM6 20.5h11.36v-1H6zm12.56-11H15v1h3.56zm-3.067.582l.806-4.835l-.986-.165l-.806 4.836zM14.82 3.5h-.213v1h.213zm-3.126 1.559L9.178 8.832l.832.555l2.515-3.774zM7.93 9.5H4v1h3.93zM3.5 10v8h1v-8zm16.312 8.49l1.2-6l-.98-.196l-1.2 6zM9.178 8.832A1.5 1.5 0 0 1 7.93 9.5v1a2.5 2.5 0 0 0 2.08-1.113zm7.121-3.585A1.5 1.5 0 0 0 14.82 3.5v1a.5.5 0 0 1 .494.582zM18.56 10.5a1.5 1.5 0 0 1 1.471 1.794l.98.196a2.5 2.5 0 0 0-2.45-2.99zm-1.2 10a2.5 2.5 0 0 0 2.452-2.01l-.98-.196A1.5 1.5 0 0 1 17.36 19.5zm-2.754-17a3.5 3.5 0 0 0-2.913 1.559l.832.554a2.5 2.5 0 0 1 2.08-1.113zM6 19.5A1.5 1.5 0 0 1 4.5 18h-1A2.5 2.5 0 0 0 6 20.5z"
  //                   />
  //                   <path stroke="white" d="M8 10v10" />
  //                 </g>
  //               </svg>
  //               {/* Dislike Icon */}
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="30"
  //                 height="30"
  //                 viewBox="0 0 24 24"
  //                 className="dislikeIcon hover:cursor-pointer hover:scale-125"
  //               >
  //                 <g fill="none">
  //                   <path
  //                     fill="white"
  //                     d="m15 14l-.493.082A.5.5 0 0 1 15 13.5zM4 14v.5a.5.5 0 0 1-.5-.5zm16.522-2.392l.49-.098zM6 3.5h11.36v1H6zm12.56 11H15v-1h3.56zm-3.067-.582l.806 4.835l-.986.165l-.806-4.836zM14.82 20.5h-.213v-1h.213zm-3.126-1.558l-2.515-3.774l.832-.555l2.515 3.774zM7.93 14.5H4v-1h3.93zM3.5 14V6h1v8zm16.312-8.49l1.2 6l-.98.196l-1.2-6zM9.178 15.168A1.5 1.5 0 0 0 7.93 14.5v-1a2.5 2.5 0 0 1 2.08 1.113zm7.121 3.585a1.5 1.5 0 0 1-1.48 1.747v-1a.5.5 0 0 0 .494-.582zM18.56 13.5a1.5 1.5 0 0 0 1.471-1.794l.98-.196a2.5 2.5 0 0 1-2.45 2.99zm-1.2-10a2.5 2.5 0 0 1 2.452 2.01l-.98.196A1.5 1.5 0 0 0 17.36 4.5zm-2.754 17a3.5 3.5 0 0 1-2.913-1.558l.832-.555a2.5 2.5 0 0 0 2.08 1.113zM6 4.5A1.5 1.5 0 0 0 4.5 6h-1A2.5 2.5 0 0 1 6 3.5z"
  //                   />
  //                   <path stroke="white" d="M8 14V4" />
  //                 </g>
  //               </svg>
  //               {/* Menu Button */}
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 className="kebabMenu hover:cursor-pointer hover:scale-125"
  //               >
  //                 <path
  //                   fill="none"
  //                   stroke="white"
  //                   strokeLinejoin="round"
  //                   strokeWidth="3"
  //                   d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z"
  //                 />
  //               </svg>
  //             </div>
  //           </div>
  //           <div className="secondaryControls bg-transparent col-span-3 flex flex-row items-center">
  //             <div className="controlIcons w-full h-full bg-transparent">
  //               <div className="flex flex-row items-center justify-start h-full w-full bg-transparent">
  //                 <div className="iconGrid grid grid-cols-12 h-full w-full">
  //                   <div
  //                     className="volButton col-span-6 flex flex-row-reverse items-center justify-center bg-transparent hover:cursor-pointer"
  //                     onClick={toggleSlider}
  //                     onMouseOver={toggleSlider}
  //                   >
  //                     {/* Volume Slider */}
  //                     <div>
  //                       <input
  //                         type="range"
  //                         min="0"
  //                         max="100"
  //                         className="h-1.5 w-24 accent-red-500 hover:cursor-pointer"
  //                       />
  //                     </div>
  //                     {/* Mic Icon */}
  //                     <div>
  //                       <svg
  //                         xmlns="http://www.w3.org/2000/svg"
  //                         width="24"
  //                         height="24"
  //                         viewBox="0 0 24 24"
  //                       >
  //                         <g fill="none">
  //                           <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
  //                           <path
  //                             fill="white"
  //                             d="M13.26 3.3a1.1 1.1 0 0 1 1.734.78l.006.114v15.612a1.1 1.1 0 0 1-1.643.957l-.096-.062L6.68 16H4a2 2 0 0 1-1.995-1.85L2 14v-4a2 2 0 0 1 1.85-1.995L4 8h2.68zm6.407 3.483A7 7 0 0 1 22 12a7 7 0 0 1-2.333 5.217a1 1 0 1 1-1.334-1.49A5 5 0 0 0 20 12c0-1.48-.642-2.81-1.667-3.727a1 1 0 1 1 1.334-1.49m-2 2.236A4 4 0 0 1 19 11.999a4 4 0 0 1-1.333 2.982a1 1 0 0 1-1.422-1.4l.088-.09c.41-.368.667-.899.667-1.491a2 2 0 0 0-.548-1.376l-.119-.115a1 1 0 1 1 1.334-1.49"
  //                           />
  //                         </g>
  //                       </svg>
  //                     </div>
  //                   </div>
  //                   <div className="otherIcons col-span-6 flex flex-row items-center space-x-2">
  //                     {/* Repeat Icon */}
  //                     <svg
  //                       className="hover:cursor-pointer"
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       width="24"
  //                       height="24"
  //                       viewBox="0 0 256 256"
  //                     >
  //                       <path
  //                         fill="white"
  //                         d="M28 128a68.07 68.07 0 0 1 68-68h118.34l-17.17-17.17a4 4 0 0 1 5.66-5.66l24 24a4 4 0 0 1 0 5.66l-24 24a4 4 0 0 1-5.66-5.66L214.34 68H96a60.07 60.07 0 0 0-60 60a4 4 0 0 1-8 0m196-4a4 4 0 0 0-4 4a60.07 60.07 0 0 1-60 60H41.66l17.17-17.17a4 4 0 0 0-5.66-5.66l-24 24a4 4 0 0 0 0 5.66l24 24a4 4 0 1 0 5.66-5.66L41.66 196H160a68.07 68.07 0 0 0 68-68a4 4 0 0 0-4-4"
  //                       />
  //                     </svg>
  //                     {/* Shuffle Icon */}
  //                     <svg
  //                       className="hover:cursor-pointer"
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       width="24"
  //                       height="24"
  //                       viewBox="0 0 256 256"
  //                     >
  //                       <path
  //                         fill="white"
  //                         d="M236.24 179.76a6 6 0 0 1 0 8.48l-24 24a6 6 0 0 1-8.48-8.48L217.52 190h-16.58a70.16 70.16 0 0 1-57-29.31l-41.71-58.4A58.11 58.11 0 0 0 55.06 78H32a6 6 0 0 1 0-12h23.06a70.16 70.16 0 0 1 57 29.31l41.71 58.4A58.11 58.11 0 0 0 200.94 178h16.58l-13.76-13.76a6 6 0 0 1 8.48-8.48Zm-92.06-74.41a5.9 5.9 0 0 0 3.48 1.12a6 6 0 0 0 4.89-2.51l1.19-1.67A58.11 58.11 0 0 1 200.94 78h16.58l-13.76 13.76a6 6 0 1 0 8.48 8.48l24-24a6 6 0 0 0 0-8.48l-24-24a6 6 0 0 0-8.48 8.48L217.52 66h-16.58a70.16 70.16 0 0 0-57 29.31L142.78 97a6 6 0 0 0 1.4 8.35m-32.36 45.3a6 6 0 0 0-8.37 1.39l-1.19 1.67A58.11 58.11 0 0 1 55.06 178H32a6 6 0 0 0 0 12h23.06a70.16 70.16 0 0 0 57-29.31l1.19-1.67a6 6 0 0 0-1.43-8.37"
  //                       />
  //                     </svg>
  //                     <Icon
  //                       icon="material-symbols-light:lyrics-sharp"
  //                       width="24"
  //                       height="24"
  //                       color="white"
  //                       className="hover:cursor-pointer"
  //                     />
  //                     <Icon
  //                       icon="material-symbols-light:devices-sharp"
  //                       width="24"
  //                       height="24"
  //                       color="white"
  //                       className="hover:cursor-pointer"
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );

  //   return (
  //     <div className="mainComponent w-full h-full flex flex-col bg-black">
  //       <div className={`${currentSong ? "h-9/10" : "h-full"} w-full bg-black`}>
  //         {/* Top Menu */}
  //         <div className="headerMenu w-full mb-2">
  //           <TopMenu className="w-full" text="RP" buttonText="Add Songs" />
  //         </div>

  //         {/* Content Section */}
  //         <div className="flex flex-row h-full w-full bg-transparent px-2 py-2 overflow-hidden">
  //           {/* Left Sidebar */}
  //           <div className="leftPanel col-span-3 h-full bg-[#191414] rounded-lg px-2 py-2 overflow-hidden">
  //             {/* Library Section */}
  //             <div className="librarySection flex items-center justify-between py-5 pl-5">
  //               <div className="iconText flex items-center hover:cursor-pointer">
  //                 <Icon
  //                   icon="fluent:library-32-filled"
  //                   color="#9CA3AF"
  //                   height="30px"
  //                   className="hover:fill-white"
  //                 />
  //                 <p className="text-gray-400 font-bold text-lg pl-2 hover:text-white">
  //                   Your Library
  //                 </p>
  //               </div>
  //               <button className="rounded-full bg-transparent w-6 h-6 flex items-center justify-center hover:bg-[#1f1f1f]">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   width="1.5em"
  //                   height="1.5em"
  //                   viewBox="0 0 256 256"
  //                 >
  //                   <path
  //                     fill="#9CA3AF"
  //                     d="M222 128a6 6 0 0 1-6 6h-82v82a6 6 0 0 1-12 0v-82H40a6 6 0 0 1 0-12h82V40a6 6 0 0 1 12 0v82h82a6 6 0 0 1 6 6"
  //                   />
  //                 </svg>
  //               </button>
  //             </div>

  //             {/* Menu Items */}
  //             <div className="flex flex-col space-y-4 mt-8">
  //               <IconText iconName="material-symbols:home" displayText="Home" />
  //               <IconText iconName="mdi:compass-outline" displayText="Explore" />
  //               <IconText
  //                 iconName="material-symbols:add-box"
  //                 displayText="Create Playlist"
  //               />
  //               <IconText iconName="mdi:cards-heart" displayText="Liked Songs" />
  //               <IconText
  //                 iconName="iconamoon:music-album-light"
  //                 displayText="My Music"
  //                 active
  //               />
  //             </div>
  //           </div>

  //           {/* Main Content */}
  //           <div className="mainContent col-span-9 bg-[#191414] rounded-lg overflow-y-auto">
  //             <div className="content p-8 pt-0">{children}</div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Song Player */}
  //       {currentSong && (
  //         <div className="songPlayer h-1/10 w-full bg-black grid grid-cols-12">
  //           <div className="col-span-3 flex items-center justify-center space-x-6">
  //             {/* Control Icons */}
  //             <div className="previousIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:scale-110 hover:cursor-pointer">
  //               <Icon
  //                 icon="fluent:previous-20-filled"
  //                 width="20"
  //                 height="20"
  //                 color="white"
  //               />
  //             </div>
  //             <div className="playPauseIcon">
  //               <Icon
  //                 icon={
  //                   isPaused ? "icon-park-solid:play" : "zondicons:pause-solid"
  //                 }
  //                 width="50"
  //                 height="50"
  //                 color="white"
  //                 className="hover:scale-110 hover:cursor-pointer"
  //                 onClick={togglePlayPause}
  //               />
  //             </div>
  //             <div className="nextIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:scale-110 hover:cursor-pointer">
  //               <Icon
  //                 icon="fluent:next-20-filled"
  //                 width="20"
  //                 height="20"
  //                 color="white"
  //               />
  //             </div>
  //             <div className="timeKeeper font-semibold text-xs text-neutral-300">
  //               <p>1:01 / 3:03</p>
  //             </div>
  //           </div>

  //           {/* Song Info */}
  //           <div className="col-span-6 flex items-center justify-center">
  //             <div
  //               className="iconImage w-14 h-14 bg-cover bg-center rounded-sm"
  //               style={{ backgroundImage: `url(${currentSong.thumbnail})` }}
  //             ></div>
  //             <div className="songInfo flex flex-col space-x-4 mr-7">
  //               <span className="songName text-white font-semibold text-base ml-4">
  //                 {currentSong.name}
  //               </span>
  //               <div className="flex items-center">
  //                 <span className="artistInfo text-gray-400 text-sm">
  //                   {currentSong.artist.firstName +
  //                     " " +
  //                     currentSong.artist.lastName}
  //                 </span>
  //                 <span>
  //                   <Icon
  //                     icon="icon-park-outline:dot"
  //                     width="0.7rem"
  //                     height="0.7rem"
  //                     color="gray"
  //                     className="mx-1 text-gray-400"
  //                   />
  //                 </span>
  //                 <span className="albumInfo text-gray-400 text-sm hover:underline hover:cursor-pointer">
  //                   Voicenotes
  //                 </span>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Additional Controls */}
  //           <div className="col-span-3 flex items-center space-x-2">
  //             <div className="volButton flex items-center">
  //               <input
  //                 type="range"
  //                 min="0"
  //                 max="100"
  //                 className="h-1.5 w-24 accent-red-500"
  //               />
  //             </div>
  //             {/* Repeat and Shuffle */}
  //             <Icon icon="carbon:repeat" className="hover:cursor-pointer" />
  //             <Icon icon="carbon:shuffle" className="hover:cursor-pointer" />
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );

  return (
    <div className="mainComponent w-full h-full flex flex-col bg-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div
        className={`${currentSong ? "h-9/10" : "h-full"} w-full bg-black overflow-x-hidden`}
      >
        <div className="headerMenu w-full mb-2">
          <TopMenu
            className="w-full overflow-x-hidden"
            text="RP"
            buttonText="Add Songs"
          ></TopMenu>
        </div>
        <br />
        <br />
        <div className="parentComponent flex flex-col h-full w-full bg-transparent px-2 py-2 overflow-x-hidden">
          <div className="parentGridDiv grid grid-cols-12 gap-2 h-full w-full bg-transparent">
            {/* This div is the parent div */}
            <div className="leftPanel col-span-2 h-full bg-[#191414] rounded-lg px-2 py-2 overflow-hidden">
              {/* Left Side Bar */}
              <div className="flex flex-col">
                <IconText
                  iconName={"material-symbols:home"}
                  displayText={"Home"}
                  targetLink={"/home"}
                  active={currentActiveScreen === "home"}
                />
                <IconText
                  iconName={"mdi:compass-outline"}
                  displayText={"Explore"}
                  targetLink={"/explore"}
                  active={currentActiveScreen === "explore"}
                />
                <IconText
                  iconName={"solar:music-library-2-bold-duotone"}
                  displayText={"Library"}
                  targetLink={"/library"}
                  active={currentActiveScreen === "library"}
                />
                <IconText
                  iconName={"mdi:cards-heart"}
                  displayText={"Liked Songs"}
                  active={currentActiveScreen === "likedsongs"}
                />
                <IconText
                  iconName={"iconamoon:music-album-light"}
                  displayText={"My Music"}
                  targetLink={"/mymusic"}
                  active={currentActiveScreen === "mymusic"}
                />
                <IconText
                  iconName={"solar:upload-track-2-bold"}
                  displayText={"Upload Song"}
                  targetLink={"/uploadsong"}
                  active={currentActiveScreen === "uploadsong"}
                />
              </div>
              <hr className="bg-gray-800 rounded m-5"></hr>
              <div className="flex flex-col justify-center">
                <IconText
                  iconName={"material-symbols:add-box"}
                  displayText={"Create Playlist"}
                  active={currentActiveScreen === "createplaylist"}
                  onClick={() => setCreatePlaylistModalOpen(true)}
                />
              </div>
              <div className="userPlaylists flex flex-col items-center justify-center"></div>
            </div>
            {/* End of left panel */}
            <div className="mainContent col-span-10 bg-[#191414] w-full rounded-lg overflow-y-auto">
              {/* Main content on right side */}
              <div className="content h-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
      {/* This div is the current playing song */}
      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbail"
              className="h-14 w-14 rounded"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-between items-center">
              {/* controls for the playing song go here */}
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="mdi:skip-previous-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={50}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="ic:twotone-repeat"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            {/* <div>Progress Bar Here</div> */}
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            {/* Add to Playlist Button */}
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            {/* Add to Liked Songs Button/ Heart Button */}
            <Icon
              icon="ph:heart-bold"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// const PlaylistsMenu = () => {
//   const [playlistDetails, setPlaylistDetails] = useState({});
//   const { playlistId } = useParams();

//   const [error, setError] = useState(null);

//   // Fetch playlist data from the API using the fetch API
//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const response = await fetch("/playlist/get/me"); // Make the API request using fetch
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json(); // Parse JSON response
//         console.log(data);
//         setPlaylistDetails(data); // Set the playlist data
//       } catch (err) {
//         console.error("Error fetching playlists:", err);
//         setError("Failed to load playlists"); // Set the error state
//       }
//     };

//     fetchPlaylists();
//   }, []); // Empty array ensures this runs only once when the component mounts

//   return (
//     <div className="w-full h-full bg-transparent mt-3 text-white overflow-y-auto flex flex-col">
//       {/* Static Liked Music Section */}
//       <div className="bg-transparent p-2 px-4 rounded-md hover:bg-white hover:bg-opacity-10 hover:cursor-pointer flex justify-between items-center group">
//         <div>
//           <p className="text-white text-sm">Liked music</p>
//           <div className="flex flex-row items-center">
//             <span>
//               <Icon icon="mdi:pin" width="10" height="10" color="gray" />
//             </span>
//             <p className="text-gray-300 text-xs ml-1">Auto playlist</p>
//           </div>
//         </div>
//         {/* Play icon, visible only on hover */}
//         <Icon
//           icon="icon-park-solid:play"
//           width="30"
//           height="30"
//           color="white"
//           className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//         />
//       </div>

//       {/* Dynamic Playlist Sections */}
//     </div>
//   );
// };

export default LoggedInContainer;
