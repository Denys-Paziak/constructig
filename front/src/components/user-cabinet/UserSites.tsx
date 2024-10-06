import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserCabinetInterface from "./user-cabinet-interface/UserCabinetInterface";
import UserCabinetInfo from "./user-cabinet-info/UserCabinetInfo";
import { IGetMe } from "../../services/auth/getMe/getMe.interface";
import { getMe } from "../../services/auth/getMe/getMe";
import Loader from "../loader/Loader";
import { getEditSite, getUserSites } from "../../services/getSite/getSite";
import { useTranslation } from "react-i18next";

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const UserSites: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [userData, setUserData] = useState<IGetMe | null>(null);
  const [data, setData] = useState<any>(null);
  const [sites, setSites] = useState<any>([]);
  const { i18n } = useTranslation();

  const token = useMemo(() => localStorage.getItem("token"), []);

  const getUserData = useCallback(async () => {
    if (!token) return;
    try {
      const response = await getMe(token);
      setUserData(response);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const fetchData = useCallback(async () => {
    if (sites.length === 0 || !token) return;
    try {
      const response = await getEditSite(+sites[0].langId, token, i18n.language);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }, [sites, token, i18n.language]);

  const getSites = useCallback(async () => {
    if (!token) return;
    try {
      const response = await getUserSites(token);
      const filteredSites = response.sites.filter(site => site.lang === i18n.language);
      setSites(filteredSites);
    } catch (error) {
      console.log(error);
    }
  }, [token, i18n.language]);

  useEffect(() => {
    getSites();
  }, [i18n.language, getSites]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    fetchData();
  }, [sites, fetchData]);

  if (!userData) {
    return <Loader />;
  }

  return (
      <div className="w-full min-h-screen py-8 px-4 bg-gradient-to-r bg-blue-500">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 rounded-lg">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-white">
            Welcome to your account!
          </h2>

          {data ? (
              <>
                <UserCabinetInterface
                    userData={userData}
                    sites={sites}
                    fetchData={fetchData}
                    setIsLoggedIn={setIsLoggedIn}
                />
                <UserCabinetInfo
                    data={data}
                    sites={sites}
                    userData={userData}
                    setUserData={setUserData}
                    fetchData={fetchData}
                    getSites={getSites}
                />
              </>
          ) : (
              <Loader />
          )}
        </div>
      </div>
  );
};

export default UserSites;
