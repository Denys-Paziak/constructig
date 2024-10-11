import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import {
  deleteImage,
  uploadImage,
} from "../../../services/upload-images/uploadImages";
import Button from "../../UI/button/Button";
import { updateInfo } from "../../../services/info/info";
import { notify } from "../../../helpers/helper";
import imageCompression from "browser-image-compression";
import Loader from "../../loader/Loader";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string | null) => void;
}

const InfoEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  const id = data.site.id;
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("data", JSON.stringify(data.info));

      if (token) {
        const response = await updateInfo(id!, formData, token);
        notify(response.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const token = localStorage.getItem("token");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (token) {
      setIsLoading(true);

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedBlob = await imageCompression(
          acceptedFiles[0],
          options
        );

        const compressedFile = new File(
          [compressedBlob],
          acceptedFiles[0].name,
          {
            type: acceptedFiles[0].type,
            lastModified: Date.now(),
          }
        );

        const formData = new FormData();
        formData.append("image", compressedFile);

        const res = await uploadImage(formData, token);

        const formDataDelete = new FormData();
        formDataDelete.append("image", data.info.image);

        await deleteImage(formDataDelete, token);

        handlerInput("info", "image", res.url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    handleSaveChanges();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteImg = async () => {
    try {
      await deleteImage(data.info.image, token!);
    } catch (error) {
      console.log(error);
    }
    handlerInput("info", "image", null);
    handleSaveChanges();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {sectionName === "info" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-4 flex-col">
          <h4 className="font-semibold text-lg">
            {t("adminChange.adminChangeInfo.adminChangeInfoSubtitle2")}
          </h4>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeInfo.adminChangeInfoLabel1")}</p>
            <AdminImage
              {...getRootProps({
                isdragactive: isDragActive.toString(),
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>
                  {t("adminChange.adminChangeInfo.adminChangeInfoPlaceholder1")}
                </p>
              ) : (
                <p>
                  {t("adminChange.adminChangeInfo.adminChangeInfoPlaceholder1")}
                </p>
              )}
            </AdminImage>

            {data.info.image && (
              <div className="relative">
                <img src={data.info.image} alt="" />
                <span
                  onClick={() => {
                    deleteImg();
                  }}
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
          </div>
          <div className="w-full flex flex-col gap-2">
            <p> {t("adminChange.adminChangeInfo.adminChangeInfoLabel2")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeInfo.adminChangeInfoPlaceholder2"
              )}
              value={data[sectionName]?.title || ""}
              onChange={(e) =>
                handlerInput(sectionName, "title", e.target.value)
              }
              className="p-2 border text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeInfo.adminChangeInfoLabel3")}</p>
            <textarea
              placeholder={t(
                "adminChange.adminChangeInfo.adminChangeInfoPlaceholder3"
              )}
              value={data[sectionName]?.text || ""}
              onChange={(e) =>
                handlerInput(sectionName, "text", e.target.value)
              }
              className="h-36 p-2 text-sm border border-gray-300 rounded-md resize-none"
            />
          </div>
          <Button handleButtonClick={handleSaveChanges} />
        </div>
      )}
    </>
  );
};

export default InfoEdit;
