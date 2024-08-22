import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGetMe } from "../../../services/auth/getMe/getMe.interface";
import UserCabinetPersonal from "./user-cabinet-personal/UserCabinetPersonal";
import Loader from "../../loader/Loader";
import { getUserSites } from "../../../services/getSite/getSite";

interface Props {
  userData: IGetMe;
  setUserData: (response: any) => void;
}

const UserCabinetInfo: React.FC<Props> = ({ userData, setUserData }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [sites, setSites] = useState<any>([]);
  const navigate = useNavigate();

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getSites = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const response = await getUserSites(token);
        setSites(response.sites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSites();
  }, []);

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
          <ul className="flex flex-wrap border-b border-gray-200">
            <li
              className={` ${activeTabIndex === 0 ? "bg-gray-100 rounded-md" : "inactive"
                }`}
            >
              <button
                onClick={() => handleTabClick(0)}
                className={`inline-block text-black  hover:bg-blue-500 hover:text-white rounded-l-lg py-4 px-4 text-sm font-medium text-center ${activeTabIndex === 0 ? "bg-blue-500 text-white" : ""
                  }`}
              >
                Сайти
              </button>
            </li>
            <li
              className={`mr-2 ${activeTabIndex === 1 ? "bg-gray-100" : "inactive"
                }`}
            >
              <button
                onClick={() => handleTabClick(1)}
                className={`inline-block text-black hover:bg-blue-500 hover:text-white rounded-r-lg py-4 px-4 text-sm font-medium text-center ${activeTabIndex === 1 ? "bg-blue-500 text-white" : ""
                  }`}
              >
                Налаштування
              </button>
            </li>
          </ul>
          <div className="w-full px-1 py-2">
            {activeTabIndex === 0 && (
              <div className="w-full flex items-start flex-col gap-6 py-6">
                <div className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sites.map((site: any) => (
                      <div
                        key={site.id}
                        className="shadow-xl rounded-lg p-6 shape_bg text-white"
                      >
                        <h3 className="text-xl font-semibold mb-2">
                          {site.name}
                        </h3>
                        <a
                          href={"http://localhost:5173/" + site.url}
                          className="block text-white-600 mb-4"
                        >
                          {"http://localhost:5173/" + site.url}
                        </a>
                        <div className="w-full flex justify-between gap-4">
                          <button
                            onClick={() => navigate(`/${userData.company}`)}
                            className="w-[50%] py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 block mx-auto"
                          >
                            Переглянути
                          </button>
                          <button
                            onClick={() => navigate(`/site/${site.id}`)}
                            className="w-[50%] py-2 px-4 bg-white text-black rounded-md hover:bg-gray-100"
                          >
                            Редагувати
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTabIndex === 1 && (
              <div>
                <h3 className="text-lg font-semibold">
                  Змінна данних користувача
                </h3>
                <UserCabinetPersonal
                  userData={userData}
                  setUserData={setUserData}
                  setSites={setSites}
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
