import React from "react";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}

const FooterEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  return (
    <>
      {sectionName === "footer" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-4 flex-col">
          <div className="w-full flex flex-col gap-4">
            <p>Час роботи:</p>
            <input
              type="text"
              placeholder="Час роботи"
              value={data[sectionName]?.work_time || ""}
              onChange={(e) =>
                handlerInput(sectionName, "work_time", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <p>Посилання на вебсайт:</p>
            <input
              type="text"
              placeholder="Посилання на вебсайт"
              value={data[sectionName]?.web_link || ""}
              onChange={(e) =>
                handlerInput(sectionName, "web_link", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FooterEdit;
