import React from "react";
import { RgbaColorPicker } from "react-colorful";
import Button from "../../UI/button/Button";
import { updateGlobalColors } from "../../../services/global/global";
import { useParams } from "react-router-dom";

interface iColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Props {
  data: any;
  handleInputChange: (
    section: string,
    field: string,
    value: string | null | any[]
  ) => void;
}

const Global: React.FC<Props> = ({
  data,
  handleInputChange
}) => {
  const { id } = useParams();

  const handleSaveChanges = async () => {
    console.log(data);
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data.global));
        const response = await updateGlobalColors(id!, formData, token);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full bg-gray-100 flex flex-col gap-4 p-4">
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Глобальні налаштування</h4>
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Колір шапки та підвалу</h4>
        <div className="w-full color-picker-block">
          <RgbaColorPicker color={data.global.main_bg_color} onChange={(value) => {
            handleInputChange("global", "main_bg_color", value)
          }} />
        </div>
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">
          Колір тексту в шапці та підвалі
        </h4>
        <div className="w-full color-picker-block">
          <RgbaColorPicker
            color={data.global.main_text_color}
            onChange={(value) => {
              handleInputChange("global", "main_text_color", value)
            }}
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Колір сайту</h4>
        <div className="w-full color-picker-block">
          <RgbaColorPicker color={data.global.site_bg_color}
            onChange={(value) => {
              handleInputChange("global", "site_bg_color", value)
            }}
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
        <h4 className="font-semibold text-lg">Колір тексту на сайті</h4>
        <div className="w-full color-picker-block">
          <RgbaColorPicker color={data.global.site_text_color}
            onChange={(value) => {
              handleInputChange("global", "site_text_color", value)
            }}
          />
        </div>
      </div>
      <Button handleButtonClick={handleSaveChanges}

      />
    </div>
  );
};

export default Global;
