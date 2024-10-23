import { useState, useEffect } from "react";
//import { Icon } from "@iconify/react";
//import { Howl } from "howler";
//import TopMenu from "../Components/Shared/TopMenu";
//import IconText from "../Components/Shared/IconText";
import SingleSongCard from "../Components/Shared/SingleSongCard";
import AlbumCard from "../Components/Shared/AlbumCard";
import { makeAuthenticatedGETRequest } from "../Utils/serverHelpers";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useParams } from "react-router";

const SinglePlaylistView = () => {
  const { playlistId } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState({});
  //const [songData, setSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId,
      );
      console.log(response);
      setPlaylistDetails(response);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      <div className="musicContent w-full h-full grid grid-cols-12 bg-gradient-to-br from-red-800 via-black to-[#191414]">
        <div className="albumInfo col-span-5 bg-transparent rounded-lg overflow-hidden">
          <AlbumCard />
        </div>
        <div className="songList col-span-7 bg-transparent rounded-lg px-4 py-4 overflow-auto">
          <div className="listItems space-y-5">
            {playlistDetails._id && (
              <div>
                <div className="text-white text-xl pt-8 font-semibold">
                  {playlistDetails.name}
                </div>
                <div className="pt-10 space-y-3">
                  {playlistDetails.songs.map((item) => {
                    return (
                      <SingleSongCard
                        info={item}
                        key={JSON.stringify(item)}
                        playSound={() => {}}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LoggedInContainer>
  );
};

// const MyMusic = () => {
//   const [songData, setSongData] = useState([]);
//   const [soundPlayed, setSoundPlayed] = useState(null);

//   const playSound = (songSrc) => {
//     if (soundPlayed) {
//       soundPlayed.stop();
//     }
//     let sound = new Howl({
//       src: [songSrc],
//       html5: true,
//     });
//     setSoundPlayed(sound);
//     sound.play();
//   };

//   useEffect(() => {
//     // fetch data
//     const getData = async () => {
//       const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
//       setSongData(response.data);
//     };
//     getData();
//   }, []);
//   return (
//     <div className="mainComponent w-full h-full flex flex-col bg-black">
//       <div className="headerMenu w-full mb-2">
//         <TopMenu className="w-full" text="RP" buttonText="Add Songs" />
//       </div>
//       <br></br>
//       <br></br>
//       <div className="parent flex flex-col h-full w-full bg-transparent px-2 py-2 overflow-x-hidden">
//         <div className="grid grid-cols-12 gap-2 h-full bg-transparent overflow-hidden">
//           {/* This div is the parent grid div */}
//           <div className="leftPanel col-span-2 bg-[#120e0e] rounded-lg px-2 py-2 pb-10">
//             {/* Sidebar on the left side */}
//             <div className="flex flex-col">
//               <IconText
//                 iconName={"material-symbols:home"}
//                 displayText={"Home"}
//               />
//               <IconText
//                 iconName={"mdi:compass-outline"}
//                 displayText={"Explore"}
//               />
//               <IconText
//                 iconName={"material-symbols:add-box"}
//                 displayText={"Create Playlist"}
//               />
//               <IconText
//                 iconName={"mdi:cards-heart"}
//                 displayText={"Liked Songs"}
//               />
//               <IconText
//                 iconName={"iconamoon:music-album-light"}
//                 displayText={"My Music"}
//                 active
//               />
//             </div>

//             <div className="px-2 pt-40">
//               <div className="border border-gray-700 text-white w-6/12 text-sm font-light flex px-3 py-2 rounded-lg items-center justify-center hover:border-white cursor-pointer">
//                 <Icon
//                   icon="carbon:earth-europe-africa"
//                   height="20"
//                   width="20"
//                 />
//                 <div className="ml-2">English</div>
//               </div>
//             </div>
//           </div>

//           <div className="mainContent col-span-10 bg-transparent rounded-lg overflow-hidden">
//             {/* Main content on right side */}
//             {/* Dividing the main content section into 2 parts */}
//             <div className="musicContent w-full h-full grid grid-cols-12 bg-gradient-to-br from-red-800 via-black to-[#191414] rounded-lg py-5">
//               <div className="albumInfo col-span-5 bg-transparent rounded-lg overflow-hidden">
//                 <AlbumCard />
//               </div>
//               <div className="songList col-span-7 bg-transparent rounded-lg px-4 py-4 overflow-auto">
//                 <div className="listItems space-y-5">
//                   {songData.map((item) => {
//                     return <SingleSongCard info={item} playSound={playSound} />;
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default SinglePlaylistView;
