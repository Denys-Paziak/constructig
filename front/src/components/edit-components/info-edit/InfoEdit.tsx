import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AdminImage } from "../../../utils/dropzone/dropzone";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}

const InfoEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
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
        </div>
      )}
    </>
  );
};

export default InfoEdit;
