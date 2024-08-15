import React, { useCallback } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { useDropzone } from "react-dropzone";
import styles from "../../../utils/switcher/switcher.css";

interface Props {
  data: any;
  sectionName: string;
  handleAddSlider: () => void;
  handleRemoveSlider: (index: number) => void;
}

const SliderEdit: React.FC<Props> = ({
  data,
  sectionName,
  handleAddSlider,
  handleRemoveSlider,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {sectionName === "slider" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
          <h4 className="font-semibold text-lg">Слайди</h4>
          {data[sectionName]?.images.length === 0 && (
            <p className="text-sm text-black text-center">
              Зображень слайдера поки що немає.
            </p>
          )}

          {data[sectionName]?.images.length > 0 &&
            data[sectionName]?.images?.map((image: string, index: number) => (
              <div key={index} className="w-full mb-1 relative">
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
                <span
                  onClick={() => handleRemoveSlider(index)}
                  className="absolute w-6 h-6 rounded-full bg-blue-300 p-1.5 right-[-8px] top-[-8px] cursor-pointer"
                >
                  <img
                    className="w-full"
                    src="/src/assets/images/trash-icon.svg"
                    alt="trash icon"
                  />
                </span>
                <p className="text-sm text-black">name of file</p>
              </div>
            ))}
          <button
            type="button"
            onClick={handleAddSlider}
            className="w-full mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Додати слайд
          </button>
        </div>
      )}
    </>
  );
};

export default SliderEdit;
