import React from "react";
import { RgbaColorPicker } from "react-colorful";
import Button from "../../UI/button/Button";

interface Props {
  setHeaderColorBg: (color: string) => void;
  headerColorBg: void;
  setHeaderTextColor: (color: string) => void;
  headerTextColor: void;
}

const Global: React.FC<Props> = ({
  setHeaderColorBg,
  headerColorBg,
  setHeaderTextColor,
  headerTextColor,
}) => {
  const handleSaveChanges = async () => {};

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Глобальні налаштування</h4>
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Колір шапки</h4>
        <div className="w-full color-picker-block">
          <RgbaColorPicker color={headerColorBg} onChange={setHeaderColorBg} />
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
  );
};

export default Global;
