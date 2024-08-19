import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionEditor from "./SectionEditor";
import Preview from "./Preview";
import { getEditSite, updateSite } from "../services/getSite/getSite";
import Global from "./edit-components/global/Global";
import Loader from "./loader/Loader";

interface iColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const SiteConstructor: React.FC = () => {
  const [headerColorBg, setHeaderColorBg] = useState<iColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [headerTextColor, setHeaderTextColor] = useState<iColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const getEditSiteData = async () => {
    const token = localStorage.getItem("token");

    if (id && token) {
      try {
        const response = await getEditSite(+id, token);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getEditSiteData();
  }, [id]);

  const handleSave = () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    if (id && data) {
      updateSite(parseInt(id), formData, token || "")
        .then(() => {
          alert("Site updated successfully!");
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Error updating site:", error);
          alert("Failed to update site");
        });
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    if (data) {
      const newData = { ...data };
      newData[section][field] = value;
      setData(newData);
    }
  };

  const visibleHandler = (name: string, checked: boolean) => {
    if (data) {
      const newData = { ...data };
      if (newData[name]) {
        newData[name].visible = checked || false;
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

  return (
    <div className="flex">
      <div className="max-w-[25%] min-w-[25%] h-[100vh] p-4 overflow-y-scroll">
        <div className="accordion-section">
          <h2
            className={`text-2xl font-bold p-3 bg-blue-500 text-white rounded-md cursor-pointer mb-2 shadow transition-all ${
              activeSection === "global" ? "rounded-b-none" : ""
            }`}
            onClick={() => toggleSection("global")}
          >
            Глобальні налаштування
          </h2>
          <div
            className={`overflow-hidden transition-all ${
              activeSection === "global" ? "max-h-screen" : "max-h-0"
            }`}
          >
            {activeSection === "global" && (
              <div className="bg-white rounded-b-md shadow-md">
                <Global
                  setHeaderColorBg={setHeaderColorBg}
                  headerColorBg={headerColorBg}
                  setHeaderTextColor={setHeaderTextColor}
                  headerTextColor={headerTextColor}
                />
              </div>
            )}
          </div>
        </div>

        <div className="accordion-section">
          <h2
            className={`text-2xl font-bold p-3 bg-blue-500 text-white rounded-md cursor-pointer mb-2 shadow transition-all ${
              activeSection === "header" ? "rounded-b-none" : ""
            }`}
            onClick={() => toggleSection("header")}
          >
            Шапка
          </h2>
          <div
            className={`overflow-hidden transition-all ${
              activeSection === "header" ? "max-h-screen" : "max-h-0"
            }`}
          >
            {activeSection === "header" && (
              <div className="bg-white rounded-b-md  shadow-md">
                <SectionEditor
                  title="Header"
                  sectionName="header"
                  data={data}
                  visibleHandler={visibleHandler}
                  handleInputChange={handleInputChange}
                  setHeaderColorBg={setHeaderColorBg}
                  headerColorBg={headerColorBg}
                  setHeaderTextColor={setHeaderTextColor}
                  headerTextColor={headerTextColor}
                />
              </div>
            )}
          </div>
        </div>

        <div className="accordion-section">
          <h2
            className={`text-2xl font-bold p-3 bg-blue-500 text-white rounded-md cursor-pointer mb-2 shadow transition-all ${
              activeSection === "slider" ? "rounded-b-none" : ""
            }`}
            onClick={() => toggleSection("slider")}
          >
            Слайдер
          </h2>
          <div
            className={`overflow-hidden transition-all ${
              activeSection === "slider" ? "max-h-screen" : "max-h-0"
            }`}
          >
            {activeSection === "slider" && (
              <div className="bg-white rounded-b-md shadow-md">
                <SectionEditor
                  title="Slider"
                  sectionName="slider"
                  data={data}
                  visibleHandler={visibleHandler}
                  handleInputChange={handleInputChange}
                  setHeaderColorBg={setHeaderColorBg}
                  headerColorBg={headerColorBg}
                  setHeaderTextColor={setHeaderTextColor}
                  headerTextColor={headerTextColor}
                />
              </div>
            )}
          </div>
        </div>

        <div className="accordion-section">
          <h2
            className={`text-2xl font-bold p-3 bg-blue-500 text-white rounded-md cursor-pointer mb-2 shadow transition-all ${
              activeSection === "services" ? "rounded-b-none" : ""
            }`}
            onClick={() => toggleSection("services")}
          >
            Сервіси
          </h2>
          <div
            className={`overflow-hidden transition-all ${
              activeSection === "services" ? "max-h-screen" : "max-h-0"
            }`}
          >
            {activeSection === "services" && (
              <div className="bg-white rounded-b-md  shadow-md">
                <SectionEditor
                  title="Services"
                  sectionName="services"
                  data={data}
                  visibleHandler={visibleHandler}
                  handleInputChange={handleInputChange}
                  setHeaderColorBg={setHeaderColorBg}
                  headerColorBg={headerColorBg}
                  setHeaderTextColor={setHeaderTextColor}
                  headerTextColor={headerTextColor}
                />
              </div>
            )}
          </div>
        </div>

        <div className="accordion-section">
          <h2
            className={`text-2xl font-bold p-3 bg-blue-500 text-white rounded-md cursor-pointer mb-2 shadow transition-all ${
              activeSection === "info" ? "rounded-b-none" : ""
            }`}
            onClick={() => toggleSection("info")}
          >
            Інфо
          </h2>
          <div
            className={`overflow-hidden transition-all ${
              activeSection === "info" ? "max-h-screen" : "max-h-0"
            }`}
          >
            {activeSection === "info" && (
              <div className="bg-white rounded-b-md  shadow-md">
                <SectionEditor
                  title="Info"
                  sectionName="info"
                  data={data}
                  visibleHandler={visibleHandler}
                  handleInputChange={handleInputChange}
                  setHeaderColorBg={setHeaderColorBg}
                  headerColorBg={headerColorBg}
                  setHeaderTextColor={setHeaderTextColor}
                  headerTextColor={headerTextColor}
                />
              </div>
            )}
          </div>
        </div>

        <div className="accordion-section">
          <h2
            className={`text-2xl font-bold p-3 bg-blue-500 text-white rounded-md cursor-pointer mb-2 shadow transition-all ${
              activeSection === "socials" ? "rounded-b-none" : ""
            }`}
            onClick={() => toggleSection("socials")}
          >
            Соціальні мережі
          </h2>
          <div
            className={`overflow-hidden transition-all ${
              activeSection === "socials" ? "max-h-screen" : "max-h-0"
            }`}
          >
            {activeSection === "socials" && (
              <div className="bg-white rounded-b-md shadow-md">
                <SectionEditor
                  title="Socials"
                  sectionName="socials"
                  data={data}
                  visibleHandler={visibleHandler}
                  handleInputChange={handleInputChange}
                  setHeaderColorBg={setHeaderColorBg}
                  headerColorBg={headerColorBg}
                  setHeaderTextColor={setHeaderTextColor}
                  headerTextColor={headerTextColor}
                />
              </div>
            )}
          </div>
        </div>

        <div className="accordion-section">
          <h2
            className={`text-2xl font-bold p-3 bg-blue-500 text-white rounded-md cursor-pointer mb-2 shadow transition-all ${
              activeSection === "footer" ? "rounded-b-none" : ""
            }`}
            onClick={() => toggleSection("footer")}
          >
            Підвал
          </h2>
          <div
            className={`overflow-hidden transition-all ${
              activeSection === "footer" ? "max-h-screen" : "max-h-0"
            }`}
          >
            {activeSection === "footer" && (
              <div className="bg-white rounded-b-md  shadow-md">
                <SectionEditor
                  title="Footer"
                  sectionName="footer"
                  data={data}
                  visibleHandler={visibleHandler}
                  handleInputChange={handleInputChange}
                  setHeaderColorBg={setHeaderColorBg}
                  headerColorBg={headerColorBg}
                  setHeaderTextColor={setHeaderTextColor}
                  headerTextColor={headerTextColor}
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 w-full shadow-md"
        >
          Save Changes
        </button>
      </div>
      <Preview
        data={data}
        headerColorBg={headerColorBg}
        headerTextColor={headerTextColor}
        type={"constructor"}
      />
    </div>
  );
};

export default SiteConstructor;
