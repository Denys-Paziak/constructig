import React, { useEffect, useState } from "react";
import UserCabinetInterface from "./user-cabinet-interface/UserCabinetInterface";
import UserCabinetInfo from "./user-cabinet-info/UserCabinetInfo";
import { IGetMe } from "../../services/auth/getMe/getMe.interface";
import { getMe } from "../../services/auth/getMe/getMe";
import Loader from "../loader/Loader";
import { getEditSite, getUserSites } from "../../services/getSite/getSite";
import { createLang } from "../../services/createLang/createLang.ts";
import { useTranslation } from "react-i18next";

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const UserSites: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [userData, setUserData] = useState<IGetMe | null>(null);
  const [data, setData] = useState<any>(null);
  const [sites, setSites] = useState<any>([]);
  const [prevSiteId, setPrevSiteId] = useState<any>([]);
  const [sitesStatus, setSitesStatus] = useState<any>(true);
  const { t } = useTranslation();

  const token = localStorage.getItem("token");

  const getUserData = async () => {
    if (!token) return;

    try {
      const response = await getMe(token);
      setUserData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    let siteLang: any = localStorage.getItem("siteLang");

    if (sites.length > 0) {
      try {
        const response = await getEditSite(+sites[0]?.langId, token!, siteLang);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createLangHandler = async (type: string) => {
    let siteLang: any = localStorage.getItem("siteLang");

    if (type === "create") {
      const formData = new FormData();
      formData.append("originalSiteId", prevSiteId);
      formData.append("newLang", siteLang);

      await createLang(formData, token!);
      await handlerChangeLang();
    } else {
      localStorage.setItem("siteLang", "en");
      await handlerChangeLang();
    }
  };

  const getSites = async () => {
    if (!token) return;

    let siteLang: any = localStorage.getItem("siteLang");

    if (!siteLang) {
      localStorage.setItem("siteLang", "en");
    }

    try {
      const response = await getUserSites(token);

      const filteredSites = response.sites.filter(
        (site: any) => site.lang === siteLang
      );

      if (filteredSites.length === 0) {
        setPrevSiteId(sites[0].id);
        return false;
      }

      setSites(filteredSites);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handlerChangeLang = async () => {
    let status: any = await getSites();
    setSitesStatus(status);
  };

  useEffect(() => {
    const start = async () => {
      await getSites();
    };
    start();
  }, []);

  useEffect(() => {
    const start = async () => {
      await getUserData();
      await fetchData();
    };
    start();
  }, [sites]);

  if (!userData) {
    return <Loader />;
  }

  if (!sitesStatus) {
    return (
      <div className="fixed flex flex-col gap-6 justify-center items-center top-0 left-0 w-full h-full bg-blue-50 text-gray-700">
        <h2 className="text-2xl font-semibold text-center">
          {t("admin.adminNewSite.adminNewSiteTitle")}
        </h2>
        <p className="text-md text-center max-w-lg">
          {t("admin.adminNewSite.adminNewSiteText1")}
        </p>

        <button
          onClick={() => {
            createLangHandler("create");
          }}
          className="inline-block w-1/2 rounded bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 text-md font-medium transition-all duration-200"
        >
          {t("admin.adminNewSite.adminNewSiteButton1")}
        </button>

        <button
          onClick={() => {
            createLangHandler("exit");
          }}
          className="inline-block w-1/2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 py-3 px-6 text-md font-medium transition-all duration-200"
        >
          {t("admin.adminNewSite.adminNewSiteButton2")}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          {t("admin.adminNewSite.adminNewSiteText2")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 bg-gradient-to-r bg-blue-500">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 rounded-lg">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-white">
          {t("admin.adminInterface.adminInterfaceWelcome")}
        </h2>

        <>
          <UserCabinetInterface
            userData={userData}
            sites={sites}
            fetchData={fetchData}
            setIsLoggedIn={setIsLoggedIn}
            handlerChangeLang={handlerChangeLang}
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
