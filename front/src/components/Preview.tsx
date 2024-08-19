import { useEffect, useState } from "react";
import { Header } from "./header/Header";
import { Info } from "./info/Info";
import { Services } from "./services/Services";
import { Slider } from "./slider/Slider";
import { Socials } from "./socials/Socials";
import Loader from "./loader/Loader";

interface PreviewProps {
  data: any;
  headerColorBg: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  headerTextColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  type?: string;
}

const Preview: React.FC<PreviewProps> = ({
  data,
  headerColorBg,
  headerTextColor,
  type,
}) => {
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

  if (!data) return <Loader />;

  return (
    <div
      className={`${
        type === "constructor"
          ? "w-[75%]  h-[100vh] overflow-scroll "
          : "w-[100%]"
      } flex items-center flex-col bg-gray-200 `}
    >
      {type === "constructor" ? (
        <div className="w-full bg-white shadow-md flex items-center justify-center gap-6 py-4 ">
          <div
            onClick={() => setScreen("desktop")}
            className={`w-8 h-8 p-2 ${
              screen === "desktop" ? "bg-blue-200" : "bg-gray-200"
            } shadow-sm rounded-md cursor-pointer`}
          >
            <img
              className="w-full h-full"
              src="/src/assets/images/desktop-icon.svg"
              alt="desktop icon"
            />
          </div>
          <div
            onClick={() => setScreen("tablet")}
            className={`w-8 h-8 p-2 ${
              screen === "tablet" ? "bg-blue-200" : "bg-gray-200"
            } shadow-sm rounded-md cursor-pointer`}
          >
            <img
              className="w-full h-full"
              src="/src/assets/images/tablet-icon.svg"
              alt="desktop icon"
            />
          </div>
          <div
            onClick={() => setScreen("mobile")}
            className={`w-8 h-8 p-2 ${
              screen === "mobile" ? "bg-blue-200" : "bg-gray-200"
            } shadow-sm rounded-md cursor-pointer`}
          >
            <img
              className="w-[400px] h-full"
              src="/src/assets/images/mobile-icon.svg"
              alt="desktop icon"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className={` ${type === "constructor" ? "py-6 px-4" : ""} ${
          screen === "desktop"
            ? "w-full"
            : screen === "tablet"
            ? "w-[700px]"
            : screen === "mobile"
            ? "w-[375px]"
            : ""
        }`}
      >
        <div
          className={`${
            type === "constructor" ? "rounded-xl overflow-hidden" : ""
          }`}
        >
          {data.header?.visible && (
            <Header
              logo={data.header.logo}
              data={data}
              company={data.site?.name || ""}
              headerColorBg={headerColorBg}
              headerTextColor={headerTextColor}
              screen={screen}
            />
          )}
          {data.slider?.visible && (
            <Slider
              images={data.slider.images || []}
              backgroundColor={headerColorBg}
              textColor={headerTextColor}
            />
          )}
          {data.services?.visible && (
            <Services services={data.services.cols || []} />
          )}
          {data.info?.visible && (
            <Info
              image={data.info.image}
              title={data.info.title}
              text={data.info.text}
            />
          )}
          {data.socials?.visible && (
            <Socials
              socials={[
                {
                  icon: "path_to_instagram_icon",
                  link: data.socials.instagram,
                  name: "Instagram",
                },
                {
                  icon: "path_to_facebook_icon",
                  link: data.socials.facebook,
                  name: "Facebook",
                },
                {
                  icon: "path_to_youtube_icon",
                  link: data.socials.youtube,
                  name: "YouTube",
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
