import React, { useCallback, useState } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { RgbaColorPicker } from "react-colorful";
import { useDropzone } from "react-dropzone";
// import Toggle from "react-toggle";
import Button from "../../UI/button/Button";
import { updateHeaderEdit } from "../../../services/header-edit/headerEdit";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../../services/upload-images/uploadImages";

interface Props {
  data: any;
  sectionName: string;
  // handleVisibleBlock: (sectionName: string, checked: boolean) => void;
  setHeaderColorBg: (color: string) => void;
  headerColorBg: void;
  setHeaderTextColor: (color: string) => void;
  headerTextColor: void;
  handleInputChange: (
    section: string,
    field: string,
    value: string | null
  ) => void;
}

const HeaderEdit: React.FC<Props> = ({
  data,
  sectionName,
  // handleVisibleBlock,
  setHeaderColorBg,
  headerColorBg,
  setHeaderTextColor,
  headerTextColor,
  handleInputChange,
}) => {
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const onDrop = useCallback(async (acceptedFile: File) => {
    const imagesUrls: string[] = [];

    // acceptedFiles.forEach(async (acceptedFiles: File) => {
    // });
    if (token) {
      const formData = new FormData();

      console.log(acceptedFile);

      formData.append("image", acceptedFile[0]);

      const response = await uploadImage(formData, token);
      console.log(response);
      imagesUrls.push(response.url);
      handleInputChange("header", "logo", imagesUrls);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleSaveChanges = async () => {
    try {
      if (token) {
        const formData = new FormData();

        console.log(data.header.logo);

        formData.append("data", JSON.stringify(data.header));
        formData.append("logo", data.header.logo);

        const response = await updateHeaderEdit(id!, formData, token);
        console.log(response);
        handleInputChange("header", "logo", response.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSlider = () => {
    handleInputChange("header", "logo", null);
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
              {/* <span className="text-[11px] text-black">
                {uploadedFile?.name}
              </span> */}
            </div>
            {data.header.logo && (
              <div className="w-full flex justify-center relative">
                <img className="w-full" src={data.header.logo} alt="logo" />
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
            )}
          </div>
          <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
            <h4 className="font-semibold text-lg">Колір шапки</h4>
            <div className="w-full color-picker-block">
              <RgbaColorPicker
                color={headerColorBg}
                onChange={setHeaderColorBg}
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
            <h4 className="font-semibold text-lg">Колір тексту в шапці</h4>
            <div className="w-full color-picker-block">
              <RgbaColorPicker
                color={headerTextColor}
                onChange={setHeaderTextColor}
              />
            </div>
          </div>
          <Button handleButtonClick={handleSaveChanges} />
        </div>
      )}
    </>
  );
};

export default HeaderEdit;
