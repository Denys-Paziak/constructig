import React from "react";
import { IProduct } from "../../../../../../../services/products/products.interface";

interface Props {
  handleEditProduct: (category: IProduct) => void;
  handleDeleteProduct: (id: number) => void;
  products: IProduct[];
}

const UserCabinetProductsTable: React.FC<Props> = ({
  handleEditProduct,
  handleDeleteProduct,
  products,
}) => {
  return (
    <div className="w-full overflow-x-scroll flex flex-col gap-5">
      {products.length > 0 ? (
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
                Назва
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-white text-center">
                Опис
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-white text-center">
                Ціна
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-white text-center">
                Дії
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: IProduct, index) => (
              <tr key={index} className="w-full">
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-white text-center">
                  <img
                    src={product.image_url}
                    alt="category img"
                    className="h-[160px] mx-auto"
                  />
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-white text-center">
                  {product.category}
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-white text-center">
                  {product.title}
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-white text-center">
                  {product.text}
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-white text-center">
                  {product.price}
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-dark text-center">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-[148px] bg-primary rounded-lg border border-primary outline-none cursor-pointer py-2 px-0 font-medium text-lg text-dark transition-all duration-400 shadow-[0_24px_46px_rgba(240,92,0,0.332)] mb-2 hover:scale-110"
                    type="button"
                  >
                    Видалити
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
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
          Товарів ще немає, додайте одного щоб побачити його тут...
        </p>
      )}
    </div>
  );
};

export default UserCabinetProductsTable;
