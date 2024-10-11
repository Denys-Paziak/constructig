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
import { useTranslation } from "react-i18next";
import Cropper from 'react-easy-crop'
import getCroppedImg from "../../../../../../../utils/cropImageUtil.ts";

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
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState({});
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

  const [openCrop, setOpenCrop] = useState(false);

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
  const { t } = useTranslation();

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
    setOpenCrop(true)
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

  const categoryOptions = data.global.categories.map((category: ICategory) => ({
    value: category.id,
    label: category.name,
  }));

  console.log(mainImage);

  const onCropHandler = async () => {

    const croppedImageBlob = await getCroppedImg(mainImagePreview, croppedAreaPixels);
    const croppedFile = new File([croppedImageBlob], mainImage?.name || 'cropped_image.jpg', {
      type: mainImage?.type || 'image/jpeg',
      lastModified: Date.now(),
    });

    setMainImage(croppedFile);
    setMainImagePreview(URL.createObjectURL(croppedFile));
    setOpenCrop(false);
  };


  const onCropComplete = ( (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  });

  return (
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-wrap gap-[20px]"
      >
        <div className="w-full md:w-[calc(50%-10px)]   flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-semibold">
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel1")}
          </label>

          {openCrop && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                {/* Контейнер для обрізувача зображення */}
                <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="relative w-full h-96 sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100">
                    <Cropper
                        image={mainImagePreview}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                  </div>

                  {/* Контейнер для кнопок */}
                  <div className="p-4 bg-white border-t border-gray-300 flex justify-between items-center">
                    {/* Слайдер для зміни зума */}
                    <div className="flex items-center gap-2">
                      <label htmlFor="zoom" className="text-gray-700">Zoom:</label>
                      <input
                          id="zoom"
                          type="range"
                          min="1"
                          max="3"
                          step="0.1"
                          value={zoom}
                          onChange={(e) => setZoom(e.target.value)}
                          className="w-40"
                      />
                    </div>
                    {/* Кнопки для обрізки і скасування */}
                    <div className="flex gap-4">
                      <button
                          className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          onClick={onCropHandler}
                      >
                        Обрізати
                      </button>
                      <button
                          className="px-6 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          onClick={() => setOpenCrop(false)}
                      >
                        Скасувати
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}



          <Select
              options={categoryOptions}
              onChange={handleCategoryChange}
              defaultValue={categoryOptions.find(
                  (option: any) => option.value === activeCategoryId
              )}
              className="w-full"
              classNamePrefix="react-select"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#E6F0FF",
                  primary: "#007BFF",
                },
              })}
          />
          {errors["category"] && (
              <span className="text-md text-red-500 font-light">
            {errors["category"]?.message as string}
          </span>
          )}
        </div>

        <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
          <label htmlFor="image" className="text-sm font-semibold">
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel2")}
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
                <p>
                  {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsPlaceholder2")}
                </p>
            ) : (
                <p>
                  {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsPlaceholder2")}
                </p>
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
          <label htmlFor="name" className="text-sm font-semibold">
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel3")}
          </label>
          <input
              type="text"
              className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              style={errors["name"] ? { border: "1px solid #EB001B" } : {}}
              placeholder={t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel3")}
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
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel4")}
          </label>
          <input
              type="text"
              className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              style={errors["description"] ? { border: "1px solid #EB001B" } : {}}
              placeholder={t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel4")}
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
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel5")}
          </label>
          <input
              type="number"
              className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              style={errors["price"] ? { border: "1px solid #EB001B" } : {}}
              placeholder={t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel5")}
              step="0.01"
              {...register("price", { required: `Це поле обов'язкове!` })}
          />
          {errors["price"] && (
              <span className="text-md text-red-500 font-light">
            {errors["price"]?.message as string}
          </span>
          )}
        </div>

        <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
          <label
              htmlFor="isPopular"
              className="text-sm font-semibold text-gray-700"
          >
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel6")}
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
              {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsPlaceholder6")}
            </label>
          </div>
        </div>

        <div className="w-full flex md:flex-row flex-col gap-[20px] pt-4 border-t border-gray-300">
          <button
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
              disabled={isLoading || !isValid}
          >
            {isLoading
                ? t("admin.adminInfo.adminInfoGoods.adminInfoGoodsButtonLoading")
                : t("admin.adminInfo.adminInfoGoods.adminInfoGoodsButtonConfirm")}
          </button>
          <button
              onClick={toggleProductsForm}
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
              disabled={isLoading}
          >
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsButtonCancel")}
          </button>
        </div>
      </form>
  );
};

export default UserCabinetProductsForm;
