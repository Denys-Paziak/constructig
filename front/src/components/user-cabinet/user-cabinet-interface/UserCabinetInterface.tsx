import React, { useEffect, useState } from "react";
import { IGetMe } from "../../../services/auth/getMe/getMe.interface";
import { getMe } from "../../../services/auth/getMe/getMe";

const UserCabinetInterface: React.FC = () => {
  const [userData, setUserData] = useState<IGetMe>();

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

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-start flex-col gap-6">
        <h3 className="text-black text-lg font-semibold">
          Hello dear, {userData?.username}
        </h3>
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28">
              <img
                className="w-full h-full"
                src="/src/assets/images/user-icon.svg"
                alt="user icon"
              />
            </div>
            <div>
              <h4 className="text-black text-[18px] font-medium">
                {userData?.username}
              </h4>
              <div className="flex items-center gap-1">
                <p className="text-[14px] text-gray-700 text-normal">
                  Email address:
                </p>
                <span className="text-[14px] text-gray-900 text-normal">
                  {userData?.email}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[14px] text-gray-700 text-normal">
                  Company:
                </p>
                <span className="text-[14px] text-gray-900 text-normal">
                  {userData?.company}
                </span>
              </div>
            </div>
          </div>
          <div>QR-Code</div>
        </div>
      </div>
    </div>
  );
};

export default UserCabinetInterface;
