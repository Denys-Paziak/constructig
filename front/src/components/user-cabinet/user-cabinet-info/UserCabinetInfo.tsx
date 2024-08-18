import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSites } from "../../../services/server";
import { IGetMe } from "../../../services/auth/getMe/getMe.interface";

interface Props {
  userData: IGetMe;
}

const UserCabinetInfo: React.FC<Props> = ({ userData }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    getUserSites(token || "")
      .then((data) => {
        setSites(data.sites || []);
      })
      .catch((error) => {
        console.error("Error fetching sites:", error);
      });
  }, []);

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-start flex-col gap-6">
        <div>
          <h3 className="text-black text-xl font-semibold">User Info:</h3>
        </div>
        <div className="w-full">
          <ul className="flex flex-wrap border-b border-gray-200">
            <li
              className={`mr-4 ${
                activeTabIndex === 0 ? "bg-gray-100 rounded-md" : "inactive"
              }`}
            >
              <button
                onClick={() => handleTabClick(0)}
                className={`inline-block text-blue-600 hover:text-blue-700 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${
                  activeTabIndex === 0 ? "bg-gray-100 rounded-md" : ""
                }`}
              >
                Websites
              </button>
            </li>
            <li
              className={`mr-2 ${
                activeTabIndex === 1 ? "bg-gray-100" : "inactive"
              }`}
            >
              <button
                onClick={() => handleTabClick(1)}
                className={`inline-block text-blue-600 hover:text-blue-700 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${
                  activeTabIndex === 1 ? "bg-gray-100" : ""
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
          <div className="w-full px-1 py-2">
            {activeTabIndex === 0 && (
              <div className="w-full flex items-start flex-col gap-6">
                <h3 className="text-lg font-semibold">Websites Content</h3>
                <div className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sites.map((site) => (
                      <div
                        key={site.id}
                        className="bg-gray-100 shadow-xl rounded-lg p-6"
                      >
                        <h3 className="text-xl font-semibold mb-2">
                          {site.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{site.url}</p>
                        <div className="w-full flex justify-between gap-4">
                          <button
                            onClick={() => navigate(`/${userData.company}`)}
                            className="w-[50%] py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 block mx-auto"
                          >
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/site/${site.id}`)}
                            className="w-[50%] py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          >
                            Edit
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
                <h3 className="text-lg font-semibold">Settings Content</h3>
                <div>hello from settings</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCabinetInfo;
