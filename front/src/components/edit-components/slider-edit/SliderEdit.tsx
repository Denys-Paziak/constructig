import React, { useCallback, useState } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { useDropzone } from "react-dropzone";
import Button from "../../UI/button/Button";
import { updateSliderEdit } from "../../../services/slider/sliderEdit";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../../services/upload-images/uploadImages";
import imageCompression from "browser-image-compression";

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
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [uploadedSliderImages, setUploadedSliderImages] = useState<
    File[] | null
  >(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const imagesUrls: string[] = [];

      for (const file of acceptedFiles) {
        if (token) {
          try {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);


            const formData = new FormData();
            formData.append("image", compressedFile);

            console.log("compressedFile")
            console.log(compressedFile)


            const response = await uploadImage(formData, token);
            console.log("response")
            console.log(response)
            imagesUrls.push(response.url);
          } catch (error) {
            console.error("Error compressing the image:", error);
          }
        }
      }
    },
    [handleInputChange, token]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 3,
  });

  const handleSaveChanges = async () => {
    try {
      if (token) {
        const formData = new FormData();

        formData.append("visible", data.slider.visible);

        data.slider.images?.forEach((image: string) => {
          formData.append("imagesUrls[]", image);
        });

        const response = await updateSliderEdit(id!, formData, token);
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
          {data.slider.images.length === 0 && (
            <p className="text-sm text-black text-center py-4">
              Зображень слайдера поки що немає.
            </p>
          )}

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
          <Button handleButtonClick={handleSaveChanges} />
        </div>
      )}
    </>
  );
};

export default SliderEdit;
