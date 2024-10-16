import React, { useState } from "react";
import Button from "../../UI/button/Button";
import { updateFooter } from "../../../services/footer/footer";
import { notify } from "../../../helpers/helper";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

const FooterEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  const id = data.site.id;
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const { t } = useTranslation();

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const formData = new FormData();
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
            <div className="flex gap-4">
              <div className="w-full flex flex-col gap-2 relative">
                <p>
                  {t("adminChange.adminChangeFooter.adminChangeFooterText1")}
                </p>
                <div
                  className="relative p-2 border border-gray-300 rounded-md cursor-pointer"
                  onClick={() => setIsOpenStart(!isOpenStart)}
                >
                  <div className="text-gray-700">
                    {data[sectionName]?.start_time || "Оберіть час"}
                  </div>
                  <div
                    className={`absolute left-0 top-full mt-1 w-full bg-white rounded-md shadow-md transition-all duration-300 ease-in-out z-10 ${
                      isOpenStart ? "block" : "hidden"
                    }`}
                  >
                    <ul className="max-h-60 overflow-y-auto">
                      {hours.map((hour) => (
                        <li
                          key={hour}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handlerInput(sectionName, "start_time", hour);
                            setIsOpenStart(false);
                          }}
                        >
                          {hour}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 relative">
                <p>
                  {t("adminChange.adminChangeFooter.adminChangeFooterText2")}
                </p>
                <div
                  className="relative p-2 border border-gray-300 rounded-md cursor-pointer"
                  onClick={() => setIsOpenEnd(!isOpenEnd)}
                >
                  <div className="text-gray-700">
                    {data[sectionName]?.end_time || "Оберіть час"}
                  </div>
                  <div
                    className={`absolute left-0 top-full mt-1 w-full bg-white rounded-md shadow-md transition-all duration-300 ease-in-out z-10 ${
                      isOpenEnd ? "block" : "hidden"
                    }`}
                  >
                    <ul className="max-h-60 overflow-y-auto">
                      {hours.map((hour) => (
                        <li
                          key={hour}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handlerInput(sectionName, "end_time", hour);
                            setIsOpenEnd(false);
                          }}
                        >
                          {hour}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <p>
                {t("adminChange.adminChangeFooter.adminChangeFooterLabel1")}
              </p>
              <input
                type="text"
                placeholder={t(
                  "adminChange.adminChangeFooter.adminChangeFooterLabel1"
                )}
                value={data[sectionName]?.web_link || ""}
                onChange={(e) =>
                  handlerInput(sectionName, "web_link", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <p>
                {t("adminChange.adminChangeFooter.adminChangeFooterLabel2")}
              </p>
              <input
                type="text"
                placeholder={t(
                  "adminChange.adminChangeFooter.adminChangeFooterLabel2"
                )}
                value={data[sectionName]?.first_description || ""}
                onChange={(e) =>
                  handlerInput(sectionName, "first_description", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <p>
                {t("adminChange.adminChangeFooter.adminChangeFooterLabel3")}
              </p>
              <input
                type="text"
                placeholder={t(
                  "adminChange.adminChangeFooter.adminChangeFooterLabel3"
                )}
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
