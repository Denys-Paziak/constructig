import React from "react";
import LanguageSelector from "../LanguageSelector";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="w-full">
      <section
        className="w-full py-[15px]"
        style={{ backgroundColor: "#3649AD" }}
      >
        <div className="container mx-auto w-full">
          <div className="w-full flex items-center justify-between">
            <div className="w-[98px]">
              <NavLink to={"/"}>
                <img src="../../public/logo.png" alt="logo" />
              </NavLink>
            </div>
            <div className="w-full flex items-center justify-between">
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
          </div>
        </div>
      </section>
    </header>
  );
};

export default MainHeader;
