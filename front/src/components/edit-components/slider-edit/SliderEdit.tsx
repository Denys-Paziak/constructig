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
import Loader from "../../loader/Loader";

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
  const [isLoading, setIsLoading] = useState(false);

  const id = data.site.id;
  const [uploadedSliderImages, setUploadedSliderImages] = useState<
    File[] | null
  >(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const imagesUrls: string[] = [];

      for (const file of acceptedFiles) {
        if (token) {
          setIsLoading(true);

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

            const response = await uploadImage(formData, token);
            imagesUrls.push(response.url);
          } catch (error) {
            console.error("Error compressing the image:", error);
          } finally {
            setIsLoading(false);
          }
        }
      }

      if (!data.slider.images) {
        console.log("first image");
        handleInputChange("slider", "images", imagesUrls);
        handleSaveChanges();
      } else {
        console.log("add image");
        let newArr = data.slider.images.concat(imagesUrls);

        if (newArr.length > 5) {
          newArr.splice(0, 5);
        }

        handleInputChange("slider", "images", newArr);
        handleSaveChanges();
      }
    },
    [handleInputChange, token]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
  });

  const removeSliderImage = async (index?: number) => {
    let newImages: any[] | any = [...data[sectionName].images];

    if (newImages.length > 1) {
      if (newImages) {
        newImages.splice(index, 1);
      }
    } else {
      newImages = null;
    }

    if (token && index) {
      await deleteImage(data.slider.images[index], token);
    }

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
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

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
                    src="../trash-icon.svg"
                    alt="trash icon"
                  />
                </span>
              </div>
            ))}
          {data.slider.images === null && (
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
