import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IProduct } from "../../../../../services/products/products.interface";
import {
  deleteProduct,
  getAllProducts,
} from "../../../../../services/products/products";
import UserCabinetProductsForm from "./components/user-cabinet-products-form/UserCabinetProductsForm";
import UserCabinetProductsTable from "./components/user-cabinet-products-table/UserCabinetProductsTable";

const UserCabinetProducts = () => {
  const [isProductsFormOpen, setProductsFormOpen] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  const notify = (message: string) => toast(message);

  const getAll = async () => {
    const productsData = await getAllProducts();
    setProducts(productsData);
  };

  useEffect(() => {
    // getAll();
  }, []);

  const handleProductsForm = () => {
    setProductsFormOpen((prevState) => !prevState);
  };

  const onEditProduct = (category: IProduct) => {
    navigate(`/admin-blog-update/${category.id}`);
  };

  const onDeleteProduct = async (id: number) => {
    const confirmation = window.confirm(
      "Ви впевнені, що хочете видалити цей блог?"
    );

    if (confirmation) {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await deleteProduct(id, token);
        notify(response.message);
        getAll();
      }
    }
  };

  return (
    <div className="w-full py-4 md:py-6 flex flex-col gap-10">
      <div className="flex flex-col items-center">
        {isProductsFormOpen && (
          <button
            onClick={handleProductsForm}
            className="py-3 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="button"
          >
            Додати товар
          </button>
        )}
        {!isProductsFormOpen && (
          <UserCabinetProductsForm
            getAll={getAll}
            toggleProductsForm={handleProductsForm}
            key={"uniq1"}
          />
        )}
      </div>
      <UserCabinetProductsTable
        products={products}
        handleEditProduct={onEditProduct}
        handleDeleteProduct={onDeleteProduct}
        key={"uniq1"}
      />
    </div>
  );
};

export default UserCabinetProducts;
