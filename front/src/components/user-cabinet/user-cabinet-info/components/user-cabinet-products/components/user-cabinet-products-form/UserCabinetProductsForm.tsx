import React, { useCallback, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createProduct } from "../../../../../../../services/products/products";
import { AdminImage } from "../../../../../../../utils/dropzone/dropzone";
import { ICategory } from "../../../../../../../services/categories/category.interface";

interface Props {
  toggleProductsForm: () => void;
  data: any;
  sites: any;
  fetchData: any
}

interface FormValues {
  category: string;
  name: string;
  description: string;
  price: string;
}

const UserCabinetProductsForm: React.FC<Props> = ({
  toggleProductsForm,
  data,
  sites,
  fetchData
}) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });
  const [activeCategoryId, setActiveCategoryId] = useState<
    string | undefined
  >();

  const acceptType: Accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  };

  const onDropMainImage = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  }, []);


  useEffect(() => {
    setActiveCategoryId(data.global.categories[0].id);
  });

  const {
    getRootProps: getMainRootProps,
    getInputProps: getMainInputProps,
    isDragActive: isMainDragActive,
    isDragAccept: isMainDragAccept,
    isDragReject: isMainDragReject,
    isFocused: isMainFocused,
  } = useDropzone({
    onDrop: onDropMainImage,
    multiple: false,
    accept: acceptType,
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = event.target.value;
    setActiveCategoryId(selectedCategoryId);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    console.log(activeCategoryId);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (mainImage) {
      formData.append("image", mainImage);
    }

    formData.append("categoryId", activeCategoryId || "");

    const token = localStorage.getItem("token");
    const notify = (message: string) => toast(message);

    if (token) {
      try {
        const response = await createProduct(+sites[0].id, formData, token);
        notify(response.message);
        reset();
        toggleProductsForm();
        setMainImagePreview(null);
        fetchData();
      } catch (error) {
        console.error("Error creating product:", error);
        notify("Something went wrong...");
      } finally {
        setIsLoading(false);
      }
    } else {
      notify("Please log in!");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-[20px]"
    >
      <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
        <label htmlFor="image" className="text-sm font-semibold">
          Product image
        </label>
        <AdminImage
          {...getMainRootProps({
            isdragactive: isMainDragActive.toString(),
            isdragaccept: isMainDragAccept.toString(),
            isdragreject: isMainDragReject.toString(),
            isfocused: isMainFocused.toString(),
          })}
        >
          <input {...getMainInputProps()} />
          {isMainDragActive ? (
            <p>Drag and drop files here</p>
          ) : (
            <p>Drag and drop files here</p>
          )}
        </AdminImage>
        {mainImagePreview && (
          <div className="w-12 h-12 mr-4">
            <img
              src={mainImagePreview}
              alt="banner preview"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
      <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
        <label htmlFor="category" className="text-sm font-semibold">
          Category name
        </label>
        <select
          onChange={handleCategoryChange}
          className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={activeCategoryId}
        >
          {data.global.categories.map((category: ICategory, index: number) => (
            <option value={category.id} key={index}>
              {" "}
              {category.name}
            </option>
          ))}
        </select>
        {errors["category"] && (
          <span className="text-md text-red-500 font-light">
            {errors["category"]?.message as string}
          </span>
        )}
      </div>
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
          style={errors["description"] ? { border: "1px solid #EB001B" } : {}}
          placeholder="Description"
          {...register("description", { required: `Це поле обов'язкове!` })}
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
          onClick={toggleProductsForm}
          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="button"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserCabinetProductsForm;
