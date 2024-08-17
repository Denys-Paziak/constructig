import React, { useCallback } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { useDropzone } from "react-dropzone";
// import Toggle from "react-toggle";
import { updateHeaderEdit } from "../../../services/header-edit/headerEdit";
import { useParams } from "react-router-dom";
import {
  deleteImage,
  uploadImage,
} from "../../../services/upload-images/uploadImages";

interface Props {
  data: any;
  sectionName: string;
  // handleVisibleBlock: (sectionName: string, checked: boolean) => void;
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
  handleInputChange,
}) => {
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const onDrop = useCallback(async (acceptedFile: File) => {
    const imagesUrls: string[] = [];

    if (token) {
      const formDataLogo = new FormData();

      formDataLogo.append("image", acceptedFile[0]);

      const responseLogo = await uploadImage(formDataLogo, token);
      imagesUrls.push(responseLogo.url);
      handleInputChange("header", "logo", imagesUrls);

      const formData = new FormData();

      formData.append("data", JSON.stringify(data.header));
      formData.append("logo", data.header.logo);

      const response = await updateHeaderEdit(id!, formData, token);
      console.log(response);
      handleInputChange("header", "logo", response.url);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  // const handleSaveChanges = async () => {
  //   try {
  //     if (token) {
  // const formData = new FormData();

  // console.log(data.header.logo);

  // formData.append("data", JSON.stringify(data.header));
  // formData.append("logo", data.header.logo);

  // const response = await updateHeaderEdit(id!, formData, token);
  // console.log(response);
  // handleInputChange("header", "logo", response.url);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleRemoveSlider = async () => {
  //   handleInputChange("header", "logo", null);
  //   const token = localStorage.getItem("token");

  //   try {
  //     if (token) {
  //       const formData = new FormData();

  //       const regex =
  //         /^https:\/\/constructig\.s3\.eu-north-1\.amazonaws\.com\/(.*)$/;
  //       const match = data.header.logo.match(regex);

  //       formData.append("image", match[1]);

  //       const response = await deleteImage(formData, token);
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRemoveSlider = async () => {
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
        </div>
      )}
    </>
  );
};

export default HeaderEdit;
