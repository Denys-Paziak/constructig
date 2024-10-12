import React, { useCallback, useState } from "react";
import { AdminImage } from "../../../../../../../utils/dropzone/dropzone";
import { createNew } from "../../../../../../../services/news/news";
import { Accept, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { notify, notifyError } from "../../../../../../../helpers/helper";
import Loader from "../../../../../../loader/Loader";
import { useTranslation } from "react-i18next";
import Cropper from "react-easy-crop";
import {getCroppedImg} from "../../../../../../../utils/cropImageUtil.ts";

interface Props {
  toggleNewsForm: () => void;
  sites: any;
  fetchData: any;
}

interface FormValues {
  title: string;
  content: string;
}

const UserCabinetNewsForm: React.FC<Props> = ({
  toggleNewsForm,
  sites,
  fetchData,
}) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
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
    setIsLoadingImage(false);
    setMainImagePreview(URL.createObjectURL(compressedFile));
    setOpenCrop(true); // Відкриваємо обрізувач
  }, []);

  const onCropHandler = async () => {
    const croppedImageBlob: any = await getCroppedImg(
      mainImagePreview,
      croppedAreaPixels
    );
    const croppedFile = new File(
      [croppedImageBlob],
      mainImage?.name || "cropped_image.jpg",
      {
        type: mainImage?.type || "image/jpeg",
        lastModified: Date.now(),
      }
    );

    setMainImage(croppedFile);
    setMainImagePreview(URL.createObjectURL(croppedFile));
    setOpenCrop(false);
  };

  const onCropComplete = (croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

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

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (mainImage) {
      formData.append("image", mainImage);
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await createNew(sites[0].id, formData, token);
        notify(response.message);
        reset();
        toggleNewsForm();
        setMainImagePreview(null);
        fetchData();
      } catch (error) {
        console.error("Error creating new:", error);
        notifyError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      notifyError("Please log in!");
      setIsLoading(false);
    }
  };

  if (isLoadingImage) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-[20px]"
    >
      <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
        <label htmlFor="image" className="text-sm font-semibold">
          {t("admin.adminInfo.adminInfoEvents.adminInfoEventsLabel1")}
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
              {t("admin.adminInfo.adminInfoEvents.adminInfoEventsPlaceholder1")}
            </p>
          ) : (
            <p>
              {t("admin.adminInfo.adminInfoEvents.adminInfoEventsPlaceholder1")}
            </p>
          )}
        </AdminImage>
        {mainImagePreview && (
          <>
            <div className="w-12 h-12 mr-4">
              <img
                src={mainImagePreview}
                alt="banner preview"
                className="w-full h-full"
              />
            </div>

            {openCrop && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
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
                  <div className="p-4 bg-white border-t border-gray-300 flex justify-between items-center">
                    <div className="flex items-center gap-2">
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
                        className="w-40"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div
                        className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={onCropHandler}
                      >
                        {t("cropImage.cropImageButton1")}
                      </div>
                      <div
                        className="px-6 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        onClick={() => setOpenCrop(false)}
                      >
                        {t("cropImage.cropImageButton2")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold">
          {t("admin.adminInfo.adminInfoEvents.adminInfoEventsLabel2")}
        </label>
        <input
          type="text"
          className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          style={errors["title"] ? { border: "1px solid #EB001B" } : {}}
          placeholder={t(
            "admin.adminInfo.adminInfoEvents.adminInfoEventsLabel2"
          )}
          {...register("title", { required: `Це поле обов'язкове!` })}
        />
        {errors["title"] && (
          <span className="text-md text-red-500 font-light">
            {errors["title"]?.message as string}
          </span>
        )}
      </div>
      <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
        <label htmlFor="content" className="text-sm font-semibold">
          {t("admin.adminInfo.adminInfoEvents.adminInfoEventsLabel3")}
        </label>
        <input
          type="text"
          className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          style={errors["content"] ? { border: "1px solid #EB001B" } : {}}
          placeholder={t(
            "admin.adminInfo.adminInfoEvents.adminInfoEventsLabel3"
          )}
          {...register("content", { required: `Це поле обов'язкове!` })}
        />
        {errors["content"] && (
          <span className="text-md text-red-500 font-light">
            {errors["content"]?.message as string}
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
            ? t("admin.adminInfo.adminInfoEvents.adminInfoEventsButtonLoading")
            : t("admin.adminInfo.adminInfoEvents.adminInfoEventsButtonConfirm")}
        </button>
        <button
          onClick={toggleNewsForm}
          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="button"
          disabled={isLoading}
        >
          {t("admin.adminInfo.adminInfoEvents.adminInfoEventsButtonCancel")}
          sss
        </button>
      </div>
    </form>
  );
};

export default UserCabinetNewsForm;
