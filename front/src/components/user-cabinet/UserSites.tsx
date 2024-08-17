import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSites } from "../../services/server";
import UserCabinetInterface from "./user-cabinet-interface/UserCabinetInterface";
import UserCabinetInfo from "./user-cabinet-info/UserCabinetInfo";

interface UserSitesProps {
  onEditSite: (id: number) => void;
}

function UserSites({ onEditSite }: UserSitesProps) {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

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
    <div className="w-full p-4 shape_bg">
      <div className="container mx-auto flex items-center flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-white">
          Welcome in your Account!
        </h2>
        <UserCabinetInterface />
        <UserCabinetInfo />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div key={site.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
              <p className="text-gray-600 mb-4">{site.url}</p>
              <button
                onClick={() => navigate(`/site/${site.id}`)} // Навігація на сторінку конструктора
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/add-site")}
          className="mt-6 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 block mx-auto"
        >
          Add New Site
        </button> */}
      </div>
    </div>
  );
}

export default UserSites;
