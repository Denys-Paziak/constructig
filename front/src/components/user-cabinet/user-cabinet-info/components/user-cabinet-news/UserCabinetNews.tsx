import React, { useState } from "react";
import UserCabinetNewsForm from "./components/user-cabinet-news-form/UserCabinetNewsForm";
import UserCabinetNewsTable from "./components/user-cabinet-news-table/UserCabinetNewsTable";
import { INew } from "../../../../../services/news/news.interface";
import { useNavigate } from "react-router-dom";
import { deleteNew } from "../../../../../services/news/news";
import { notify } from "../../../../../helpers/helper";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  sites: any;
  fetchData: any;
}

const UserCabinetNews: React.FC<Props> = ({ data, sites, fetchData }) => {
  const [isNewsFormOpen, setNewsFormOpen] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNewsForm = () => {
    setNewsFormOpen((prevState) => !prevState);
  };

  const onEditProduct = (oneNew: INew) => {
    navigate(`/new-update/${oneNew.id}`);
  };

  const onDeleteProduct = async (id: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this event?"
    );

    if (confirmation) {
      const token = localStorage.getItem("token");

      if (token) {
        console.log("id", id);
        const response = await deleteNew(id, token);
        notify(response.message);
        fetchData();
      }
    }
  };

  return (
    <div className="w-full py-4 md:py-6 flex flex-col gap-10">
      <div className="flex flex-col items-center">
        {isNewsFormOpen && (
          <button
            onClick={handleNewsForm}
            className="py-3 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="button"
          >
            {t("admin.adminInfo.adminInfoEvents.adminInfoEventsButtonAdd")}
          </button>
        )}
        {!isNewsFormOpen && (
          <UserCabinetNewsForm
            sites={sites}
            toggleNewsForm={handleNewsForm}
            key={"uniq1"}
            fetchData={fetchData}
          />
        )}
      </div>
      <UserCabinetNewsTable
        data={data}
        handleEditNew={onEditProduct}
        handleDeleteNew={onDeleteProduct}
        key={"uniq1"}
      />
    </div>
  );
};

export default UserCabinetNews;
