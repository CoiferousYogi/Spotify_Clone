import { useState } from "react";
//import { Icon } from "@iconify/react";
import CloudinaryUpload from "../Components/Shared/CloudinaryUpload";
import TextInput from "../Components/Shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../Utils/serverHelpers";
import { useNavigate } from "react-router-dom";
//import TopMenu from "../Components/Shared/TopMenu";
import LoggedInContainer from "../Containers/LoggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();

  const submitSong = async () => {
    console.log(name);
    console.log(thumbnail);
    console.log(playlistUrl);
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      alert("Could not create the song");
      return;
    }
    alert("Song created successfully");
    navigate("/home");
  };

  // return (
  //   <div className="mainComponent w-full h-full flex flex-col bg-black">
  //     <div className="headerMenu w-full mb-2">
  //       <TopMenu className="w-full" text="RP" buttonText="Add Songs" />
  //     </div>
  //     <br></br>
  //     <br></br>
  //     <div className="parent flex flex-col h-full w-full bg-transparent px-2 py-2 overflow-x-hidden">
  //       <div className="grid grid-cols-12 gap-2 h-full bg-transparent overflow-hidden">
  //         {/* This div is the parent grid div */}
  //         <div className="leftPanel col-span-3 bg-[#191414] rounded-lg px-2 py-2 pb-10">
  //           {/* Sidebar on the left side */}

  //           {/* div for the Library component */}
  //           <div className="librarySection flex flex-row align-middle py-5 pl-5 justify-between">
  //             <div className="iconText flex flex-row align-middle items-center justify-center hover:cursor-pointer">
  //               <Icon
  //                 icon="fluent:library-32-filled"
  //                 color="#9CA3AF"
  //                 height="30px"
  //                 className="hover:fill-white"
  //               />
  //               <p className=" text-gray-400 font-bold text-lg pl-2 hover:text-white">
  //                 Your Library
  //               </p>
  //             </div>
  //             <button className="rounded-full bg-transparent w-6 h-6 flex flex-row align-middle items-center justify-center mr-3 hover:bg-[#1f1f1f]">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="1.5em"
  //                 height="1.5em"
  //                 viewBox="0 0 256 256"
  //               >
  //                 <path
  //                   fill="#9CA3AF"
  //                   d="M222 128a6 6 0 0 1-6 6h-82v82a6 6 0 0 1-12 0v-82H40a6 6 0 0 1 0-12h82V40a6 6 0 0 1 12 0v82h82a6 6 0 0 1 6 6"
  //                   className="hover:fill-white"
  //                 />
  //               </svg>
  //             </button>
  //           </div>

  //           <br></br>
  //           <br></br>
  //           <br></br>

  //           <div className="flex flex-col">
  //             {/* Create Playlist button */}
  //             <div className="bg-[#1f1f1f] min-h-[120px] w-full rounded-lg flex flex-col align-middle mb-5 hover:cursor-pointer">
  //               <div className="textContent bg-transparent w-11/12 h-5 my-4 mx-4 mb-4 pb-6">
  //                 <p className="mainText text-white font-medium">
  //                   Create your first playlist
  //                 </p>
  //                 <p className="subText text-white font-medium text-xs pt-1">
  //                   It's easy, we'll help you
  //                 </p>
  //               </div>
  //               <button className="actionCallButton bg-white rounded-full w-5/12 h-7 my-4 mx-4 mb-4 text-black font-medium text-sm hover:scale-105">
  //                 Create Playlist
  //               </button>
  //             </div>

  //             {/* Follow Podcasts Button */}
  //             <div className="bg-[#1f1f1f] min-h-[120px] w-full rounded-lg flex flex-col align-middle mb-5 hover:cursor-pointer">
  //               <div className="textContent bg-transparent w-11/12 h-5 my-4 mx-4 mb-4 pb-6">
  //                 <p className="mainText text-white font-medium">
  //                   Let's find some podcasts to follow
  //                 </p>
  //                 <p className="subText text-white font-medium text-xs pt-1">
  //                   We'll keep you updated with latest episodes
  //                 </p>
  //               </div>
  //               <button className="actionCallButton bg-white rounded-full w-5/12 h-7 my-4 mx-4 mb-4 text-black font-medium text-sm hover:scale-105">
  //                 Browse Podcasts
  //               </button>
  //             </div>
  //           </div>

  //           <div className="px-2 pt-40">
  //             <div className="border border-gray-700 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
  //               <Icon icon="carbon:earth-europe-africa" />
  //               <div className="ml-2 text-sm font-semibold">English</div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="mainContent col-span-9 bg-[#191414] rounded-lg overflow-y-scroll">
  //           {/* Main content on right side */}
  //           <div className="content p-8 pt-0 overflow-y-visible text-white">
  //             <div className="w-2/3 flex space-x-3">
  //               <div className="w-1/2">
  //                 <TextInput
  //                   label="Name"
  //                   labelClassName={"text-white"}
  //                   placeholder="Name"
  //                   value={name}
  //                   setValue={setName}
  //                 />
  //               </div>
  //               <div className="w-1/2 text-white">
  //                 <TextInput
  //                   label="Thumbnail"
  //                   labelClassName={"text-white"}
  //                   placeholder="Thumbnail"
  //                   value={thumbnail}
  //                   setValue={setThumbnail}
  //                 />
  //               </div>
  //             </div>
  //             <div className="py-5">
  //               {uploadedSongFileName ? (
  //                 <div className="bg-white rounded-full p-3 w-1/3 text-black">
  //                   {uploadedSongFileName.substring(0, 30)}...
  //                 </div>
  //               ) : (
  //                 <CloudinaryUpload
  //                   setUrl={setPlaylistUrl}
  //                   setName={setUploadedSongFileName}
  //                 />
  //               )}
  //             </div>
  //             <button
  //               className="submitSong bg-white w-1/4 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold text-black"
  //               onClick={submitSong}
  //             >
  //               Submit Song
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <LoggedInContainer currentActiveScreen={"uploadsong"}>
      {/* Main content on right side */}
      <div className="content p-8 pt-4 overflow-y-visible text-white">
        <div className="w-2/3 flex space-x-3">
          <div className="w-1/2">
            <TextInput
              label="Name"
              labelClassName={"text-white"}
              placeholder="Name"
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-1/2 text-white">
            <TextInput
              label="Thumbnail"
              labelClassName={"text-white"}
              placeholder="Thumbnail"
              value={thumbnail}
              setValue={setThumbnail}
            />
          </div>
        </div>
        <div className="py-5">
          {uploadedSongFileName ? (
            <div className="bg-white rounded-full p-3 w-1/3 text-black">
              {uploadedSongFileName.substring(0, 30)}...
            </div>
          ) : (
            <CloudinaryUpload
              setUrl={setPlaylistUrl}
              setName={setUploadedSongFileName}
            />
          )}
        </div>
        <button
          className="submitSong bg-white w-1/4 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold text-black"
          onClick={submitSong}
        >
          Submit Song
        </button>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
