import React from "react";
import Button from "../../UI/button/Button";
import { useParams } from "react-router-dom";
import { updateFooter } from "../../../services/footer/footer";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}

const FooterEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  const { id } = useParams();

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const formData = new FormData();

        console.log(data.footer);
        formData.append("data", JSON.stringify(data.footer));

        const response = await updateFooter(id!, formData, token);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sectionName === "footer" && (
        <>
          <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-4 flex-col">
            <div className="w-full flex flex-col gap-2">
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
                value={data[sectionName]?.first_description || ""}
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
                value={data[sectionName]?.second_description || ""}
                onChange={(e) =>
                  handlerInput(
                    sectionName,
                    "second_description",
                    e.target.value
                  )
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <Button handleButtonClick={handleSaveChanges} />
        </>
      )}
    </>
  );
};

export default FooterEdit;
