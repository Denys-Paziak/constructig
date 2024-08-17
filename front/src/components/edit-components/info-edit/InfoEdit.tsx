import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { deleteImage, uploadImage } from "../../../services/upload-images/uploadImages";
import Button from "../../UI/button/Button";
import { updateInfo } from "../../../services/info/info";
import { useParams } from "react-router-dom";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}


const InfoEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  const { id } = useParams();

  const handleSaveChanges = () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("data", JSON.stringify(data.info));

    if (token) {
      updateInfo(id!, formData, token);
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    const formDataDelete = new FormData();

    formData.append("image", acceptedFiles[0]);
    formDataDelete.append("image", data.info.image);

    if (token) {
      const res = await uploadImage(formData, token);
      const resDelete = await deleteImage(formDataDelete, token);
      handlerInput("info", "image", res.url);

      console.log(resDelete)
    }

    handleSaveChanges();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <>
      {sectionName === "info" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-4 flex-col">
          <h4 className="font-semibold text-lg">Наповнення контенту</h4>
          <div className="w-full flex flex-col gap-2">
            <p>Картинка:</p>
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

            {data.info.image && <>
              <img src={data.info.image} alt="" />
            </>}

          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Заголовок:</p>
            <input
              type="text"
              placeholder="Заголовок"
              value={data[sectionName]?.title || ""}
              onChange={(e) =>
                handlerInput(sectionName, "title", e.target.value)
              }
              className="p-2 border text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Текст:</p>
            <textarea
              placeholder="Текст"
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
