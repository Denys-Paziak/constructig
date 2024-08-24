import React from "react";
import Button from "../../UI/button/Button";
import { updateSocials } from "../../../services/socials/socials";
import { useParams } from "react-router-dom";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}

const SocialsEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  const { id } = useParams();

  const handleSaveChanges = () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const formData = new FormData();

        console.log(data.socials);
        formData.append("data", data.socials);

        // const response = updateSocials(id!, formData, token)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sectionName === "socials" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
          <div className="w-full border-b border-gray-400 pb-2">
            <p className="text-sm font-normal text-blue-500">
              !Для того щоб відобразити соц. мережу потрібно вставити посилання
              на неї.
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Instagram:</p>
            <input
              type="text"
              placeholder="Instagram"
              value={data[sectionName]?.instagram || ""}
              onChange={(e) =>
                handlerInput(sectionName, "instagram", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Facebook:</p>
            <input
              type="text"
              placeholder="Facebook"
              value={data[sectionName]?.facebook || ""}
              onChange={(e) =>
                handlerInput(sectionName, "facebook", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>YouTube:</p>
            <input
              type="text"
              placeholder="YouTube"
              value={data[sectionName]?.youtube || ""}
              onChange={(e) =>
                handlerInput(sectionName, "youtube", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Messanger:</p>
            <input
              type="text"
              placeholder="Messanger"
              value={data[sectionName]?.messanger || ""}
              onChange={(e) =>
                handlerInput(sectionName, "messanger", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>WhatsApp:</p>
            <input
              type="text"
              placeholder="WhatsApp"
              value={data[sectionName]?.whatsApp || ""}
              onChange={(e) =>
                handlerInput(sectionName, "whatsApp", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Viber:</p>
            <input
              type="text"
              placeholder="Viber"
              value={data[sectionName]?.viber || ""}
              onChange={(e) =>
                handlerInput(sectionName, "viber", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>X:</p>
            <input
              type="text"
              placeholder="X"
              value={data[sectionName]?.x || ""}
              onChange={(e) => handlerInput(sectionName, "x", e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>TikTok:</p>
            <input
              type="text"
              placeholder="TikTok"
              value={data[sectionName]?.tikTok || ""}
              onChange={(e) =>
                handlerInput(sectionName, "tikTok", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full mt-4">
            <Button handleButtonClick={handleSaveChanges} />
          </div>
        </div>
      )}
    </>
  );
};

export default SocialsEdit;
