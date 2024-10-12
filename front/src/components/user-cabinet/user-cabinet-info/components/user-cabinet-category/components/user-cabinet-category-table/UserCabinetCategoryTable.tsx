import React from "react";
import { ICategory } from "../../../../../../../services/categories/category.interface";
import { useTranslation } from "react-i18next";

interface Props {
  handleEditCategory: (category: ICategory) => void;
  handleDeleteCategory: (id: number) => void;
  data: any;
}

const UserCabinetCategoryTable: React.FC<Props> = ({
  handleDeleteCategory,
  handleEditCategory,
  data,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-x-scroll flex flex-col gap-5">
      {data.global.categories.length > 0 ? (
        <table className="w-full border-collapse">
          <thead className="w-full">
            <tr className="w-full">
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                {t(
                  "admin.adminInfo.adminInfoCategories.adminInfoCategoriesImage"
                )}
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                {t(
                  "admin.adminInfo.adminInfoCategories.adminInfoCategoriesCategoryName"
                )}
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                {t(
                  "admin.adminInfo.adminInfoCategories.adminInfoCategoriesActions"
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.global.categories.map(
              (category: ICategory, index: number) => (
                <tr key={index} className="w-full">
                  <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                    {category.image && (
                      <img
                        src={category.image}
                        alt="category img"
                        className="min-w-[160px] object-cover max-w-[160px] min-h-[160px] max-h-[160px] mx-auto"
                      />
                    )}
                  </td>
                  <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                    {category.name}
                  </td>
                  <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-dark text-center">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      type="button"
                    >
                      {t(
                        "admin.adminInfo.adminInfoCategories.adminInfoCategoriesActionsDelete"
                      )}
                    </button>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="w-full py-2.5 px-4 bg-blue-600 mt-4 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      type="button"
                    >
                      {t(
                        "admin.adminInfo.adminInfoCategories.adminInfoCategoriesActionsEdit"
                      )}
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p className="py-14 text-md font-medium text-black text-center">
          {t(
            "admin.adminInfo.adminInfoCategories.adminInfoCategoriesEmptyText"
          )}
        </p>
      )}
    </div>
  );
};

export default UserCabinetCategoryTable;
