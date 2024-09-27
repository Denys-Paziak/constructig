import React from "react";
import {RgbaColorPicker} from "react-colorful";
import Button from "../../UI/button/Button";
import {updateGlobalColors} from "../../../services/global/global";
import {useParams} from "react-router-dom";
import {notify} from "../../../helpers/helper";


interface Props {
    data: any;
    handleInputChange: (
        section: string,
        field: string,
        value: any
    ) => void;
}

const Global: React.FC<Props> = ({data, handleInputChange}) => {
    const {id} = useParams();

    const handleSaveChanges = async () => {
        const token = localStorage.getItem("token");

        try {
            if (token) {
                const formData = new FormData();
                formData.append("data", JSON.stringify(data.global));
                const response = await updateGlobalColors(id!, formData, token);
                notify(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleResetChanges = async () => {
        const token = localStorage.getItem("token");

        try {
            if (token) {
                handleInputChange("global", "main_bg_color",  {r: 59, g: 130, b: 246, a: 1});
                handleInputChange("global", "main_text_color", {r: 255, g: 255, b: 255, a: 1});
                handleInputChange("global", "site_bg_color", {r: 255, g: 255, b: 255, a: 1});
                handleInputChange("global", "site_text_color", {r: 0, g: 0, b: 0, a: 1});
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-full bg-gray-100 flex flex-col gap-4 p-4">
            <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
                <h4 className="font-semibold text-lg">Global settings</h4>
            </div>
            <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
                <h4 className="font-semibold text-lg">Color of the cap and footer</h4>
                <div className="w-full color-picker-block">
                    <RgbaColorPicker
                        color={data.global.main_bg_color}
                        onChange={(value: any) => {
                            handleInputChange("global", "main_bg_color", value);
                        }}
                    />
                </div>
            </div>
            <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
                <h4 className="font-semibold text-lg">
                    Text color in the header and footer
                </h4>
                <div className="w-full color-picker-block">
                    <RgbaColorPicker
                        color={data.global.main_text_color}
                        onChange={(value: any) => {
                            handleInputChange("global", "main_text_color", value);
                        }}
                    />
                </div>
            </div>
            <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
                <h4 className="font-semibold text-lg">Website color</h4>
                <div className="w-full color-picker-block">
                    <RgbaColorPicker
                        color={data.global.site_bg_color}
                        onChange={(value: any) => {
                            handleInputChange("global", "site_bg_color", value);
                        }}
                    />
                </div>
            </div>
            <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
                <h4 className="font-semibold text-lg">Text color on the website</h4>
                <div className="w-full color-picker-block">
                    <RgbaColorPicker
                        color={data.global.site_text_color}
                        onChange={(value: any) => {
                            handleInputChange("global", "site_text_color", value);
                        }}
                    />
                </div>
            </div>
            <button
                onClick={handleResetChanges}
                className="w-full bg-blue-500 text-white py-2 rounded-md"
                type="button"
            >Resset colors
            </button>
            <Button handleButtonClick={handleSaveChanges}/>
        </div>
    );
};

export default Global;
