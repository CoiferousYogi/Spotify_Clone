import { Icon } from "@iconify/react/dist/iconify.js";
const AlbumCard = () => {
  return (
    <div className="text-white h-full w-full flex flex-col items-center justify-center p-4">
      <div
        className="albumImage flex items-center justify-center bg-cover bg-center h-60 w-60 rounded-md mb-4"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-vector/blurred-background-design_1107-224.jpg?t=st=1728316486~exp=1728320086~hmac=77ddcc9b92bc76616ac23ce613df13c6ce6188b366b75d2b3dc380000dcc78fc&w=1060")`,
        }}
      >
        <div className="albumArt">
          <Icon
            icon="iconamoon:music-album-light"
            width="150"
            height="150"
            color="white"
          />
        </div>
      </div>
      <h1 className="playlistName text-4xl font-semibold mb-2">My Music</h1>
      <p className="playlistDescription w-7/12 text-sm font-normal text-center">
        All the music which you have uploaded appears here
      </p>
      <div className="iconsArray flex flex-row justify-center items-center space-x-6 w-6/12 mt-6">
        {/* Shuffle Icon */}
        <div className="shuffleIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:bg-gray-500 hover:bg-opacity-45 hover:cursor-pointer hover:scale-110">
          <Icon icon="ph:shuffle-light" width="30" height="30" color="white" />
        </div>
        {/* Play Icon */}
        <div>
          <Icon
            icon="el:play-alt"
            width="60"
            height="60"
            color="white"
            className="hover:scale-110 hover:cursor-pointer"
          />
        </div>
        {/* Kebab Menu Icon */}
        <div className="kebabMenuIcon h-10 w-10 rounded-full flex items-center justify-center bg-[#1f1f1f] hover:bg-gray-500 hover:bg-opacity-45 hover:cursor-pointer hover:scale-110">
          <Icon
            icon="iconamoon:menu-kebab-vertical-fill"
            width="22"
            height="22"
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
