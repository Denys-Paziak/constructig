import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionEditor from "./SectionEditor";
import Preview from "./Preview";
import { getEditSite, updateSite } from "../services/getSite/getSite";
import Global from "./edit-components/global/Global";
import Loader from "./loader/Loader";

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
    formData.append("logo", JSON.stringify(uploadedFile));

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

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="flex">
      <div className="max-w-[25%] min-w-[25%] h-[100vh] p-4 overflow-y-scroll">
        <div className="bg-gray-100 rounded-md p-4 w-full flex flex-col gap-4 mb-6">
          <Global
            setHeaderColorBg={setHeaderColorBg}
            headerColorBg={headerColorBg}
            setHeaderTextColor={setHeaderTextColor}
            headerTextColor={headerTextColor}
          />
        </div>
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
