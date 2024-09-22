import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../../../services/products/products.interface";
import { deleteProduct } from "../../../../../services/products/products";
import UserCabinetProductsForm from "./components/user-cabinet-products-form/UserCabinetProductsForm";
import UserCabinetProductsTable from "./components/user-cabinet-products-table/UserCabinetProductsTable";
import { notify } from "../../../../../helpers/helper";
import { toast } from "react-toastify";

interface Props {
  data: any;
  sites: any;
  fetchData: any;
}

const UserCabinetProducts: React.FC<Props> = ({ data, sites, fetchData }) => {
  const [isProductsFormOpen, setProductsFormOpen] = useState(true);
  const navigate = useNavigate();

  const notifyError = (message: string) => {
    toast.error(message, {
      autoClose: 2000,
    });
  };

  const handleProductsForm = () => {
    if (data.global.categories.length > 0) {
      setProductsFormOpen((prevState) => !prevState);
    } else {
      notifyError("First, add a category and then a product");
    }
  };

  const onEditProduct = (category: IProduct) => {
    navigate(`/product-update/${category.id}`);
  };

  const onDeleteProduct = async (id: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (confirmation) {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await deleteProduct(id, token);
        notify(response.message);
        fetchData();
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
            Add product
          </button>
        )}
        {!isProductsFormOpen && (
          <UserCabinetProductsForm
            data={data}
            sites={sites}
            toggleProductsForm={handleProductsForm}
            key={"uniq1"}
            fetchData={fetchData}
          />
        )}
      </div>
      <UserCabinetProductsTable
        data={data}
        handleEditProduct={onEditProduct}
        handleDeleteProduct={onDeleteProduct}
        key={"uniq1"}
      />
    </div>
  );
};

export default UserCabinetProducts;
