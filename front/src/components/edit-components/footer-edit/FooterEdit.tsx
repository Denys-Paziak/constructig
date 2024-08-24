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
          <div className="w-full flex flex-col gap-2">
            {/* <p>Текст вебсайту:</p>
            <input
              type="text"
              placeholder="Текст вебсайту"
              value={data[sectionName]?.web_link || ""}
              onChange={(e) =>
                handlerInput(sectionName, "web_text", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            /> */}
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
          <div className="w-full flex flex-col gap-2">
            <p>Перший текст опис:</p>
            <input
              type="text"
              placeholder="Перший текст опис:"
              onChange={(e) =>
                handlerInput(sectionName, "first_description", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Другий текст опис:</p>
            <input
              type="text"
              placeholder="Другий текст опис:"
              onChange={(e) =>
                handlerInput(sectionName, "second_description", e.target.value)
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
