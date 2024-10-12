import React, { useEffect, useState } from "react";
import { INew } from "../services/news/news.interface";
import Loader from "./loader/Loader";
import { useParams } from "react-router-dom";
import { getSite } from "../services/getSite/getSite.ts";
import { useTranslation } from "react-i18next";

const NewsDisplay: React.FC = () => {
  const [data, setData] = useState<any>();
  const { siteName, company, lang } = useParams();
  const { t } = useTranslation();

  const getUserSite = async () => {
    try {
      const response = await getSite(siteName!, company!, lang!);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserSite();
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <div
      className="w-full rounded-lg"
      style={{
        background: `rgba(${data.global.main_bg_color.r}, ${
          data.global.main_bg_color.g
        }, ${data.global.main_bg_color.b}, ${
          +data.global.main_bg_color.a / 6
        })`,
      }}
    >
      <div
        className="rounded-lg flex flex-col gap-4 p-3"
        style={{
          background: `rgba(${data.global.site_text_color.r}, ${
            data.global.site_text_color.g
          }, ${data.global.site_text_color.b}, ${
            data.global.site_text_color.a / 4
          })`,
        }}
      >
        {data.global.news.length > 0 ? (
          data.global.news.map((oneNew: INew) => (
            <div
              key={oneNew.id}
              className="hoverImg flex flex-col md:flex-row rounded-lg shadow-lg"
              style={{
                background: `rgba(${data.global.main_bg_color.r}, ${
                  data.global.main_bg_color.g
                }, ${data.global.main_bg_color.b}, ${
                  +data.global.main_bg_color.a / 1.1
                })`,
              }}
            >
              <div className="w-full md:w-[50%] min-h-full  rounded-t-lg md:rounded-lg img_w">
                {oneNew.image && (
                  <img
                    src={oneNew.image}
                    alt={oneNew.title}
                    className="w-full min-h-full object-contain rounded-t-lg md:rounded-lg"
                  />
                )}
              </div>

              <div className="w-full md:w-[50%] flex flex-col gap-[12px] md:gap-[20px] p-[12px] md:p-[40px]">
                <h3
                  className="text-xl font-semibold"
                  style={{
                    color: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                  }}
                >
                  {oneNew.title}
                </h3>
                <p
                  className="text-md h-[180px] overflow-scroll md:overflow-visible md:h-auto opacity-[80%]"
                  style={{
                    color: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                  }}
                >
                  {oneNew.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p
              className="text-center text-lg font-semibold"
              style={{
                color: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
              }}
            >
              {t("site.siteNoNews")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDisplay;
