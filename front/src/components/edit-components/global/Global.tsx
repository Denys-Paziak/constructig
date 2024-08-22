import React from "react";
import { RgbaColorPicker } from "react-colorful";
import Button from "../../UI/button/Button";

interface iColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Props {
  setHeaderColorBg: (color: iColor) => void;
  headerColorBg: iColor;
  setHeaderTextColor: (color: iColor) => void;
  headerTextColor: iColor;
}

const Global: React.FC<Props> = ({
  setHeaderColorBg,
  headerColorBg,
  setHeaderTextColor,
  headerTextColor,
}) => {
  const handleSaveChanges = async () => {};

  return (
    <div className="w-full bg-gray-100 flex flex-col gap-4 p-4">
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Глобальні налаштування</h4>
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Колір шапки та підвалу</h4>
        <div className="w-full color-picker-block">
          <RgbaColorPicker color={headerColorBg} onChange={setHeaderColorBg} />
        </div>
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">
          Колір тексту в шапці та підвалі
        </h4>
        <div className="w-full color-picker-block">
          <RgbaColorPicker
            color={headerTextColor}
            onChange={setHeaderTextColor}
          />
        </div>
      </div>
      <Button handleButtonClick={handleSaveChanges} />
    </div>
  );
};

export default Global;
