import React, { useCallback, useState } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { useDropzone } from "react-dropzone";
import Button from "../../UI/button/Button";
import { updateSliderEdit } from "../../../services/slider/sliderEdit";
import { useParams } from "react-router-dom";
import {
  deleteImage,
  uploadImage,
} from "../../../services/upload-images/uploadImages";
import imageCompression from "browser-image-compression";
import { notify } from "../../../helpers/helper";

interface Props {
  data: any;
  sectionName: string;
  handleInputChange: (section: string, field: string, value: any) => void;
}

const SliderEdit: React.FC<Props> = ({
  data,
  sectionName,
  handleInputChange,
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

            const compressedBlob = await imageCompression(file, options);

            const compressedFile = new File([compressedBlob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            const formData = new FormData();
            formData.append("image", compressedFile);

            console.log("compressedFile");
            console.log(file);

            const response = await uploadImage(formData, token);
            imagesUrls.push(response.url);
          } catch (error) {
            console.error("Error compressing the image:", error);
          }
        }
      }

      handleInputChange("slider", "images", imagesUrls);

      handleSaveChanges();
    },
    [handleInputChange, token]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 3,
  });

  const removeSliderImage = async (index?: number) => {
    console.log("index", index);
    let newImages: any[] | any = [...data[sectionName].images];

    console.log("newImages not sliced", newImages);
    if (newImages.length > 1) {
      console.log("enter");
      if (newImages) {
        newImages.splice(index, 1);
        console.log(newImages);
      }
    } else {
      newImages = null;
    }
    const responseDelete = await deleteImage(data.slider.images[index], token);

    handleInputChange(sectionName, "images", newImages);
    handleSaveChanges();
  };

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
        notify(response.message);
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
          <h4 className="font-semibold text-lg">Slides</h4>
          <AdminImage
            {...getRootProps({
              isdragactive: isDragActive.toString(),
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drag and drop files here</p>
            ) : (
              <p>Drag and drop files here</p>
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
                  onClick={() => removeSliderImage(index)}
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
          {data.slider.images && data.slider.images.length > 0 && (
            <p className="w-full text-sm text-black text-center py-6">
              There are no images of the slider yet.
            </p>
          )}
          <Button handleButtonClick={handleSaveChanges} />
        </div>
      )}
    </>
  );
};

export default SliderEdit;
