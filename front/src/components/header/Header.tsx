import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  logo: string | null;
  data: any;
  company: string;
  headerColorBg: { r: string; g: string; b: string; a: string };
  headerTextColor: { r: string; g: string; b: string; a: string };
  screen: string;
  onMenuToggle?: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  data,
  company,
  headerColorBg,
  headerTextColor,
  screen,
  onMenuToggle,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN"); // Стандартна мова

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (onMenuToggle) {
      onMenuToggle(newMenuState);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language); // Оновлюємо вибрану мову
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
          className="logo notranslate"
          style={{
            color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
          }}
        >
          {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
        </div>

        <div
          className={`${screen === "desktop" && "lg:hidden"} ${
            screen === "tablet" && "visible"
          } block`}
          onClick={toggleMenu}
        >
          <div
            className={`flex items-center flex-col gap-1.5 cursor-pointer burger-menu ${
              isMenuOpen ? "active" : ""
            }`}
          >
            <span
              className="w-7 h-0.5 rounded-full ease-in-out duration-300 bg-current"
              style={{
                background: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            ></span>
            <span
              className="w-7 h-0.5 rounded-full ease-in-out duration-300 bg-current"
              style={{
                background: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            ></span>
            <span
              className="w-7 h-0.5 rounded-full ease-in-out duration-300 bg-current"
              style={{
                background: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            ></span>
          </div>
        </div>

        <div
          className={`${screen === "desktop" && "lg:flex"} ${
            screen === "tablet" && "hidden"
          } hidden  items-center gap-6 h-full`}
          style={{
            color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
          }}
        >
          {data.slider?.visible === 1 && (
            <a href="#slider">{data.header.menu[0].text}</a>
          )}
          {data.services?.visible === 1 && (
            <a href="#services">{data.header.menu[1].text}</a>
          )}
          {data.info?.visible === 1 && (
            <a href="#about">{data.header.menu[2].text}</a>
          )}
          {data.socials?.visible === 1 && (
            <a href="#contact">{data.header.menu[3].text}</a>
          )}
        </div>
        <div
          className={`${screen === "desktop" && "lg:flex"} ${
            screen === "tablet" && "hidden"
          } hidden items-center gap-4`}
        >
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton
              className="inline-flex h-[36px] w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
              // style={{
              //   color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              // }}
            >
              {selectedLanguage}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-black"
                // style={{
                //   color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
                // }}
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {data.availableLanguages &&
                  data.availableLanguages.map((el: any) => (
                    <MenuItem key={el}>
                      <a
                        href="#"
                        onClick={() => handleLanguageChange(el.toUpperCase())} // Зміна мови при кліку
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        // style={{
                        //   color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
                        // }}
                      >
                        {el.toUpperCase()}
                      </a>
                    </MenuItem>
                  ))}
              </div>
            </MenuItems>
          </Menu>
          <div className="flex items-center gap-4">
            <NavLink
              to={"/login"}
              className="bg-white border-none h-[36px] outline-none rounded-md px-4 py-1.5 text-black font-semibold"
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className="bg-white border-none h-[36px] outline-none rounded-md px-4 py-1.5 text-black font-semibold"
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`${
            screen === "desktop" && "lg:hidden"
          } absolute top-[60px] right-0 w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center gap-6 z-50`}
          style={{
            backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
          }}
        >
          {data.slider?.visible === 1 && (
            <a
              onClick={toggleMenu}
              href="#slider"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              {data.header.menu[0].text}
            </a>
          )}
          {data.services?.visible === 1 && (
            <a
              onClick={toggleMenu}
              href="#services"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              {data.header.menu[1].text}
            </a>
          )}
          {data.info?.visible === 1 && (
            <a
              onClick={toggleMenu}
              href="#info"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              {data.header.menu[2].text}
            </a>
          )}
          {data.socials?.visible === 1 && (
            <a
              onClick={toggleMenu}
              href="#socials"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              {data.header.menu[3].text}
            </a>
          )}

          <div className="flex flex-col gap-4">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                // style={{
                //   color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
                // }}
              >
                {selectedLanguage}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-black"
                  // style={{
                  //   color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
                  // }}
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {data.availableLanguages &&
                    data.availableLanguages.map((el: any) => (
                      <MenuItem key={el}>
                        <a
                          href="#"
                          onClick={() => handleLanguageChange(el.toUpperCase())}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          // style={{
                          //   color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
                          // }}
                        >
                          {el.toUpperCase()}
                        </a>
                      </MenuItem>
                    ))}
                </div>
              </MenuItems>
            </Menu>
            <NavLink
              to={"/login"}
              className="bg-white border-none text-center h-[36px] outline-none rounded-md px-4 py-1.5 text-black font-semibold"
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className="bg-white border-none text-center h-[36px] outline-none rounded-md px-4 py-1.5 text-black font-semibold"
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
