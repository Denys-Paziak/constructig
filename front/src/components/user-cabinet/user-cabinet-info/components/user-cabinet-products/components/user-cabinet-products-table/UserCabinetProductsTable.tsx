import React from "react";
import { IProduct } from "../../../../../../../services/products/products.interface";

interface Props {
  handleEditProduct: (category: IProduct) => void;
  handleDeleteProduct: (id: number) => void;
  data: any;
}

const UserCabinetProductsTable: React.FC<Props> = ({
  handleEditProduct,
  handleDeleteProduct,
  data,
}) => {
  return (
    <div className="w-full overflow-x-scroll flex flex-col gap-5">
      {data.global.items.length > 0 ? (
        <table className="w-full border-collapse">
          <thead className="w-full">
            <tr className="w-full">
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                Image
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                Category name
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                Name
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                Description
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                Price
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.global.items.map((product: IProduct, index: number) => (
              <tr key={index} className="w-full">
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">


                  {product.image && <img
                      src={product.image}
                      alt="category img"
                      className="h-[160px] mx-auto"
                  />}
                </td>
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                {product.category_name}
                </td>
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                  {product.name}
                </td>
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                  {product.description}
                </td>
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                  {product.price}
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-dark text-center">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="w-full py-2.5 px-4 bg-blue-600 mt-4 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="py-14 text-md font-medium text-black text-center">
          There are no products yet, add one to see it here...
        </p>
      )}
    </div>
  );
};

export default UserCabinetProductsTable;
