import React, { useEffect, useState } from "react";
import { useColor } from "../../context/ColorContext";

interface MenuItem {
  link: string;
  text: string;
}

interface HeaderProps {
  logo: string | null;
  data: any;
  company: string;
  headerColorBg: { r: string; g: string; b: string; a: string };
  headerTextColor: { r: string; g: string; b: string; a: string };
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  data,
  company,
  headerColorBg,
  headerTextColor,
}) => {
  //   const { color } = useColor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="h-[50px] flex justify-between items-center relative"
      style={{
        backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          {logo ? (
            <img src={URL.createObjectURL(logo)} alt="Logo" className="h-8" />
          ) : (
            company
          )}
        </div>

        {/* <button
            onClick={toggleMenu}
            className="flex flex-col justify-between h-6 w-8 focus:outline-none"
          >
            <span className="block bg-black h-1 w-full"></span>
            <span className="block bg-black h-1 w-full mt-1"></span>
            <span className="block bg-black h-1 w-full mt-1"></span>
          </button> */}
        <div
          onClick={toggleMenu}
          className={`flex items-center flex-col gap-1.5 cursor-pointer burger-menu ${
            isMenuOpen ? "active" : ""
          }`}
        >
          <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
          <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
          <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="menu absolute top-[50px] right-0 w-full h-svh flex flex-col items-center"
          style={{
            backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
          }}
        >
          {data.slider?.visible && (
            <a
              href="#slider"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              slider
            </a>
          )}
          {data.services?.visible && (
            <a
              href="#services"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              services
            </a>
          )}
          {data.info?.visible && (
            <a
              href="#info"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              info
            </a>
          )}
          {data.socials?.visible && (
            <a
              href="#socials"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              socials
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
