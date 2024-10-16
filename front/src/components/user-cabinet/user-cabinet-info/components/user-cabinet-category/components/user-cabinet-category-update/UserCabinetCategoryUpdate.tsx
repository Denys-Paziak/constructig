import React, { useCallback, useEffect, useState } from "react";
import { ICategory } from "../../../../../../../services/categories/category.interface";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Accept, useDropzone } from "react-dropzone";
import {
  getCategoryById,
  updateCategory,
} from "../../../../../../../services/categories/category";
import { AdminImage } from "../../../../../../../utils/dropzone/dropzone";
import { deleteImage } from "../../../../../../../services/upload-images/uploadImages";
import { notify, notifyError } from "../../../../../../../helpers/helper";
import { useTranslation } from "react-i18next";
import Cropper from "react-easy-crop"; // Імпорт обрізувача
import imageCompression from "browser-image-compression"; // Імпорт стиснення зображення
import { getCroppedImg } from "../../../../../../../utils/cropImageUtil.ts"; // Функція для обрізання зображення

const UserCabinetCategoryUpdate: React.FC = () => {
  const [categoryImages, setCategoryImages] = useState<File[]>([]);
  const [categoryImagesPreview, setCategoryImagesPreview] = useState<
    string[] | null
  >(null);
  const [isEditUploadOpen, setEditUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<ICategory>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [openCrop, setOpenCrop] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();
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

  const onDropCategoryImages = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // Стиснення зображення
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

    setCategoryImages([compressedFile]);
    setCategoryImagesPreview([URL.createObjectURL(compressedFile)]);
    setOpenCrop(true); // Відкриваємо обрізувач
  }, []);

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropHandler = async () => {
    const croppedImage = await getCroppedImg(
      categoryImagesPreview![0],
      croppedAreaPixels
    );
    const uniqueFileName = `cropped_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}.jpg`;
    const croppedFile = new File([croppedImage], uniqueFileName, {
      type: categoryImages[0].type,
    });
    setCategoryImages([croppedFile]);
    setCategoryImagesPreview([URL.createObjectURL(croppedFile)]);
    setOpenCrop(false);
  };

  const {
    getRootProps: getCategoryRootProps,
    getInputProps: getCategoryInputProps,
    isDragActive: isCategoryDragActive,
    isDragAccept: isCategoryDragAccept,
    isDragReject: isCategoryDragReject,
    isFocused: isCategoryFocused,
  } = useDropzone({
    onDrop: onDropCategoryImages,
    multiple: false,
    accept: acceptType,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getEditedCategory = async () => {
      if (token) {
        try {
          const editedCategory: ICategory = await getCategoryById(id!, token);
          setEditCategory(editedCategory);

          if (editedCategory) {
            const updatedObject = {
              image_url: editedCategory.image,
              name: editedCategory.name,
            };
            reset(updatedObject);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getEditedCategory();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (categoryImages.length > 0) {
      categoryImages.forEach((file) => {
        formData.append("image", file);
      });

      if (token) {
        await deleteImage(editCategory!.image, token);
      }
    }

    if (token) {
      try {
        const response = await updateCategory(formData, id!, token);
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
            {t(
              "admin.adminInfo.adminInfoCategories.adminInfoCategoriesEditTitle"
            )}
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
                      {t(
                        "admin.adminInfo.adminInfoCategories.adminInfoCategoriesLabel1"
                      )}
                    </label>
                    <ul className="">
                      <li className="w-10 h-auto">
                        <img
                          className="w-full h-full"
                          src={editCategory?.image}
                          alt="category preview"
                        />
                      </li>
                    </ul>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleChangePhoto}
                    className="w-[160px] py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="button"
                  >
                    {!isEditUploadOpen
                      ? t(
                          "admin.adminInfo.adminInfoCategories.adminInfoCategoriesEditChangeImage"
                        )
                      : t(
                          "admin.adminInfo.adminInfoCategories.adminInfoCategoriesButtonCancel"
                        )}
                  </button>
                  {isEditUploadOpen && (
                    <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                      <AdminImage
                        {...getCategoryRootProps({
                          isdragactive: isCategoryDragActive.toString(),
                          isdragaccept: isCategoryDragAccept.toString(),
                          isdragreject: isCategoryDragReject.toString(),
                          isfocused: isCategoryFocused.toString(),
                        })}
                      >
                        <input {...getCategoryInputProps()} />
                        {isCategoryDragActive ? (
                          <p>
                            {t(
                              "admin.adminInfo.adminInfoCategories.adminInfoCategoriesPlaceholder1"
                            )}
                          </p>
                        ) : (
                          <p>
                            {t(
                              "admin.adminInfo.adminInfoCategories.adminInfoCategoriesPlaceholder1"
                            )}
                          </p>
                        )}
                      </AdminImage>
                      <ul className="">
                        {categoryImagesPreview &&
                          categoryImagesPreview.map(
                            (categoryImagePreview: string, index: number) => (
                              <li key={index} className="">
                                <img
                                  className=""
                                  src={categoryImagePreview}
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
              {openCrop && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                  <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100">
                      <Cropper
                        image={categoryImagesPreview![0]}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                    <div className="p-4 bg-white border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center">
                      <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <label htmlFor="zoom" className="text-gray-700">
                          {t("cropImage.cropImageZoom")}
                        </label>
                        <input
                          id="zoom"
                          type="range"
                          min="1"
                          max="3"
                          step="0.1"
                          value={zoom}
                          onChange={(e: any) => setZoom(e.target.value)}
                          className="w-full sm:w-40"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div
                          className="px-6 text-center py-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          onClick={onCropHandler}
                        >
                          {t("cropImage.cropImageButton1")}
                        </div>
                        <div
                          className="px-6 py-2 text-center text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          onClick={() => setOpenCrop(false)}
                        >
                          {t("cropImage.cropImageButton2")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  {t(
                    "admin.adminInfo.adminInfoCategories.adminInfoCategoriesLabel2"
                  )}
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={errors["name"] ? { border: "1px solid #EB001B" } : {}}
                  placeholder={t(
                    "admin.adminInfo.adminInfoCategories.adminInfoCategoriesLabel2"
                  )}
                  {...register("name", { required: `Це поле обов'язкове!` })}
                />
                {errors["name"] && (
                  <span className="text-md text-red-500 font-light">
                    {errors["name"]?.message as string}
                  </span>
                )}
              </div>
              <div className="w-full flex md:flex-row flex-col gap-[20px] pt-4 border-t border-gray-300">
                <button
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="submit"
                  disabled={isLoading || !isValid}
                >
                  {isLoading
                    ? t(
                        "admin.adminInfo.adminInfoCategories.adminInfoCategoriesButtonLoading"
                      )
                    : t(
                        "admin.adminInfo.adminInfoCategories.adminInfoCategoriesButtonConfirm"
                      )}
                </button>
                <button
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                  onClick={() => navigate("/profile")}
                >
                  {t(
                    "admin.adminInfo.adminInfoCategories.adminInfoCategoriesEditBack"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCabinetCategoryUpdate;
