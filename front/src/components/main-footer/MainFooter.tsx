import React from "react";
import { NavLink } from "react-router-dom";

const MainFooter = () => {
  return (
    <footer className="w-full">
      <section
        className="w-full footer-bg py-[56px] px-[20px]"
        style={{ backgroundColor: "#3649AD" }}
      >
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center lg:items-start flex-col lg:flex-row gap-[60px] lg:gap-[0px]">
            <div className="flex flex-col items-center lg:items-start gap-[26px]">
              <div className="w-[98px]">
                <NavLink to={"/"}>
                  <img src="../../public/logo.png" alt="logo" />
                </NavLink>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-[8px]">
                <NavLink to={"/"} className="text-sm text-white cursor-pointer">
                  +14163640054
                </NavLink>
                <NavLink to={"/"} className="text-sm text-white cursor-pointer">
                  menualista_4@yahoo.com
                </NavLink>
              </div>
              <span className="text-sm text-white cursor-pointer">
                ©2024 All rights reserved. Menualista
              </span>
            </div>
            <nav className="flex justify-between">
              <ul className="flex flex-col md:flex-row gap-[40px]">
                <li className="flex justify-center">
                  <a className="text-white" href="#">
                    How it works
                  </a>
                </li>
                <li className="flex justify-center">
                  <a className="text-white" href="#">
                    Our partners
                  </a>
                </li>
                <li className="flex justify-center">
                  <a className="text-white" href="#">
                    Events
                  </a>
                </li>
                <li className="flex justify-center">
                  <a className="text-white" href="#">
                    Why us?
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex flex-col items-center lg:items-start gap-[20px]">
              <NavLink to={"/"} className="text-sm text-white cursor-pointer">
                Offer agreement
              </NavLink>
              <NavLink to={"/"} className="text-sm text-white cursor-pointer">
                Personal data
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default MainFooter;
