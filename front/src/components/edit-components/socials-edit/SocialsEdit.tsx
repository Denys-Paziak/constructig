import React from "react";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}

const SocialsEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  return (
    <>
      {sectionName === "socials" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
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
        </div>
      )}
    </>
  );
};

export default SocialsEdit;
