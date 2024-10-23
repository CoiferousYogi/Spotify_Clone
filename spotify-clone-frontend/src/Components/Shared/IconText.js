import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
  return (
    <Link
      to={targetLink}
      className={`block rounded-md text-white hover:bg-[#1f1f1f] p-1.5 ${active ? "bg-[#ffffff] bg-opacity-10" : "bg-transparent p-1.5"}`}
    >
      <div
        className="flex items-center justify-start cursor-pointer"
        onClick={onClick}
      >
        <div className="px-5 py-2">
          <Icon
            icon={iconName}
            color={active ? "white" : "white"}
            fontSize={25}
          />
        </div>
        <div className="text-base font-normal hover:text-white">
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
