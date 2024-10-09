import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserCabinetInterface from "./user-cabinet-interface/UserCabinetInterface";
import UserCabinetInfo from "./user-cabinet-info/UserCabinetInfo";
import { IGetMe } from "../../services/auth/getMe/getMe.interface";
import { getMe } from "../../services/auth/getMe/getMe";
import Loader from "../loader/Loader";
import { getEditSite, getUserSites } from "../../services/getSite/getSite";
import { useTranslation } from "react-i18next";
import { createLang } from "../../services/createLang/createLang.ts";

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const UserSites: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [userData, setUserData] = useState<IGetMe | null>(null);
  const [data, setData] = useState<any>(null);
  const [sites, setSites] = useState<any>([]);
  const [prevSiteId, setPrevSiteId] = useState<any>([]);
  const { i18n } = useTranslation();

  const token = localStorage.getItem("token");


  const getUserData = async () => {
    if (!token) return;

    try {
      const response = await getMe(token);
      setUserData(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    if (sites.length > 0) {
      try {
        const response = await getEditSite(+sites[0]?.langId, token, i18n.language);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }else {
      console.log("сайтів немає")
    }
  };


  const createLangHandler = async () => {
      const formData = new FormData();
      formData.append("originalSiteId", prevSiteId);
      formData.append("newLang", i18n.language);

      console.log(`Creating site for language: ${i18n.language}`);
      await createLang(formData, token);

      await getSites();
  };

  const getSites =  async () => {
    if (!token) return;
    try {
      const response = await getUserSites(token);

      const filteredSites = response.sites.filter(site => site.lang === i18n.language);

      if (filteredSites.length === 0) {
        setPrevSiteId(sites[0].id);
      }
      setSites(filteredSites);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect( () => {
    const start = async () => {
      await getSites();
    }
     start();
  }, [i18n.language]);


  useEffect(() => {
    const start = async () => {
      await getUserData();
      await fetchData();
    }
    start();
  }, [sites]);


  console.log(data + "sss")

  if (sites.length === 0) {
    return <div className={"fixed flex justify-center items-center top-0 left-0 w-full h-full bg-white"}>
      <button onClick={createLangHandler}
              className={"inline-block text-black hover:bg-blue-500 hover:text-white py-4 px-4 text-sm font-medium text-center"}>Create
        site
      </button>
    </div>;
  }

  if (!userData) {
    return <Loader/>;
  }

  return (
      <div className="w-full min-h-screen py-8 px-4 bg-gradient-to-r bg-blue-500">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 rounded-lg">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-white">
            Welcome to your account!
          </h2>
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
        </div>
      </div>
  );
};

export default React.memo(UserSites);
