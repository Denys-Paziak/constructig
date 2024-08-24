import React, { useCallback } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { useDropzone } from "react-dropzone";
import { updateHeaderEdit } from "../../../services/header-edit/headerEdit";
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
  handleInputChange: (
    section: string,
    field: string,
    value: string | null
  ) => void;
}

const HeaderEdit: React.FC<Props> = ({
  data,
  sectionName,
  handleInputChange,
}) => {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      if (token) {
        const file = acceptedFile[0];

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(file, options);

          const formDataLogo = new FormData();
          formDataLogo.append("image", file);

          const responseLogo = await uploadImage(formDataLogo, token);

          handleInputChange("header", "logo", responseLogo.url);

          const formData = new FormData();
          formData.append("data", JSON.stringify(data.header));
          formData.append("logo", data.header.logo);

          const response = await updateHeaderEdit(id!, formData, token);
          notify(response.message);
          handleInputChange("header", "logo", response.url);
        } catch (error) {
          console.error("Error compressing the image:", error);
        }
      }
    },
    [data.header, handleInputChange, id, token]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleRemoveImage = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token && typeof data.header.logo === "string") {
        const formData = new FormData();

        const regex = /amazonaws\.com\/(.*)$/;
        const match = data.header.logo.match(regex);

        if (match && match[1]) {
          formData.append("image", match[1]);

          const response = await deleteImage(formData, token);
          console.log(response);
          handleInputChange("header", "logo", null);
        } else {
          console.log("Logo URL does not match the expected pattern.");
        }
      } else {
        console.log("Token is missing or logo is not a string.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sectionName === "header" && (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
            <h4 className="font-semibold text-lg">Логотип сайту</h4>
            <div className="w-full flex items-start flex-col gap-2">
              <AdminImage
                {...getRootProps({
                  isdragactive: isDragActive.toString(),
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Перетягніть сюди файли ...</p>
                ) : (
                  <p>Перетягніть сюди файли</p>
                )}
              </AdminImage>
            </div>
            {data.header.logo && (
              <div className="w-full flex justify-center relative">
                <img className="w-full" src={data.header.logo} alt="logo" />
                <span
                  onClick={handleRemoveImage}
                  className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
                >
                  <img
                    className="w-full"
                    src="/src/assets/images/trash-icon.svg"
                    alt="trash icon"
                  />
                </span>
              </div>
            )}

            {!data.header.logo && (
              <p className="w-full text-sm text-black text-center py-6">
                Логотипу поки що немає.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderEdit;
