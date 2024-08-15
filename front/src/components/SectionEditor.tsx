import { useCallback, useEffect, useState } from "react";
import HeaderEdit from "./edit-components/header-edit/HeaderEdit";
import SliderEdit from "./edit-components/slider-edit/SliderEdit";
import InfoEdit from "./edit-components/info-edit/InfoEdit";

interface SectionEditorProps {
  title: string;
  sectionName: string;
  data: any;
  visibleHandler: (name: string, checked: boolean) => void;
  handleInputChange: (section: string, field: string, value: any) => void;
  setHeaderColorBg: void;
  headerColorBg: void;
  setHeaderTextColor: void;
  headerTextColor: void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  title,
  sectionName,
  data,
  visibleHandler,
  handleInputChange,
  setHeaderColorBg,
  headerColorBg,
  setHeaderTextColor,
  headerTextColor,
}) => {
  //   const onDrop = useCallback((acceptedFiles: File) => {
  //     // Do something with the files
  //   }, []);
  //   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // const { color, setColor } = useColor();
  //   const [color, setColor] = useState("#aabbcc");

  //   const handleSliderImageChange = (index: number, value: any) => {
  //     const newImages = [...data[sectionName].images];
  //     newImages[index] = value;
  //     handleInputChange(sectionName, "images", newImages);
  //   };

  const addSliderImage = () => {
    const newImages = [...data[sectionName].images, ""];
    handleInputChange(sectionName, "images", newImages);
  };

  const removeSliderImage = (index: number) => {
    const newImages = [...data[sectionName].images];
    newImages.splice(index, 1);
    handleInputChange(sectionName, "images", newImages);
  };

  return (
    <div className="mb-6">
      <div className="bg-gray-100 rounded-md p-4 w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <HeaderEdit
          data={data}
          sectionName={sectionName}
          handleVisibleBlock={visibleHandler}
          setHeaderColorBg={setHeaderColorBg}
          headerColorBg={headerColorBg}
          setHeaderTextColor={setHeaderTextColor}
          headerTextColor={headerTextColor}
        />
        <SliderEdit
          data={data}
          sectionName={sectionName}
          handleAddSlider={addSliderImage}
          handleRemoveSlider={removeSliderImage}
        />
        <InfoEdit
          data={data}
          sectionName={sectionName}
          handlerInput={handleInputChange}
        />
        {sectionName === "socials" && (
          <>
            <div className="flex flex-col gap-4">
              <p>Instagram:</p>
              <input
                type="text"
                placeholder="Instagram"
                value={data[sectionName]?.instagram || ""}
                onChange={(e) =>
                  handleInputChange(sectionName, "instagram", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p>Facebook:</p>
              <input
                type="text"
                placeholder="Facebook"
                value={data[sectionName]?.facebook || ""}
                onChange={(e) =>
                  handleInputChange(sectionName, "facebook", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p>YouTube:</p>
              <input
                type="text"
                placeholder="YouTube"
                value={data[sectionName]?.youtube || ""}
                onChange={(e) =>
                  handleInputChange(sectionName, "youtube", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
        {sectionName === "footer" && (
          <>
            <div className="flex flex-col gap-4">
              <p>Час роботи:</p>
              <input
                type="text"
                placeholder="Час роботи"
                value={data[sectionName]?.work_time || ""}
                onChange={(e) =>
                  handleInputChange(sectionName, "work_time", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p>Посилання на вебсайт:</p>
              <input
                type="text"
                placeholder="Посилання на вебсайт"
                value={data[sectionName]?.web_link || ""}
                onChange={(e) =>
                  handleInputChange(sectionName, "web_link", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
      </div>
      <form className="flex flex-col gap-4"></form>
    </div>
  );
};

export default SectionEditor;
