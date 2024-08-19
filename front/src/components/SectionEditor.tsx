import { useCallback, useEffect, useState } from "react";
import HeaderEdit from "./edit-components/header-edit/HeaderEdit";
import SliderEdit from "./edit-components/slider-edit/SliderEdit";
import InfoEdit from "./edit-components/info-edit/InfoEdit";
import SocialsEdit from "./edit-components/socials-edit/SocialsEdit";
import Toggle from "react-toggle";
import FooterEdit from "./edit-components/footer-edit/FooterEdit";


interface iColor {
  r: number,
  g: number,
  b: number,
  a: number,
}

interface SectionEditorProps {
  title: string;
  sectionName: string;
  data: any;
  visibleHandler: (name: string, checked: boolean) => void;
  handleInputChange: (
    section: string,
    field: string,
    value: string | null | any[]
  ) => void;
  setHeaderColorBg: (color: iColor) => void;
  headerColorBg: iColor;
  setHeaderTextColor: (color: iColor) => void;
  headerTextColor: iColor;
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
  const removeSliderImage = (index?: number) => {
    let newImages = [...data[sectionName].images];

    if (newImages && index) {
      newImages.splice(index, 1);
      handleInputChange(sectionName, "images", newImages);
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-gray-100 rounded-md p-4 w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
          <h4 className="font-semibold text-lg">Відображення блоку</h4>
          <div className="w-full flex items-center justify-between">
            <p>Сховати/Показати:</p>
            <Toggle
              defaultChecked={true}
              icons={false}
              onChange={(e) => visibleHandler(sectionName, e.target.checked)}
            />
          </div>
        </div>
        <HeaderEdit
          data={data}
          sectionName={sectionName}
          handleInputChange={handleInputChange}
        />
        <SliderEdit
          data={data}
          sectionName={sectionName}
          handleInputChange={handleInputChange}
          handleRemoveSlider={removeSliderImage}
        />
        <InfoEdit
          data={data}
          sectionName={sectionName}
          handlerInput={handleInputChange}
        />
        <SocialsEdit
          data={data}
          sectionName={sectionName}
          handlerInput={handleInputChange}
        />
        <FooterEdit
          data={data}
          sectionName={sectionName}
          handlerInput={handleInputChange}
        />
      </div>
      <form className="flex flex-col gap-4"></form>
    </div>
  );
};

export default SectionEditor;
