import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface Props {
  logo: string | null;
  data: any;
  company: string;
  footerColorBg: { r: string; g: string; b: string; a: string };
  footerTextColor: { r: string; g: string; b: string; a: string };
  screen: string;
}

export const Footer: React.FC<Props> = ({
  logo,
  data,
  company,
  footerColorBg,
  footerTextColor,
  screen,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="py-12 container-block"
      style={{
        backgroundColor: `rgba(${footerColorBg.r}, ${footerColorBg.g}, ${footerColorBg.b}, ${footerColorBg.a})`,
      }}
    >
      <div className="container mx-auto w-full flex flex-col gap-6">
        <div
          className={`w-full flex items-center justify-between pb-6 footer-top ${
            screen == "desktop" && " flex-col lg:flex-row "
          } ${screen == "tablet" && "flex-col gap-12"} ${
            screen == "mobile" && "flex-col gap-12"
          }`}
          style={{
            color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            borderBottomWidth: "1px",
            borderStyle: "solid",
            borderColor: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
          }}
        >
          <div className="notranslate">
            {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
          </div>
          <ul
            className={`flex items-center gap-8 footer-menu ${
              screen == "desktop" && " flex-col lg:flex-row "
            } ${screen == "tablet" && "flex-col"} ${
              screen == "mobile" && "flex-col"
            }`}
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
          >
            {data.slider?.visible === 1 && (
              <a href="#slider">{data.header.menu[0].text}</a>
            )}
            {data.services?.visible === 1 && (
              <a href="#services">{data.header.menu[1].text}</a>
            )}
            {data.info?.visible === 1 && (
              <a href="#about">{data.header.menu[2].text}</a>
            )}
            {data.socials?.visible === 1 && (
              <a href="#contact">{data.header.menu[3].text}</a>
            )}
          </ul>
          <div className="flex flex-col gap-2 items-center">
            <NavLink
              target={data.footer.web_link && "_blank"}
              to={data.footer.web_link && data.footer.web_link}
              style={{
                color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
              }}
              className="text-lg text-black hover:text-blue-500"
            >
              {t("site.siteMyWebsite")}
            </NavLink>
            <div className="flex flex-col items-center gap-1">
              <p
                style={{
                  color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                }}
              >
                {t("site.siteWorkingHours")}
              </p>
              <div className="flex items-center flex-col gap-1">
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                  }}
                >
                  <span>{t("site.siteDay1")}:</span>
                  <span>{data.footer.start_time}</span>
                  <span>-</span>
                  <span>{data.footer.end_time}</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                  }}
                >
                  <span>{t("site.siteDay2")}:</span>
                  <span>{data.footer.start_time}</span>
                  <span>-</span>
                  <span>{data.footer.end_time}</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                  }}
                >
                  <span>{t("site.siteDay3")}:</span>
                  <span>{data.footer.start_time}</span>
                  <span>-</span>
                  <span>{data.footer.end_time}</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                  }}
                >
                  <span>{t("site.siteDay4")}:</span>
                  <span>{data.footer.start_time}</span>
                  <span>-</span>
                  <span>{data.footer.end_time}</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                  }}
                >
                  <span>{t("site.siteDay5")}:</span>
                  <span>{data.footer.start_time}</span>
                  <span>-</span>
                  <span>{data.footer.end_time}</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                  }}
                >
                  <span>{t("site.siteDay6")}:</span>
                  <span>{t("site.siteClosed")}</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
                  }}
                >
                  <span>{t("site.siteDay7")}:</span>
                  <span>{t("site.siteClosed")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
            className="text-sm text-black text-center"
          >
            {data.footer.first_description}
          </p>
          <p
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
            className="text-sm text-black text-center"
          >
            {data.footer.second_description}
          </p>
        </div>
      </div>
    </div>
  );
};
