import React from "react";
import Button from "../../UI/button/Button";
import { updateSocials } from "../../../services/socials/socials";
import { notify } from "../../../helpers/helper";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string) => void;
}

const SocialsEdit: React.FC<Props> = ({ data, sectionName, handlerInput }) => {
  const id = data.site.id;
  const { t } = useTranslation();

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const formData = new FormData();

        formData.append("data", JSON.stringify(data.socials));

        const response = await updateSocials(id!, formData, token);
        notify(response.message);
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
              {t("adminChange.adminChangeSocial.adminChangeSocialSubtitle2")}
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel1")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel1"
              )}
              value={data[sectionName]?.instagram || ""}
              onChange={(e) =>
                handlerInput(sectionName, "instagram", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel2")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel2"
              )}
              value={data[sectionName]?.facebook || ""}
              onChange={(e) =>
                handlerInput(sectionName, "facebook", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel3")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel3"
              )}
              value={data[sectionName]?.youtube || ""}
              onChange={(e) =>
                handlerInput(sectionName, "youtube", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel4")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel4"
              )}
              value={data[sectionName]?.messenger || ""}
              onChange={(e) =>
                handlerInput(sectionName, "messenger", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel5")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel5"
              )}
              value={data[sectionName]?.whatsApp || ""}
              onChange={(e) =>
                handlerInput(sectionName, "whatsApp", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel6")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel6"
              )}
              value={data[sectionName]?.viber || ""}
              onChange={(e) =>
                handlerInput(sectionName, "viber", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel7")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel7"
              )}
              value={data[sectionName]?.x || ""}
              onChange={(e) => handlerInput(sectionName, "x", e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>{t("adminChange.adminChangeSocial.adminChangeSocialLabel8")}</p>
            <input
              type="text"
              placeholder={t(
                "adminChange.adminChangeSocial.adminChangeSocialLabel8"
              )}
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
