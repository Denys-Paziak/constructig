import React from "react";

const TopLine: React.FC = () => {
  return (
    <div className="w-full bg-[#3649AD33] py-3">
      <div className="container m-auto w-full flex items-center justify-center gap-[60px]">
        <span className="text-sm text-[#3649AD]">
          Do you want to create your own website?
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="py-1.5 px-3 bg-white text-black text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <button
            type="button"
            className="py-1.5 px-3  bg-white text-black  text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopLine;
