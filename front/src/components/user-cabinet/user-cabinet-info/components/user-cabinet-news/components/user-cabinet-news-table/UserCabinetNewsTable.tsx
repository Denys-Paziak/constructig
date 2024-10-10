import React from "react";
import { INew } from "../../../../../../../services/news/news.interface";
import { useTranslation } from "react-i18next";

interface Props {
  handleEditNew: (category: INew) => void;
  handleDeleteNew: (id: number) => void;
  data: any;
}

const UserCabinetNewsTable: React.FC<Props> = ({
  handleDeleteNew,
  handleEditNew,
  data,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-x-scroll flex flex-col gap-5">
      {data.global.news.length > 0 ? (
        <table className="w-full border-collapse">
          <thead className="w-full">
            <tr className="w-full">
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                {t("admin.adminInfo.adminInfoEvents.adminInfoEventsImage")}
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                {t(
                  "admin.adminInfo.adminInfoEvents.adminInfoEventsCategoryName"
                )}
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                {t("admin.adminInfo.adminInfoEvents.adminInfoEventsName")}
              </th>
              <th className="p-4 border border-border-gray text-lg font-light leading-[18px] text-black text-center">
                {t("admin.adminInfo.adminInfoEvents.adminInfoEventsActions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.global.news.map((oneNew: INew, index: number) => (
              <tr key={index} className="w-full">
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                  {oneNew.image && (
                    <img
                      src={oneNew.image}
                      alt="category img"
                      className="h-[160px] mx-auto"
                    />
                  )}
                </td>
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                  {oneNew.title}
                </td>
                <td className="p-4 notranslate border border-border-gray text-sm font-light leading-[16px] text-black text-center">
                  {oneNew.content}
                </td>
                <td className="p-4 border border-border-gray text-sm font-light leading-[16px] text-dark text-center">
                  <button
                    onClick={() => handleDeleteNew(oneNew.id)}
                    className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="button"
                  >
                    {t(
                      "admin.adminInfo.adminInfoEvents.adminInfoEventsActionsDelete"
                    )}
                  </button>
                  <button
                    onClick={() => handleEditNew(oneNew)}
                    className="w-full py-2.5 px-4 bg-blue-600 mt-4 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="button"
                  >
                    {t(
                      "admin.adminInfo.adminInfoEvents.adminInfoEventsActionsEdit"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="py-14 text-md font-medium text-black text-center">
          {t("admin.adminInfo.adminInfoEvents.adminInfoEventsEmptyText")}
        </p>
      )}
    </div>
  );
};

export default UserCabinetNewsTable;
