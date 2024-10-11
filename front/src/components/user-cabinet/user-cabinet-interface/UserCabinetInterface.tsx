import React, { useRef, useState } from "react";
import { IGetMe } from "../../../services/auth/getMe/getMe.interface";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../../LanguageSelector";
import { useTranslation } from "react-i18next";

interface Props {
  userData: IGetMe;
  sites: any;
  setIsLoggedIn: (value: boolean) => void;
  fetchData: () => {};
  handlerChangeLang: () => {};
}

const UserCabinetInterface: React.FC<Props> = ({
  userData,
  sites,
  setIsLoggedIn,
  handlerChangeLang,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();

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

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-lg">
      <div className="flex items-start flex-col gap-6">
        <div className="w-full flex items-start justify-between flex-row md:items-center gap-4 md:gap-0">
          <h3 className="text-black text-xl font-semibold">
            {t("admin.adminInterface.adminInterfaceHello")},{" "}
            <span className="notranslate">{userData.name}</span>
          </h3>
          <div className="flex gap-6">
            <div className="language-block flex flex-col gap-2 items-end">
              {t("admin.adminInterface.adminInterfaceChoose")}
              <LanguageSelector fetchData={handlerChangeLang} />
            </div>
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
                    {t("admin.adminInterface.adminInterfaceEmail")}
                  </p>
                  <span className="text-[16px] text-gray-900 text-normal notranslate">
                    {userData.email}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[16px] text-gray-700 text-normal">
                    {t("admin.adminInterface.adminInterfaceCompany")}
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
              {t("admin.adminInterface.adminInterfaceSignOut")}
            </button>
          </div>
          <div className="flex items-center md:items-start flex-col gap-3">
            <div ref={qrRef} className="mx-auto">
              <QRCode
                className="w-32 h-32"
                value={`https://menualista.com/${sites[0].url}/${userData.company}`}
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
              onClick={downloadQRCode}
            >
              {t("admin.adminInterface.adminInterfaceDownload")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCabinetInterface;
