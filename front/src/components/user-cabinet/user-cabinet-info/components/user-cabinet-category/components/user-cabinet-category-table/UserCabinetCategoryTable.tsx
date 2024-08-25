import React from "react";
import { ICategory } from "../../../../../../../services/categories/category.interface";

interface Props {
  handleEditCategory: (category: ICategory) => void;
  handleDeleteCategory: (id: number) => void;
  categories: ICategory[];
}

const UserCabinetCategoryTable: React.FC<Props> = ({
  handleDeleteCategory,
  handleEditCategory,
  categories,
}) => {
  return (
    <div className="w-full overflow-x-scroll flex flex-col gap-5">
      {categories.length > 0 ? (
        <table className="w-full border-collapse">
          <thead className="w-full">
            <tr className="w-full">
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-white text-center">
                Зображення
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-white text-center">
                Назва категорії
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-white text-center">
                Дії
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: ICategory, index) => (
              <tr key={index} className="w-full">
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-white text-center">
                  <img
                    src={category.image}
                    alt="category img"
                    className="h-[160px] mx-auto"
                  />
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-white text-center">
                  {category.name}
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-dark text-center">
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="w-[148px] bg-primary rounded-lg border border-primary outline-none cursor-pointer py-2 px-0 font-medium text-lg text-dark transition-all duration-400 shadow-[0_24px_46px_rgba(240,92,0,0.332)] mb-2 hover:scale-110"
                    type="button"
                  >
                    Видалити
                  </button>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="w-[148px] bg-primary rounded-lg border border-primary outline-none cursor-pointer py-2 px-0 font-medium text-lg text-dark transition-all duration-400 shadow-[0_24px_46px_rgba(240,92,0,0.332)] mb-2 hover:scale-110"
                    type="button"
                  >
                    Редагувати
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="py-14 text-md font-medium text-black text-center">
          Категорій ще немає, додайте одну щоб побачити її тут...
        </p>
      )}
    </div>
  );
};

export default UserCabinetCategoryTable;
