import React, { useEffect, useState } from "react";
import UserCabinetInterface from "./user-cabinet-interface/UserCabinetInterface";
import UserCabinetInfo from "./user-cabinet-info/UserCabinetInfo";
import { IGetMe } from "../../services/auth/getMe/getMe.interface";
import { getMe } from "../../services/auth/getMe/getMe";
import Loader from "../loader/Loader";
import LanguageSelector from "../LanguageSelector"; // Імпортуйте новий компонент

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const UserSites: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [userData, setUserData] = useState<IGetMe | null>(null);

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

  if (!userData) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-gray-800">
          Ласкаво просимо до вашого облікового запису!
        </h2>

        <UserCabinetInterface userData={userData} setIsLoggedIn={setIsLoggedIn} />
        <UserCabinetInfo userData={userData} setUserData={setUserData} />
      </div>
    </div>
  );
};

export default UserSites;
