import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../../../../../services/products/products.interface";
import { useForm } from "react-hook-form";
import { Accept, useDropzone } from "react-dropzone";
import {
  getProductById,
  updateProduct,
} from "../../../../../../../services/products/products";
import { AdminImage } from "../../../../../../../utils/dropzone/dropzone";
import { deleteImage } from "../../../../../../../services/upload-images/uploadImages";
import { notify, notifyError } from "../../../../../../../helpers/helper";

const UserCabinetProductsUpdate: React.FC = () => {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagePreview, setProductImagesPreview] = useState<
    string[] | null
  >(null);
  const [isEditUploadOpen, setEditUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct>();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const acceptType: Accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  };

  const onDropProductImages = useCallback((acceptedFiles: File[]) => {
    const files = acceptedFiles;
    setProductImages((prevNewImages) => [...prevNewImages, ...files]);

    const productPreviews = files.map((file) => URL.createObjectURL(file));
    setProductImagesPreview((prevPreviews) => [
      ...(prevPreviews || []),
      ...productPreviews,
    ]);
  }, []);

  const {
    getRootProps: getProductRootProps,
    getInputProps: getProductInputProps,
    isDragActive: isProductDragActive,
    isDragAccept: isProductDragAccept,
    isDragReject: isProductDragReject,
    isFocused: isProductFocused,
  } = useDropzone({
    onDrop: onDropProductImages,
    multiple: true,
    accept: acceptType,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getEditedProduct = async () => {
      if (token) {
        try {
          const editedProduct: IProduct = await getProductById(id!, token);
          setEditProduct(editedProduct);

          if (editedProduct) {
            const updatedObject = {
              image: editedProduct.image,
              name: editedProduct.name,
              description: editedProduct.description,
              price: editedProduct.price,
            };
            reset(updatedObject);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getEditedProduct();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      if (token) {
        const response = await deleteImage(editProduct!.image, token);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (productImages.length > 0) {
      productImages.forEach((file) => {
        formData.append("image", file);
      });
    }

    if (token) {
      try {
        const response = await updateProduct(formData, +id!, token);
        notify(response.message);
        navigate("/profile");
        reset();
      } catch (error) {
        console.log(error);
        notifyError("Something went wrong...");
      }
    }
  };

  const handleChangePhoto = () => {
    setEditUploadOpen((prevState) => !prevState);
  };

  return (
    <section className="w-full min-h-screen shape_bg pt-10 px-4 md:px-0">
      <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg">
        <div className="w-full flex flex-col gap-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-black">
            Update product data
          </h2>
          <div className="w-full flex flex-col gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-wrap gap-[20px]"
            >
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                {!isEditUploadOpen && (
                  <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                    <label htmlFor="image" className="text-sm font-semibold">
                      Product image
                    </label>
                    <ul className="">
                      <li className="w-10 h-auto">
                        <img
                          className="w-full h-full"
                          src={editProduct?.image}
                          alt="product preview"
                        />
                      </li>
                    </ul>
                  </div>
                )}
                <div className="w-full flex flex-col gap-3">
                  <button
                    onClick={handleChangePhoto}
                    className="w-[160px] py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="button"
                  >
                    {!isEditUploadOpen ? "Change image" : "Cancel"}
                  </button>
                  {isEditUploadOpen && (
                    <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                      <AdminImage
                        {...getProductRootProps({
                          isdragactive: isProductDragActive.toString(),
                          isdragaccept: isProductDragAccept.toString(),
                          isdragreject: isProductDragReject.toString(),
                          isfocused: isProductFocused.toString(),
                        })}
                      >
                        <input {...getProductInputProps()} />
                        {isProductDragActive ? (
                          <p>Drag and drop files here</p>
                        ) : (
                          <p>Drag and drop files here</p>
                        )}
                      </AdminImage>
                      <ul className="">
                        {productImagePreview &&
                          productImagePreview.map(
                            (newImagePreview: string, index: number) => (
                              <li key={index} className="">
                                <img
                                  className=""
                                  src={newImagePreview}
                                  alt={`category preview ${index}`}
                                />
                              </li>
                            )
                          )}
                      </ul>
                      {errors["image_url"] && (
                        <span className="text-red-500 text-sm">
                          {errors["image_url"]?.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-semibold">
                  Category name
                </label>
                <select
                  onChange={handleCategoryChange}
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={activeCategoryId}
                >
                  {data.global.categories.map(
                    (category: ICategory, index: number) => (
                      <option value={category.id} key={index}>
                        {category.name}
                      </option>
                    )
                  )}
                </select>
                {errors["category"] && (
                  <span className="text-md text-red-500 font-light">
                    {errors["category"]?.message as string}
                  </span>
                )}
              </div> */}
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={errors["name"] ? { border: "1px solid #EB001B" } : {}}
                  placeholder="Name"
                  {...register("name", { required: `Це поле обов'язкове!` })}
                />
                {errors["name"] && (
                  <span className="text-md text-red-500 font-light">
                    {errors["name"]?.message as string}
                  </span>
                )}
              </div>
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-semibold">
                  Description
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={
                    errors["description"] ? { border: "1px solid #EB001B" } : {}
                  }
                  placeholder="Description"
                  {...register("description", {
                    required: `Це поле обов'язкове!`,
                  })}
                />
                {errors["description"] && (
                  <span className="text-md text-red-500 font-light">
                    {errors["description"]?.message as string}
                  </span>
                )}
              </div>
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                <label htmlFor="price" className="text-sm font-semibold">
                  Price
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={errors["price"] ? { border: "1px solid #EB001B" } : {}}
                  placeholder="Price"
                  {...register("price", { required: `Це поле обов'язкове!` })}
                />
                {errors["price"] && (
                  <span className="text-md text-red-500 font-light">
                    {errors["price"]?.message as string}
                  </span>
                )}
              </div>
              <div className="w-full flex md:flex-row flex-col gap-[20px] pt-4 border-t border-gray-300">
                <button
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="submit"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? "Loading..." : "Confirm"}
                </button>
                <button
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                  onClick={() => navigate("/profile")}
                >
                  Back to profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCabinetProductsUpdate;
