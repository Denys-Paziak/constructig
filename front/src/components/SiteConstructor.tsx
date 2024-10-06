import React, { useState, useEffect, useTransition } from "react";
import { useParams, NavLink } from "react-router-dom";
import SectionEditor from "./SectionEditor";
import Preview from "./Preview";
import { getEditSite } from "../services/getSite/getSite";
import Global from "./edit-components/global/Global";
import Loader from "./loader/Loader";
import { createLang } from "../services/createLang/createLang.ts";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector.tsx";

const SiteConstructor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showBaner, setShowBaner] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (id && token) {
      try {
        const response = await getEditSite(+id, token, i18n.language);

        if (response.error === true) {
          await createLangHandler(i18n.language);
          setShowBaner(true);
        } else {
          setData(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const bannerHandler = async () => {
    const token = localStorage.getItem("token");
    const newLang = await getEditSite(+id, token, i18n.language);
    setData(newLang);
    setShowBaner(false);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    if (data) {
      const newData = { ...data };
      newData[section][field] = value === "" ? null : value;
      setData(newData);
    }
  };

  const createLangHandler = async (lang) => {
    if (token) {
      const formData = new FormData();
      formData.append("url", data.site.url);
      formData.append("name", data.site.name);
      formData.append("langId", data.site.langId);
      formData.append("lang", lang);

      await createLang(formData, token);
    }
  };

  const visibleHandler = (name: string, checked: boolean) => {
    if (data) {
      const newData = { ...data };
      if (newData[name]) {
        newData[name].visible = (checked === true && 1) || 0;
        setData(newData);
      }
    }
  };

  const toggleSection = (section: string) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  if (!data) {
    return <Loader />;
  }

  const sections = [
    { name: "global", title: "Global settings", component: Global },
    { name: "header", title: "Header" },
    { name: "banner", title: "Banner" },
    { name: "slider", title: "Slider" },
    { name: "services", title: "Services" },
    { name: "info", title: "Info" },
    { name: "socials", title: "Social networks" },
    { name: "footer", title: "Footer" },
  ];

  return (
    <div className="flex edit-block">
      <div className="max-w-[25%] min-w-[25%] h-[100vh] overflow-y-scroll edit-sidebar">

        {showBaner && (
          <div
            className={
              "fixed  w-full h-full z-[1000] top-0 left-0 bg-white flex flex-col justify-center items-center"
            }
          >
            <div>No site in</div>
            <button
              className="w-full block mt-4 text-center py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={bannerHandler}
            >
              Create
            </button>
          </div>
        )}

        {sections.map(({ name, title, component: Component }) => (
          <div key={name} className="accordion-section">
            <div
              className={` bg-blue-100  py-2 px-4 select-none flex justify-between items-center cursor-pointer transition duration-300 border  border-b-blue-200   ${
                activeSection === name ? "text-blue-500 font-semibold" : ""
              }`}
              onClick={() => toggleSection(name)}
            >
              <p className="notranslate">{title}</p>

              <svg
                data-accordion-icon
                className={` w-3 h-3 rotate-180 shrink-0  ${
                  activeSection === name ? "rotate-0" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </div>
            <div
              className={`overflow-hidden transition-all ${
                activeSection === name ? "max-h-auto" : "max-h-0"
              }`}
            >
              {activeSection === name && (
                <div className="bg-white rounded-b-md shadow-md">
                  {Component ? (
                    <Component
                      data={data}
                      handleInputChange={handleInputChange}
                    />
                  ) : (
                    <SectionEditor
                      title={title}
                      sectionName={name}
                      data={data}
                      visibleHandler={visibleHandler}
                      handleInputChange={handleInputChange}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="w-full px-4 pb-6">
          <NavLink
            to={"/profile"}
            className="w-full block mt-4 text-center py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Profile
          </NavLink>
        </div>
      </div>
      <Preview data={data} type={"constructor"} />
    </div>
  );
};

export default SiteConstructor;
