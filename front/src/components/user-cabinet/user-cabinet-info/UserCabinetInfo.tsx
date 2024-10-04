import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGetMe } from "../../../services/auth/getMe/getMe.interface";
import UserCabinetPersonal from "./components/user-cabinet-personal/UserCabinetPersonal";
import Loader from "../../loader/Loader";
import UserCabinetCategory from "./components/user-cabinet-category/UserCabinetCategory";
import UserCabinetProducts from "./components/user-cabinet-products/UserCabinetProducts";
import UserCabinetNews from "./components/user-cabinet-news/UserCabinetNews";
import { useTranslation } from "react-i18next";

interface Props {
  userData: IGetMe;
  setUserData: (response: any) => void;
  sites: any;
  data: any;
  fetchData: any;
  getSites: () => void;
}

const UserCabinetInfo: React.FC<Props> = ({
  userData,
  setUserData,
  sites,
  data,
  fetchData,
  getSites,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-lg">
      <div className="flex items-start flex-col gap-6">
        <div>
          <h3 className="text-black text-xl font-semibold">Інформація:</h3>
        </div>
        <div className="w-full">
          <ul className="flex border-b border-gray-200 w-full overflow-x-scroll flex-nowrap ">
            <li
              className={` ${
                activeTabIndex === 0 ? "bg-gray-100 rounded-md" : "inactive"
              }`}
            >
              <button
                onClick={() => handleTabClick(0)}
                className={`inline-block text-black  hover:bg-blue-500 hover:text-white rounded-l-lg py-4 px-4 text-sm font-medium text-center ${
                  activeTabIndex === 0 ? "bg-blue-500 text-white" : ""
                }`}
              >
                Sites
              </button>
            </li>
            <li
              className={` ${
                activeTabIndex === 1 ? "bg-gray-100" : "inactive"
              }`}
            >
              <button
                onClick={() => handleTabClick(1)}
                className={`inline-block text-black hover:bg-blue-500 hover:text-white py-4 px-4 text-sm font-medium text-center ${
                  activeTabIndex === 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                Settings
              </button>
            </li>
            <li
              className={` ${
                activeTabIndex === 2 ? "bg-gray-100" : "inactive"
              }`}
            >
              <button
                onClick={() => handleTabClick(2)}
                className={`inline-block text-black hover:bg-blue-500 hover:text-white py-4 px-4 text-sm font-medium text-center ${
                  activeTabIndex === 2 ? "bg-blue-500 text-white" : ""
                }`}
              >
                Categories
              </button>
            </li>
            <li
              className={` ${
                activeTabIndex === 3 ? "bg-gray-100" : "inactive"
              }`}
            >
              <button
                onClick={() => handleTabClick(3)}
                className={`inline-block text-black hover:bg-blue-500 hover:text-white py-4 px-4 text-sm font-medium text-center ${
                  activeTabIndex === 3 ? "bg-blue-500 text-white" : ""
                }`}
              >
                Goods
              </button>
            </li>
            <li
              className={`${activeTabIndex === 4 ? "bg-gray-100" : "inactive"}`}
            >
              <button
                onClick={() => handleTabClick(4)}
                className={`inline-block text-black hover:bg-blue-500 hover:text-white rounded-r-lg py-4 px-4 text-sm font-medium text-center ${
                  activeTabIndex === 4 ? "bg-blue-500 text-white" : ""
                }`}
              >
                Events
              </button>
            </li>
          </ul>
          <div className="w-full px-1 py-2">
            {activeTabIndex === 0 && (
              <div className="w-full flex items-start flex-col gap-6 py-6">
                <div className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sites.map((site: any) => {
                      return (
                        <div
                          key={site.id}
                          className="shadow-xl rounded-lg p-6 shape_bg text-white"
                        >
                          <div className={" flex justify-between"}>
                            <h3 className="text-xl font-semibold mb-2">
                              {site.name}
                            </h3>

                            <p className={"text-xl font-semibold mb-2"}>
                              {site.lang}
                            </p>
                          </div>
                          <a
                            href={
                              "https://menualista.com/" +
                              site.url +
                              "/" +
                              site.name
                            }
                            className="block text-white-600 mb-4"
                          >
                            {"https://menualista.com/" +
                              site.url +
                              "/" +
                              userData.company}
                          </a>
                          <div className="w-full flex justify-between gap-4">
                            <button
                              onClick={() =>
                                navigate(`/${site.url + "/" + site.name}`)
                              }
                              className="w-[50%] py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 block mx-auto"
                            >
                              View
                            </button>
                            <button
                              onClick={() => navigate(`/site/${site.langId}`)}
                              className="w-[50%] py-2 px-4 bg-white text-black rounded-md hover:bg-gray-100"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTabIndex === 1 && (
              <div>
                <h3 className="text-lg font-semibold">User data</h3>
                <UserCabinetPersonal
                  userData={userData}
                  setUserData={setUserData}
                  fetchData={fetchData}
                  getSites={getSites}
                />
              </div>
            )}

            {activeTabIndex === 2 && (
              <div>
                <h3 className="text-lg font-semibold">Product categories</h3>
                <UserCabinetCategory
                  sites={sites}
                  data={data}
                  fetchData={fetchData}
                />
              </div>
            )}

            {activeTabIndex === 3 && (
              <div>
                <h3 className="text-lg font-semibold">Goods</h3>
                <UserCabinetProducts
                  sites={sites}
                  data={data}
                  fetchData={fetchData}
                />
              </div>
            )}

            {activeTabIndex === 4 && (
              <div>
                <h3 className="text-lg font-semibold">Events</h3>
                <UserCabinetNews
                  sites={sites}
                  data={data}
                  fetchData={fetchData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCabinetInfo;
