import React, { useEffect, useState } from "react";

interface HeaderProps {
  logo: string | null;
  data: any;
  company: string;
  headerColorBg: { r: string; g: string; b: string; a: string };
  headerTextColor: { r: string; g: string; b: string; a: string };
  screen: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  data,
  company,
  headerColorBg,
  headerTextColor,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div
      className="h-[60px] flex justify-between items-center relative"
      style={{
        backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
      }}
    >
      <div className="container mx-auto flex justify-between items-center container-block">
        <div
          className="logo"
          style={{
            color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
          }}
        >
          {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
        </div>

        <div className="block lg:hidden" onClick={toggleMenu}>
          <div
            className={`flex items-center flex-col gap-1.5 cursor-pointer burger-menu ${
              isMenuOpen ? "active" : ""
            }`}
          >
            <span className="w-7 h-0.5 rounded-full ease-in-out duration-300 bg-current"></span>
            <span className="w-7 h-0.5 rounded-full ease-in-out duration-300 bg-current"></span>
            <span className="w-7 h-0.5 rounded-full ease-in-out duration-300 bg-current"></span>
          </div>
        </div>

        <div
          className="hidden lg:flex items-center gap-6 h-full"
          style={{
            color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
          }}
        >
          {data.slider?.visible && <a href="#slider">slider</a>}
          {data.services?.visible && <a href="#services">services</a>}
          {data.info?.visible && <a href="#info">info</a>}
          {data.socials?.visible && <a href="#socials">socials</a>}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="lg:hidden absolute top-[60px] right-0 w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center gap-6 z-50"
          style={{
            backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
          }}
        >
          {data.slider?.visible && (
            <a
              onClick={toggleMenu}
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
              onClick={toggleMenu}
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
              onClick={toggleMenu}
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
              onClick={toggleMenu}
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
