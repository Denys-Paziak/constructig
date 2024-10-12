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
import Loader from "../../../../../../loader/Loader";
import { useTranslation } from "react-i18next";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../../../../../utils/cropImageUtil.ts";
import imageCompression from "browser-image-compression";

const UserCabinetProductsUpdate: React.FC = () => {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagePreview, setProductImagesPreview] = useState<
    string[] | null
  >(null);
  const [isEditUploadOpen, setEditUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct>();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [openCrop, setOpenCrop] = useState(false);
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
  const { t } = useTranslation();

  const acceptType: Accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  };

  const onDropProductImages = useCallback(async (acceptedFiles: File[]) => {
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

    setProductImages([compressedFile]);
    setProductImagesPreview([URL.createObjectURL(compressedFile)]);
    setIsLoadingImage(false);
    setOpenCrop(true); // Відкриваємо обрізувач
  }, []);

  const onCropHandler = async () => {
    const croppedImageBlob: any = await getCroppedImg(
      productImagePreview![0],
      croppedAreaPixels
    );

    const uniqueFileName = `cropped_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}.jpg`;

    const croppedFile = new File([croppedImageBlob], uniqueFileName, {
      type: productImages[0].type || "image/jpeg",
      lastModified: Date.now(),
    });

    setProductImages([croppedFile]);
    setProductImagesPreview([URL.createObjectURL(croppedFile)]);
    setOpenCrop(false);
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const {
    getRootProps: getProductRootProps,
    getInputProps: getProductInputProps,
    isDragActive: isProductDragActive,
    isDragAccept: isProductDragAccept,
    isDragReject: isProductDragReject,
    isFocused: isProductFocused,
  } = useDropzone({
    onDrop: onDropProductImages,
    multiple: false,
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
        await deleteImage(editProduct!.image, token);
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

  if (isLoadingImage) {
    return <Loader />;
  }

  return (
    <section className="w-full min-h-screen shape_bg pt-10 px-4 md:px-0">
      <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg">
        <div className="w-full flex flex-col gap-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-black">
            {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsEditTitle")}
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
                      {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel2")}
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
                          <p>
                            {t(
                              "admin.adminInfo.adminInfoGoods.adminInfoGoodsPlaceholder2"
                            )}
                          </p>
                        ) : (
                          <p>
                            {t(
                              "admin.adminInfo.adminInfoGoods.adminInfoGoodsPlaceholder2"
                            )}
                          </p>
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
              {openCrop && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                  <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100">
                      <Cropper
                        image={productImagePreview![0]}
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
                  {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel3")}
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={errors["name"] ? { border: "1px solid #EB001B" } : {}}
                  placeholder={t(
                    "admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel3"
                  )}
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
                  {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel4")}
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={
                    errors["description"] ? { border: "1px solid #EB001B" } : {}
                  }
                  placeholder={t(
                    "admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel4"
                  )}
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
                  {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel5")}
                </label>
                <input
                  type="number"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={errors["price"] ? { border: "1px solid #EB001B" } : {}}
                  placeholder={t(
                    "admin.adminInfo.adminInfoGoods.adminInfoGoodsLabel5"
                  )}
                  step="0.01"
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
                  {isLoading
                    ? t(
                        "admin.adminInfo.adminInfoGoods.adminInfoGoodsButtonLoading"
                      )
                    : t(
                        "admin.adminInfo.adminInfoGoods.adminInfoGoodsButtonConfirm"
                      )}
                </button>
                <button
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                  onClick={() => navigate("/profile")}
                >
                  {t("admin.adminInfo.adminInfoGoods.adminInfoGoodsEditBack")}
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
