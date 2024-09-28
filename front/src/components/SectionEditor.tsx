import HeaderEdit from "./edit-components/header-edit/HeaderEdit";
import SliderEdit from "./edit-components/slider-edit/SliderEdit";
import InfoEdit from "./edit-components/info-edit/InfoEdit";
import SocialsEdit from "./edit-components/socials-edit/SocialsEdit";
import Toggle from "react-toggle";
import FooterEdit from "./edit-components/footer-edit/FooterEdit";
import ServicesEdit from "./edit-components/services-edit/ServicesEdit";
import Banner from "./edit-components/banner/Banner.tsx";


interface SectionEditorProps {
  title: string;
  sectionName: string;
  data: any;
  visibleHandler: (name: string, checked: boolean) => void;
  handleInputChange: (
    section: string,
    field: string,
    value: string | null | any[]
  ) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  sectionName,
  data,
  visibleHandler,
  handleInputChange,
}) => {
  return (
    <div className="">
      <div className="bg-gray-100 rounded-md p-4 w-full flex flex-col gap-4">
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-2 flex-col">
          <h4 className="font-semibold text-lg">Displaying a block</h4>
          <div className="w-full flex items-center justify-between">
            <p>Hide/Show:</p>
            <Toggle
              defaultChecked={data[sectionName].visible === 1 ? true : false}
              icons={false}
              onChange={(e) => visibleHandler(sectionName, e.target.checked)}
            />
          </div>
        </div>
        <HeaderEdit
          data={data}
          sectionName={sectionName}
          handleInputChange={handleInputChange}
        />
        <Banner
            data={data}
            sectionName={sectionName}
            handlerInput={handleInputChange}
        />
        <SliderEdit
          data={data}
          sectionName={sectionName}
          handleInputChange={handleInputChange}
        />
        <ServicesEdit
          data={data}
          sectionName={sectionName}
          handleInputChange={handleInputChange}
        />
        <InfoEdit
          data={data}
          sectionName={sectionName}
          handlerInput={handleInputChange}
        />
        <SocialsEdit
          data={data}
          sectionName={sectionName}
          handlerInput={handleInputChange}
        />
        <FooterEdit
          data={data}
          sectionName={sectionName}
          handlerInput={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SectionEditor;
