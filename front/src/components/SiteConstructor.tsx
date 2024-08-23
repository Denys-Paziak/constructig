import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionEditor from "./SectionEditor";
import Preview from "./Preview";
import { getEditSite, updateSite } from "../services/getSite/getSite";
import Global from "./edit-components/global/Global";
import Loader from "./loader/Loader";

interface IColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const SiteConstructor: React.FC = () => {
  const [headerColorBg, setHeaderColorBg] = useState<IColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [headerTextColor, setHeaderTextColor] = useState<IColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const [bodyColorBg, setBodyColorBg] = useState<IColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const [bodyTextColor, setBodyTextColor] = useState<IColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (id && data && token) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      try {
        await updateSite(parseInt(id), formData, token);
        alert("Site updated successfully!");
        navigate("/profile");
      } catch (error) {
        console.error("Error updating site:", error);
        alert("Failed to update site");
      }
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

  const sections = [
    { name: "global", title: "Глобальні налаштування", component: Global },
    { name: "header", title: "Шапка" },
    { name: "slider", title: "Слайдер" },
    { name: "services", title: "Сервіси" },
    { name: "info", title: "Інфо" },
    { name: "socials", title: "Соціальні мережі" },
    { name: "footer", title: "Підвал" },
  ];

  return (
    <div className="flex edit-block">
      <div className="max-w-[25%] min-w-[25%] h-[100vh] overflow-y-scroll edit-sidebar">
        {sections.map(({ name, title, component: Component }) => (
          <div key={name} className="accordion-section">
            <div
              className={` bg-blue-100  py-2 px-4 select-none flex justify-between items-center cursor-pointer transition duration-300 border  border-b-blue-200   ${
                activeSection === name ? "text-blue-500 font-semibold" : ""
              }`}
              onClick={() => toggleSection(name)}
            >
              <p> {title}</p>

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
                      setHeaderColorBg={setHeaderColorBg}
                      headerColorBg={headerColorBg}
                      setHeaderTextColor={setHeaderTextColor}
                      headerTextColor={headerTextColor}
                      setBodyColorBg={setBodyColorBg}
                      bodyColorBg={bodyColorBg}
                      setBodyTextColor={setBodyTextColor}
                      bodyTextColor={bodyTextColor}
                    />
                  ) : (
                    <SectionEditor
                      title={title}
                      sectionName={name}
                      data={data}
                      visibleHandler={visibleHandler}
                      handleInputChange={handleInputChange}
                      //   setHeaderColorBg={setHeaderColorBg}
                      //   headerColorBg={headerColorBg}
                      //   setHeaderTextColor={setHeaderTextColor}
                      //   headerTextColor={headerTextColor}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Preview
        data={data}
        headerColorBg={headerColorBg}
        headerTextColor={headerTextColor}
        bodyColorBg={bodyColorBg}
        bodyTextColor={bodyTextColor}
        type={"constructor"}
      />
    </div>
  );
};

export default SiteConstructor;
