import React, { useEffect, useState } from "react";
import UserCabinetCategoryTable from "./components/user-cabinet-category-table/UserCabinetCategoryTable";
import UserCabinetCategoryForm from "./components/user-cabinet-category-form/UserCabinetCategoryForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ICategory } from "../../../../../services/categories/category.interface";
import {
  deleteCategory,
  getAllCategories,
} from "../../../../../services/categories/category";

const UserCabinetCategory: React.FC = () => {
  const [isCategoriesFormOpen, setCategoriesFormOpen] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  const notify = (message: string) => toast(message);

  const getAll = async () => {
    const categoriesData = await getAllCategories();
    setCategories(categoriesData);
  };

  useEffect(() => {
    // getAll();
  }, []);

  const handleCategoriesForm = () => {
    setCategoriesFormOpen((prevState) => !prevState);
  };

  const onEditCategory = (category: ICategory) => {
    navigate(`/admin-blog-update/${category.id}`);
  };

  const onDeleteCategory = async (id: number) => {
    const confirmation = window.confirm(
      "Ви впевнені, що хочете видалити цей блог?"
    );

    if (confirmation) {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await deleteCategory(id, token);
        notify(response.message);
        getAll();
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
            Додати категорію
          </button>
        )}
        {!isCategoriesFormOpen && (
          <UserCabinetCategoryForm
            getAll={getAll}
            toggleCategoriesForm={handleCategoriesForm}
            key={"uniq1"}
          />
        )}
      </div>
      <UserCabinetCategoryTable
        categories={categories}
        handleEditCategory={onEditCategory}
        handleDeleteCategory={onDeleteCategory}
        key={"uniq1"}
      />
    </div>
  );
};

export default UserCabinetCategory;
