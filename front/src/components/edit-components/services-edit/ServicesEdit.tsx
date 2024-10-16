import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import {
  deleteImage,
  uploadImage,
} from "../../../services/upload-images/uploadImages";
import Button from "../../UI/button/Button";
import { updateServices } from "../../../services/services/services";
import { notify } from "../../../helpers/helper";
import imageCompression from "browser-image-compression";
import Loader from "../../loader/Loader";
import { useTranslation } from "react-i18next";

interface Service {
  image: string;
  title: string;
  phone?: string;
  link?: string;
  name?: string;
  password?: string;
}

interface Props {
  data: { services: { cols: Service[] }; site: { id: string } };
  sectionName: string;
  handleInputChange: (section: string, field: string, value: any) => void;
}

const ServicesEdit: React.FC<Props> = ({
  data,
  sectionName,
  handleInputChange,
}) => {
  const id = data.site.id;
  const { t } = useTranslation();

  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("data", JSON.stringify(data.services));

      if (token) {
        const response: any = await updateServices(id!, formData, token);
        notify(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(
    async (index: number, acceptedFiles: File[]) => {
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
          formDataDelete.append("image", data.services.cols[index].image);

          if (data.services.cols[index].image.length > 0) {
            await deleteImage(formDataDelete, token);
          }

          const updatedServices = [...data.services.cols];
          updatedServices[index] = {
            ...updatedServices[index],
            image: res.url,
          };
          handleInputChange("services", "cols", updatedServices);

          handleSaveChanges();
        } catch (error) {
          console.error("Error uploading or deleting image:", error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [data.services.cols, handleInputChange, token]
  );

  const deleteImg = async (index: number) => {
    try {
      if (token) {
        await deleteImage(data.services.cols[index].image, token);
        const updatedServices = [...data.services.cols];
        updatedServices[index].image = "";
        handleInputChange("services", "cols", updatedServices);

        handleSaveChanges();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedServices = [...data.services.cols];
    updatedServices[index] = { ...updatedServices[index], title: newTitle };
    handleInputChange("services", "cols", updatedServices);
  };

  const handlePhoneChange = (index: number, newValue: string) => {
    const updatedServices = [...data.services.cols];
    updatedServices[index] = { ...updatedServices[index], phone: newValue };
    handleInputChange("services", "cols", updatedServices);
  };

  const handleMapsChange = (index: number, newValue: string) => {
    const updatedServices = [...data.services.cols];
    updatedServices[index] = { ...updatedServices[index], link: newValue };
    handleInputChange("services", "cols", updatedServices);
  };

  const handleWifiName = (index: number, newValue: string) => {
    const updatedServices = [...data.services.cols];
    updatedServices[index] = { ...updatedServices[index], name: newValue };
    handleInputChange("services", "cols", updatedServices);
  };

  const handleWifiPass = (index: number, newValue: string) => {
    const updatedServices = [...data.services.cols];
    updatedServices[index] = { ...updatedServices[index], password: newValue };
    handleInputChange("services", "cols", updatedServices);
  };

  return (
    <>
      {isLoading && <Loader />}
      {sectionName === "services" && (
        <div className="bg-white p-3">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2">
              <p>
                {t("adminChange.adminChangeServices.adminChangeServicesLabel1")}
              </p>
              <input
                type="text"
                placeholder={t(
                  "adminChange.adminChangeServices.adminChangeServicesPlaceholder1"
                )}
                value={data.services.cols[0].phone}
                onChange={(e) => handlePhoneChange(0, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p>
                {t("adminChange.adminChangeServices.adminChangeServicesLabel2")}
              </p>
              <input
                type="text"
                placeholder={t(
                  "adminChange.adminChangeServices.adminChangeServicesPlaceholder2"
                )}
                value={data.services.cols[1].link}
                onChange={(e) => handleMapsChange(1, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <p>
                {t("adminChange.adminChangeServices.adminChangeServicesLabel3")}
              </p>
              <input
                type="text"
                placeholder={t(
                  "adminChange.adminChangeServices.adminChangeServicesPlaceholder3"
                )}
                value={data.services.cols[4].name}
                onChange={(e) => handleWifiName(4, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <p>
                {t("adminChange.adminChangeServices.adminChangeServicesLabel4")}
              </p>
              <input
                type="text"
                placeholder={t(
                  "adminChange.adminChangeServices.adminChangeServicesPlaceholder4"
                )}
                value={data.services.cols[4].password}
                onChange={(e) => handleWifiPass(4, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="w-full mt-6 rounded-md shadow-md flex items-start gap-4 flex-col">
            {data.services.cols.map((service: Service, index: number) => {
              const { getRootProps, getInputProps, isDragActive } = useDropzone(
                {
                  onDrop: (acceptedFiles) => onDrop(index, acceptedFiles),
                  multiple: false,
                }
              );

              return (
                <div key={index} className="w-full flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder={t(
                      "adminChange.adminChangeServices.adminChangeServicesName"
                    )}
                    value={service.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    className="p-2 border text-sm border-gray-300 rounded-md"
                  />
                  <div className="w-full flex items-center gap-4 relative">
                    <div {...getRootProps()} className="w-full">
                      <AdminImage>
                        <input {...getInputProps()} />
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={`service-${index}`}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        ) : (
                          <p>
                            {isDragActive
                              ? t(
                                  "adminChange.adminChangeServices.adminChangeServicesPlaceholder7"
                                )
                              : t(
                                  "adminChange.adminChangeServices.adminChangeServicesPlaceholder7"
                                )}
                          </p>
                        )}
                      </AdminImage>
                    </div>
                    {service.image && (
                      <span
                        onClick={() => deleteImg(index)}
                        className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
                      >
                        <img
                          className="w-full"
                          src="../trash-icon.svg"
                          alt="trash icon"
                        />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <Button handleButtonClick={handleSaveChanges} />
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesEdit;
