import UserCabinetInterface from "./user-cabinet-interface/UserCabinetInterface";
import UserCabinetInfo from "./user-cabinet-info/UserCabinetInfo";
import { IGetMe } from "../../services/auth/getMe/getMe.interface";
import { useEffect, useState } from "react";
import { getMe } from "../../services/auth/getMe/getMe";
import Loader from "../loader/Loader";

const UserSites = () => {
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

  if (!userData) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-[100vh] py-8 px-4 shape_bg">
      <div className="max-w-[1200px] mx-auto  flex items-center flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-white">
          Ласкаво просимо до вашого облікового запису!
        </h2>
        <UserCabinetInterface userData={userData} />
        <UserCabinetInfo userData={userData} />
      </div>
    </div>
  );
};

export default UserSites;
