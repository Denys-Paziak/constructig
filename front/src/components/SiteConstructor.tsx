import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSite, updateSite } from "../services/server";
import SectionEditor from "./SectionEditor";
import Preview from "./Preview";

const SiteConstructor: React.FC = () => {
  const [headerColorBg, setHeaderColorBg] = useState({
    r: 200,
    g: 150,
    b: 35,
    a: 0.5,
  });
  const [headerTextColor, setHeaderTextColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      getSite(parseInt(id), token || "")
        .then((response) => {
          const siteData = response;
          setData(siteData);
        })
        .catch((error) => {
          console.error("Error fetching site data:", error);
        });
    }
  }, [id]);

  const handleSave = () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("logo", JSON.stringify(uploadedFile));

    if (id && data) {
      updateSite(parseInt(id), formData, token || "")
        .then(() => {
          alert("Site updated successfully!");
          navigate("/sites");
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
    console.log(data);
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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="max-w-[25%] min-w-[25%] h-[100vh] p-4 overflow-y-scroll">
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
          //   onFileUpload={handleFileUpload}
        />
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
          //   onFileUpload={handleFileUpload}
        />
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
          //   onFileUpload={handleFileUpload}
        />
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
          //   onFileUpload={handleFileUpload}
        />
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
          //   onFileUpload={handleFileUpload}
        />
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
          //   onFileUpload={handleFileUpload}
        />
        <button
          onClick={handleSave}
          className="mt-6 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
        >
          Save Changes
        </button>
      </div>
      <Preview
        data={data}
        headerColorBg={headerColorBg}
        headerTextColor={headerTextColor}
      />
    </div>
  );
};

export default SiteConstructor;
