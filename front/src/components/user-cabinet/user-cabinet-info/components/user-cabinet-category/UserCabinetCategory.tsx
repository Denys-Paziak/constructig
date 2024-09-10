import React, { useState } from "react";
import UserCabinetCategoryTable from "./components/user-cabinet-category-table/UserCabinetCategoryTable";
import UserCabinetCategoryForm from "./components/user-cabinet-category-form/UserCabinetCategoryForm";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../../../services/categories/category.interface";
import {
  deleteCategory,
} from "../../../../../services/categories/category";
import { notify } from "../../../../../helpers/helper";

interface Props {
  sites: any;
  data: any;
  fetchData: any;
}

const UserCabinetCategory: React.FC<Props> = ({ sites, data, fetchData }) => {
  const [isCategoriesFormOpen, setCategoriesFormOpen] = useState(true);
  // const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  const getAll = async () => {
    // const categoriesData = await getAllCategories();
    // setCategories(categoriesData);
  };

  const handleCategoriesForm = () => {
    setCategoriesFormOpen((prevState) => !prevState);
  };

  const onEditCategory = (category: ICategory) => {
    navigate(`/category-update/${category.id}`);
  };

  const onDeleteCategory = async (id: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this category?"
    );

    if (confirmation) {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await deleteCategory(id, token);
        notify(response.message);
        fetchData();
      }
    }
  };

  return (
    <div className="w-full py-4 md:py-6 flex flex-col gap-10">
      <div className="flex flex-col items-center">
        {isCategoriesFormOpen && (
          <button
            onClick={handleCategoriesForm}
            className="py-3 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="button"
          >
            Add category
          </button>
        )}
        {!isCategoriesFormOpen && (
          <UserCabinetCategoryForm
            getAll={getAll}
            sites={sites}
            toggleCategoriesForm={handleCategoriesForm}
            key={"uniq1"}
            fetchData={fetchData}
          />
        )}
      </div>
      <UserCabinetCategoryTable
        data={data}
        handleEditCategory={onEditCategory}
        handleDeleteCategory={onDeleteCategory}
        key={"uniq1"}
      />
    </div>
  );
};

export default UserCabinetCategory;
