const GreenActionButton = ( {text} ) => {
    return (
        <button className="bg-[#1db954] w-full rounded-full py-2.5 text-base font-bold text-[#191414]
        hover:bg-[#22da63] hover:scale-[1.05]">
            {text}
        </button>
    )
};

export default GreenActionButton;