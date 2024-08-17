import React, { useCallback, useEffect, useState } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { useDropzone } from "react-dropzone";
import Button from "../../UI/button/Button";
import { updateSliderEdit } from "../../../services/slider/sliderEdit";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../../services/upload-images/uploadImages";

interface Props {
  data: any;
  sectionName: string;
  handleInputChange: (section: string, field: string, value: any) => void;
  handleRemoveSlider: (index?: number) => void;
}

const SliderEdit: React.FC<Props> = ({
  data,
  sectionName,
  handleInputChange,
  handleRemoveSlider,
}) => {
  // const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [uploadedSliderImages, setUploadedSliderImages] = useState<
    File[] | null
  >(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imagesUrls: string[] = [];

    acceptedFiles.forEach(async (acceptedFiles: File) => {
      if (token) {
        const formData = new FormData();

        formData.append("image", acceptedFiles);

        const response = await uploadImage(formData, token);
        imagesUrls.push(response.url);
        handleInputChange("slider", "images", imagesUrls);
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 3,
  });

  const handleSaveChanges = async () => {
    try {
      if (token) {
        const formData = new FormData();

        formData.append("visible", data.slider.visible);

        console.log(data.slider.images);

        data.slider.images?.forEach((image: string) => {
          formData.append("imagesUrls[]", image);
        });

        const response = await updateSliderEdit(id!, formData, token);
        console.log(response);
        handleInputChange("slider", "images", response.updatedFields.images);
        setUploadedSliderImages(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sectionName === "slider" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-4 flex-col">
          <h4 className="font-semibold text-lg">Слайди</h4>
          {/* {data[sectionName]?.images.length === 0 && (
            <p className="text-sm text-black text-center">
              Зображень слайдера поки що немає.
            </p>
          )} */}

          <AdminImage
            {...getRootProps({
              isdragactive: isDragActive.toString(),
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Перетягніть сюди файли...</p>
            ) : (
              <p>Перетягніть сюди файли</p>
            )}
          </AdminImage>
          {uploadedSliderImages?.map(
            (uploadedSliderImage: File, index: number) => (
              <p key={index} className="text-sm text-black">
                {uploadedSliderImage.name}
              </p>
            )
          )}

          {data.slider.images &&
            data.slider.images.map((image: string, index: number) => (
              <div key={index} className="w-full flex justify-center relative">
                <img className="w-full" src={image} alt="slide image" />
                <span
                  onClick={() => handleRemoveSlider(index)}
                  className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
                >
                  <img
                    className="w-full"
                    src="/src/assets/images/trash-icon.svg"
                    alt="trash icon"
                  />
                </span>
              </div>
            ))}
          {/* <div className="w-full flex justify-center relative">
              <img
                className="w-full"
                src={data.slider.images}
                alt="slide image"
              />
              <span
                onClick={handleRemoveSlider}
                className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
              >
                <img
                  className="w-full"
                  src="/src/assets/images/trash-icon.svg"
                  alt="trash icon"
                />
              </span>
            </div> */}
          {/* {Array.isArray(data.slider.images) ? (
            data.slider.images.map((image: string, index: number) => (
              <div key={index} className="w-full flex justify-center relative">
                <img className="w-full" src={image} alt="slide image" />
                <span
                  onClick={handleRemoveSlider}
                  className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
                >
                  <img
                    className="w-full"
                    src="/src/assets/images/trash-icon.svg"
                    alt="trash icon"
                  />
                </span>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center relative">
              <img
                className="w-full"
                src={data.slider.images}
                alt="slide image"
              />
              <span
                onClick={handleRemoveSlider}
                className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
              >
                <img
                  className="w-full"
                  src="/src/assets/images/trash-icon.svg"
                  alt="trash icon"
                />
              </span>
            </div>
          )} */}

          {/* <span
            onClick={() => handleRemoveSlider(index)}
            className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
          >
            <img
              className="w-full"
              src="/src/assets/images/trash-icon.svg"
              alt="trash icon"
            />
          </span> */}
          {/* {data[sectionName]?.images.length > 0 &&
            data[sectionName]?.images?.map((image: string, index: number) => (
              <div key={index} className="w-full mb-1 relative">
                <p className="text-sm text-black">name of file</p>
              </div>
            ))}
          {data[sectionName]?.images.length < 3 && (
            <button
              type="button"
              onClick={handleAddSlider}
              className="w-full mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Додати слайд
            </button>
          )} */}
          <Button handleButtonClick={handleSaveChanges} />
        </div>
      )}
    </>
  );
};

export default SliderEdit;
