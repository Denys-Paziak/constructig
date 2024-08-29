import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import {
  deleteImage,
  uploadImage,
} from "../../../services/upload-images/uploadImages";
import Button from "../../UI/button/Button";
import { useParams } from "react-router-dom";
import { updateServices } from "../../../services/services/services";
import { notify } from "../../../helpers/helper";

interface Service {
  image: string;
  title: string;
}

interface Props {
  data: { services: { cols: Service[] } };
  sectionName: string;
  handleInputChange: (section: string, field: string, value: any) => void;
}

const ServicesEdit: React.FC<Props> = ({
  data,
  sectionName,
  handleInputChange,
}) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data.services));

      if (token) {
        const response = await updateServices(id!, formData, token);
        notify(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = useCallback(
    async (index: number, acceptedFiles: File[]) => {
      const formData = new FormData();
      formData.append("image", acceptedFiles[0]);

      const formDataDelete = new FormData();
      formDataDelete.append("image", data.services.cols[index].image);

      if (token) {
        try {
          const res = await uploadImage(formData, token);

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
        }
      }
    },
    [data.services.cols, handleInputChange, token]
  );

  const deleteImg = async (index: number) => {
    // const formData = new FormData();
    // formData.append("image", data.services.cols[index].image);

    // const responseDelete = await deleteImage(data.header.logo, token);
    //     console.log(responseDelete);

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

  return (
    <>
      {sectionName === "services" && (
        <div className="bg-white  p-3">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2">
              <p>Phone number for call service:</p>
              <input
                type="text"
                placeholder="Phone number"
                value={data.services.cols[0].phone}
                onChange={(e) => handlePhoneChange(0, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p>Link on map for map service:</p>
              <input
                type="text"
                placeholder="Link on map"
                value={data.services.cols[1].link}
                onChange={(e) => handleMapsChange(1, e.target.value)}
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
                    placeholder="Заголовок"
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
                              ? "Drag and drop files here"
                              : "Drag and drop files here"}
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
                          src="/src/assets/images/trash-icon.svg"
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
