import { useEffect, useState } from "react";
import LanguageSelector from "../LanguageSelector";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full">
      <section
        className="w-full py-[12px] md:py-[15px] px-[20px] md:px-0"
        style={{ backgroundColor: "#3649AD" }}
      >
        <div className="container mx-auto w-full">
          <div className="w-full flex items-center justify-between">
            <div className="w-[60px] md:w-[98px]">
              <NavLink to={"/"}>
                <img src="../logo.png" alt="logo" />
              </NavLink>
            </div>
            <div className="w-full hidden md:flex items-center justify-between">
              <div className="w-full flex justify-center">
                <nav className="flex items-center justify-between">
                  <ul className="flex items-center gap-[40px]">
                    <li>
                      <NavLink className="text-white" to={"/"}>
                        How it works
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white" to={"/"}>
                        Our partners
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white" to={"/"}>
                        Events
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white" to={"/"}>
                        Why us?
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="flex items-center gap-[40px]">
                <LanguageSelector />
                <button
                  className="py-[10px] text-nowrap px-[24px] bg-white cursor-pointer outline-none border-none rounded-md"
                  style={{ color: "#3649AD" }}
                  type="button"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="block md:hidden" onClick={toggleMenu}>
              <div
                className={`flex items-center flex-col gap-1.5 cursor-pointer burger-menu ${
                  isMenuOpen ? "active" : ""
                }`}
              >
                <span className="w-7 h-0.5 bg-white rounded-full ease-in-out duration-300 bg-current"></span>
                <span className="w-7 h-0.5 bg-white rounded-full ease-in-out duration-300 bg-current"></span>
                <span className="w-7 h-0.5 bg-white rounded-full ease-in-out duration-300 bg-current"></span>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div
              className="absolute top-[66px] duration-500 transition-all right-0 w-full h-[calc(100vh-66px)] flex flex-col items-center justify-center gap-6 z-50"
              style={{ backgroundColor: "#3649AD" }}
            >
              <div className="w-full flex items-center flex-col gap-[40px]">
                <div className="w-full flex justify-center">
                  <nav className="flex items-center justify-between">
                    <ul className="flex flex-col items-center gap-[40px]">
                      <li onClick={toggleMenu}>
                        <NavLink className="text-white" to={"/"}>
                          How it works
                        </NavLink>
                      </li>
                      <li onClick={toggleMenu}>
                        <NavLink className="text-white" to={"/"}>
                          Our partners
                        </NavLink>
                      </li>
                      <li onClick={toggleMenu}>
                        <NavLink className="text-white" to={"/"}>
                          Events
                        </NavLink>
                      </li>
                      <li onClick={toggleMenu}>
                        <NavLink className="text-white" to={"/"}>
                          Why us?
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="flex items-center gap-[40px]">
                  <LanguageSelector />
                  <button
                    className="py-[10px] text-nowrap px-[24px] bg-white cursor-pointer outline-none border-none rounded-md"
                    style={{ color: "#3649AD" }}
                    type="button"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default MainHeader;
