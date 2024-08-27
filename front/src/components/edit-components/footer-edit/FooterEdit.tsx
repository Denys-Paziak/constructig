import React from "react";
import Button from "../../UI/button/Button";
import { useParams } from "react-router-dom";
import { updateFooter } from "../../../services/footer/footer";
import { notify } from "../../../helpers/helper";

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
        notify(response.message);
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
              <p>Link to the website:</p>
              <input
                type="text"
                placeholder="Link to the website"
                value={data[sectionName]?.web_link || ""}
                onChange={(e) =>
                  handlerInput(sectionName, "web_link", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p>First text description:</p>
              <input
                type="text"
                placeholder="First text description"
                value={data[sectionName]?.first_description || ""}
                onChange={(e) =>
                  handlerInput(sectionName, "first_description", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p>Second text description</p>
              <input
                type="text"
                placeholder="Second text description"
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
