import React, { useEffect, useRef, useState } from "react";
import { IGetMe } from "../../../services/auth/getMe/getMe.interface";
import { getMe } from "../../../services/auth/getMe/getMe";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const UserCabinetInterface: React.FC = () => {
  const [userData, setUserData] = useState<IGetMe>();
  const qrRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const response = await getMe(token);
        setUserData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!userData) {
    return <p>loading ...</p>;
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-start flex-col gap-6">
        <h3 className="text-black text-xl font-semibold">
          Hello dear, {userData.name}
        </h3>
        <div className="w-full flex justify-between">
          <div className="flex items-start flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-36 h-36">
                <img
                  className="w-full h-full"
                  src="/src/assets/images/user-icon.svg"
                  alt="user icon"
                />
              </div>
              <div>
                <h4 className="text-black text-[22px] font-medium">
                  {userData.name}
                </h4>
                <div className="flex items-center gap-1">
                  <p className="text-[16px] text-gray-700 text-normal">
                    Email address:
                  </p>
                  <span className="text-[16px] text-gray-900 text-normal">
                    {userData.email}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[16px] text-gray-700 text-normal">
                    Company:
                  </p>
                  <span className="text-[16px] text-gray-900 text-normal">
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
          <div className="flex items-center flex-col gap-3">
            <div ref={qrRef}>
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
