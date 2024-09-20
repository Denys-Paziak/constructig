import React, { useRef, useState } from "react";
import { IGetMe } from "../../../services/auth/getMe/getMe.interface";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../../LanguageSelector";

interface Props {
  userData: IGetMe;
  setIsLoggedIn: (value: boolean) => void;
}

const UserCabinetInterface: React.FC<Props> = ({ userData, setIsLoggedIn }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const downloadQRCode = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current);
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${userData?.company}_qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-lg">
      <div className="flex items-start flex-col gap-6">
        <div className="w-full flex items-start justify-between flex-row md:items-center gap-4 md:gap-0">
          <h3 className="text-black text-xl font-semibold">
            Hello, <span className="notranslate">{userData.name}</span>
          </h3>
          <div className="language-block">
            <LanguageSelector />

            {isDropdownOpen && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      onClick={toggleDropdown}
                      href="#"
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <img
                        className="w-6"
                        src="/src/assets/images/uk-flag.svg"
                        alt="lang icon"
                      />
                      English
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={toggleDropdown}
                      href="#"
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <img
                        className="w-6"
                        src="/src/assets/images/spain-flag.svg"
                        alt="lang icon"
                      />
                      Spanish
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={toggleDropdown}
                      href="#"
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <img
                        className="w-6"
                        src="/src/assets/images/ru-flag.svg"
                        alt="lang icon"
                      />
                      Russian
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex md:items-center justify-between flex-col gap-6 md:flex-row md:gap-0">
          <div className="flex items-start flex-col gap-6 border-b border-blue-300 md:border-none pb-6 md:pb-0">
            <div className="flex items-start gap-6 flex-col md:flex-row md:items-center">
              <div className="w-20 h-20 md:w-36 md:h-36">
                <img
                  className="w-full h-full"
                  src="../user-icon.svg"
                  alt="user icon"
                />
              </div>
              <div>
                <h4 className="text-black text-[22px] font-medium notranslate">
                  {userData.name}
                </h4>
                <div className="flex items-center gap-1">
                  <p className="text-[16px] text-gray-700 text-normal">
                    Email address:
                  </p>
                  <span className="text-[16px] text-gray-900 text-normal notranslate">
                    {userData.email}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[16px] text-gray-700 text-normal">
                    Company:
                  </p>
                  <span className="text-[16px] text-gray-900 text-normal notranslate">
                    {userData.company}
                  </span>
                </div>
              </div>
            </div>
            <button
              className="py-2 px-8 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="button"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
          <div className="flex items-center md:items-start flex-col gap-3">
            <div ref={qrRef} className="mx-auto">
              <QRCode className="w-32 h-32" value={userData.company} />
            </div>
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
              onClick={downloadQRCode}
            >
              Download QRCode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCabinetInterface;
