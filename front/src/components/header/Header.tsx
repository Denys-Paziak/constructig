// import React, { useState } from "react";

// interface MenuItem {
//   link: string;
//   text: string;
// }

// interface HeaderProps {
//   logo: string | null;
//   data: any;
//   company: string;
//   headerColorBg: { r: string; g: string; b: string; a: string };
//   headerTextColor: { r: string; g: string; b: string; a: string };
// }

// export const Header: React.FC<HeaderProps> = ({
//   logo,
//   data,
//   company,
//   headerColorBg,
//   headerTextColor,
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div
//       className="h-[50px] flex justify-between items-center relative"
//       style={{
//         backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
//       }}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="logo">
//           {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
//         </div>

//         <div className="flex items-center gap-4 ">
//           {data.slider?.visible && (
//             <a
//               href="#slider"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               slider
//             </a>
//           )}
//           {data.services?.visible && (
//             <a
//               href="#services"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               services
//             </a>
//           )}
//           {data.info?.visible && (
//             <a
//               href="#info"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               info
//             </a>
//           )}
//           {data.socials?.visible && (
//             <a
//               href="#socials"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               socials
//             </a>
//           )}
//         </div>

//         <div
//           onClick={toggleMenu}
//           className={`flex items-center flex-col gap-1.5 cursor-pointer burger-menu ${
//             isMenuOpen ? "active" : ""
//           }`}
//         >
//           <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
//           <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
//           <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <div
//           className="menu absolute top-[50px] right-0 w-full h-svh flex flex-col items-center"
//           style={{
//             backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
//           }}
//         >
//           {data.slider?.visible && (
//             <a
//               href="#slider"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               slider
//             </a>
//           )}
//           {data.services?.visible && (
//             <a
//               href="#services"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               services
//             </a>
//           )}
//           {data.info?.visible && (
//             <a
//               href="#info"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               info
//             </a>
//           )}
//           {data.socials?.visible && (
//             <a
//               href="#socials"
//               style={{
//                 color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
//               }}
//             >
//               socials
//             </a>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";

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
  screen, // новий проп
}) => {
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
          {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
        </div>

        {/* Відображаємо бургер-меню тільки для mobile та tablet */}
        {(screen === "mobile" || screen === "tablet") && (
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
        )}

        {/* Відображаємо звичайне меню тільки для desktop */}
        {screen === "desktop" && (
          <div
            className="flex items-center gap-6"
            style={{
              color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
            }}
          >
            {data.slider?.visible && <a href="#slider">slider</a>}
            {data.services?.visible && <a href="#services">services</a>}
            {data.info?.visible && <a href="#info">info</a>}
            {data.socials?.visible && <a href="#socials">socials</a>}
          </div>
        )}
      </div>

      {/* Мобільне меню - видиме тільки для mobile та tablet, коли меню відкрите */}
      {(screen === "mobile" || screen === "tablet") && isMenuOpen && (
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
