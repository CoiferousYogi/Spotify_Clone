//import GreenActionButton from "../Components/Shared/GreenActionButton";

const TestComponent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center align-middle bg-[#191414]">
      <h1 className="text-white">This is testing page for components</h1>

      <div className="bg-[#1f1f1f] min-h-[130px] w-3/12 rounded-lg flex flex-col align-middle">
        <div className="textContent bg-transparent w-11/12 h-5 my-4 mx-4 mb-4 pb-6">
          <p className="mainText text-white font-medium">
            Create your first playlist
          </p>
          <p className="subText text-white font-medium text-xs pt-1">
            It's easy, we'll help you
          </p>
        </div>
        <button
          className="actionCallButton bg-white rounded-full w-5/12 h-7 my-4 mx-4 mb-4
                 text-black font-medium text-sm"
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
