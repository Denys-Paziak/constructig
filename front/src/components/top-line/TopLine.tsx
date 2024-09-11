import React from "react";
import { NavLink } from "react-router-dom";

const TopLine: React.FC = () => {
  return (
    <div className="w-full bg-[#3649AD33] px-4 md:px-0 py-3">
      <div className="container m-auto w-full flex flex-col md:flex-row items-center justify-center gap-[10px] md:gap-[60px]">
        <span className="text-sm text-[#3649AD]">
          Do you want to create your own website?
        </span>
        <div className="flex items-center gap-4">
          <NavLink
            to={"/login"}
            type="button"
            className="py-1.5 px-3 bg-white text-black text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </NavLink>
          <NavLink
            to={"/register"}
            type="button"
            className="py-1.5 px-3  bg-white text-black  text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopLine;
