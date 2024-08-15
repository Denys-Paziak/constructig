import React, { useCallback } from "react";
import { AdminImage } from "../../../utils/dropzone/dropzone";
import { RgbaColorPicker } from "react-colorful";
import { useDropzone } from "react-dropzone";
import Toggle from "react-toggle";

interface Props {
  data: any;
  sectionName: string;
  handleVisibleBlock: (sectionName: string, checked: boolean) => void;
  setHeaderColorBg: (color: string) => void;
  headerColorBg: void;
  setHeaderTextColor: (color: string) => void;
  headerTextColor: void;
}

const HeaderEdit: React.FC<Props> = ({
  data,
  sectionName,
  handleVisibleBlock,
  setHeaderColorBg,
  headerColorBg,
  setHeaderTextColor,
  headerTextColor,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Відображення блоку</h4>
        <div className="w-full flex items-center justify-between">
          <p>Сховати/Показати:</p>
          <Toggle
            defaultChecked={true}
            icons={false}
            onChange={(e) => handleVisibleBlock(sectionName, e.target.checked)}
          />
        </div>
      </div>
      {sectionName === "header" && (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
            <h4 className="font-semibold text-lg">Логотип сайту</h4>
            <div className="w-full flex items-center justify-between">
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
        </div>
      )}
    </>
  );
};

export default HeaderEdit;
