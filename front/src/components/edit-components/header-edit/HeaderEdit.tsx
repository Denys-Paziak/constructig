import React, { useState, useCallback } from "react";
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
import Button from "../../UI/button/Button";
import Loader from "../../loader/Loader";
import { useTranslation } from "react-i18next";

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
  const [isLoading, setIsLoading] = useState(false); // Стан для відстеження процесу завантаження
  const token = localStorage.getItem("token");
  const id = data.site.id;
  const { t } = useTranslation();

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      if (token) {
        setIsLoading(true);
        const file = acceptedFile[0];

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        try {
          const compressedBlob = await imageCompression(file, options);

          const compressedFile = new File([compressedBlob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });

          const formDataLogo = new FormData();
          formDataLogo.append("image", compressedFile);

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
        } finally {
          setIsLoading(false);
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
    try {
      setIsLoading(true);
      if (token && typeof data.header.logo === "string") {
        await deleteImage(data.header.logo, token);

        handleInputChange("header", "logo", null);

        const formData = new FormData();
        formData.append("data", JSON.stringify(data.header));
        formData.append("logo", data.header.logo);

        const response = await updateHeaderEdit(id!, formData, token);
        notify(response.message);
      } else {
        console.log("Token is missing or logo is not a string.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (token) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data.header));
      formData.append("logo", data.header.logo);

      const response = await updateHeaderEdit(id!, formData, token);
      notify(response.message);
      setIsLoading(false);
    }
  };

  const editMenu = (index: number, value: string) => {
    const newMenu = [...data.header.menu];

    newMenu[index].text = value;

    handleInputChange("header", "menu", newMenu + "");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {sectionName === "header" && (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
            <h4 className="font-semibold text-lg">
              {t("adminChange.adminChangeHeader.adminChangeHeaderSubtitle2")}
            </h4>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-col gap-2">
                <p>
                  {t("adminChange.adminChangeHeader.adminChangeHeaderLabel1")}
                </p>
                <input
                  type="text"
                  placeholder="Menu item 1"
                  value={data[sectionName]?.menu[0].text || ""}
                  onChange={(e) => editMenu(0, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>
                  {" "}
                  {t("adminChange.adminChangeHeader.adminChangeHeaderLabel2")}
                </p>
                <input
                  type="text"
                  placeholder="Menu item 2"
                  value={data[sectionName]?.menu[1].text || ""}
                  onChange={(e) => editMenu(1, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>
                  {" "}
                  {t("adminChange.adminChangeHeader.adminChangeHeaderLabel3")}
                </p>
                <input
                  type="text"
                  placeholder="Menu item 3"
                  value={data[sectionName]?.menu[2].text || ""}
                  onChange={(e) => editMenu(2, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>
                  {" "}
                  {t("adminChange.adminChangeHeader.adminChangeHeaderLabel4")}
                </p>
                <input
                  type="text"
                  placeholder="Menu item 4"
                  value={data[sectionName]?.menu[3].text || ""}
                  onChange={(e) => editMenu(3, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="w-full flex mt-4 items-start flex-col gap-2">
              <p>
                {t("adminChange.adminChangeHeader.adminChangeHeaderLabel5")}
              </p>
              <AdminImage
                {...getRootProps({
                  isdragactive: isDragActive.toString(),
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>
                    {t(
                      "adminChange.adminChangeHeader.adminChangeHeaderPlaceholder5"
                    )}
                  </p>
                ) : (
                  <p>
                    {t(
                      "adminChange.adminChangeHeader.adminChangeHeaderPlaceholder5"
                    )}
                  </p>
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
                    src="../trash-icon.svg"
                    alt="trash icon"
                  />
                </span>
              </div>
            )}

            {!data.header.logo && (
              <p className="w-full text-sm text-black text-center py-6">
                {t("adminChange.adminChangeHeader.adminChangeHeaderEmpty")}
              </p>
            )}

            <div className="w-full mt-4">
              <Button handleButtonClick={handleSaveChanges} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderEdit;
