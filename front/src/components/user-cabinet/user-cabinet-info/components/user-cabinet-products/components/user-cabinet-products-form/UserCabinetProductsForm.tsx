import React, { useCallback, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { createProduct } from "../../../../../../../services/products/products";
import { AdminImage } from "../../../../../../../utils/dropzone/dropzone";
import { ICategory } from "../../../../../../../services/categories/category.interface";
import imageCompression from "browser-image-compression";
import { notify, notifyError } from "../../../../../../../helpers/helper";
import Loader from "../../../../../../loader/Loader";
import Select from "react-select"; // Імпортуємо react-select

interface Props {
  toggleProductsForm: () => void;
  data: any;
  sites: any;
  fetchData: any;
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
                                                    fetchData,
                                                  }) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>();

  const acceptType: Accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  };

  const onDropMainImage = useCallback(async (acceptedFiles: File[]) => {
    setIsLoadingImage(true);
    const file = acceptedFiles[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedBlob = await imageCompression(file, options);

    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    setMainImage(compressedFile);
    setMainImagePreview(URL.createObjectURL(compressedFile));
    setIsLoadingImage(false);
  }, []);

  useEffect(() => {
    setActiveCategoryId(data.global.categories[0].id);
  }, []);

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

  const handleCategoryChange = (selectedOption: any) => {
    setActiveCategoryId(selectedOption.value);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (mainImage) {
      formData.append("image", mainImage);
    }

    formData.append("categoryId", activeCategoryId || "");
    formData.append("isPopular", String(isPopular)); // Додаємо значення популярності

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await createProduct(
            String(+sites[0].id),
            formData,
            token
        );
        notify(response.message);

        reset();
        toggleProductsForm();
        setMainImagePreview(null);
        fetchData();
      } catch (error) {
        console.error("Error creating product:", error);
        notifyError("Something went wrong...");
      } finally {
        setIsLoading(false);
      }
    } else {
      notifyError("Please re-log in!");
      setIsLoading(false);
    }
  };

  if (isLoadingImage) {
    return <Loader />;
  }

  // Створення опцій для селектора категорій
  const categoryOptions = data.global.categories.map((category: ICategory) => ({
    value: category.id,
    label: category.name,
  }));

  return (
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-wrap gap-[20px]"
      >
        {/* Використання кастомного селектора категорій */}
        <div className="w-full md:w-[calc(50%-10px)]   flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-semibold">
            Category name
          </label>
          <Select
              options={categoryOptions}
              onChange={handleCategoryChange}
              defaultValue={categoryOptions.find((option: any) => option.value === activeCategoryId)}
              className="w-full"
              classNamePrefix="react-select"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#E6F0FF',
                  primary: '#007BFF',
                },
              })}
          />
          {errors["category"] && (
              <span className="text-md text-red-500 font-light">
            {errors["category"]?.message as string}
          </span>
          )}
        </div>

        {/* Ваше поле для завантаження зображення */}
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
                <p>Drag 'n' drop an image here, or click to select one</p>
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

        {/* Поле для імені продукту */}
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

        {/* Поле для опису продукту */}
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

        {/* Поле для ціни продукту */}
        <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
          <label htmlFor="price" className="text-sm font-semibold">
            Price
          </label>
          <input
              type="number"
              className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              style={errors["price"] ? { border: "1px solid #EB001B" } : {}}
              placeholder="Price"
              step="0.01"
              {...register("price", { required: `Це поле обов'язкове!` })}
          />
          {errors["price"] && (
              <span className="text-md text-red-500 font-light">
            {errors["price"]?.message as string}
          </span>
          )}
        </div>

        {/* Чекбокс для популярності */}
        <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
          <label htmlFor="isPopular" className="text-sm font-semibold text-gray-700">
            Is Popular
          </label>
          <div className="flex items-center py-2   space-x-3">
            <input
                id="isPopular"
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="h-5 w-5  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPopular" className="text-gray-700 cursor-pointer">
              Mark as popular
            </label>
          </div>
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
              className="w-full py-2.5 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
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
