import { useEffect, useState } from "react";
import { Header } from "./header/Header";
import { Info } from "./info/Info";
import { Services } from "./services/Services";
import { Slider } from "./slider/Slider";
import { Socials } from "./socials/Socials";
import Loader from "./loader/Loader";
import { Footer } from "./footer/Footer";
import ProductDisplay from "./ProductDisplay";

interface PreviewProps {
  data: any;
  type?: string;
}

const Preview: React.FC<PreviewProps> = ({ data, type }) => {
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false); // Стан для відображення продуктів

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleServiceClick = (index: number) => {
    if (index === 2) {
      setShowProducts(true);
      document.body.style.overflow = "hidden"; // Забороняємо прокручування сторінки
    }
  };

  const handleCloseProducts = () => {
    setShowProducts(false);
    document.body.style.overflow = "auto"; // Відновлюємо прокручування сторінки
  };

  if (!data) return <Loader />;

  return (
    <div
      className={`${type === "constructor"
        ? `w-[75%] h-[100vh] ${isMenuOpen ? "overflow-hidden" : "overflow-scroll"
        } edit-site `
        : "w-[100%]"
        } flex items-center flex-col bg-gray-200`}
    >
      {type === "constructor" ? (
        <div className="w-full bg-white shadow-md flex items-center justify-center gap-6 py-4 ">
          <div
            onClick={() => setScreen("desktop")}
            className={`w-8 h-8 p-2 ${screen === "desktop" ? "bg-blue-200" : "bg-gray-200"
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
            className={`w-8 h-8 p-2 ${screen === "tablet" ? "bg-blue-200" : "bg-gray-200"
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
            className={`w-8 h-8 p-2 ${screen === "mobile" ? "bg-blue-200" : "bg-gray-200"
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
        className={` ${type === "constructor" ? "py-6 px-4" : ""} ${screen === "desktop"
          ? "w-full"
          : screen === "tablet"
            ? "w-[600px]"
            : screen === "mobile"
              ? "w-[375px]"
              : ""
          }`}
      >
        <div
          className={`relative ${type === "constructor" ? "rounded-xl overflow-hidden" : ""
            }`}
        >
          {data.header?.visible && (
            <Header
              logo={data.header.logo}
              data={data}
              company={data.site?.name || ""}
              headerColorBg={data.global.main_bg_color}
              headerTextColor={data.global.main_text_color}
              screen={screen}
              onMenuToggle={handleMenuToggle}
            />
          )}
          {data.slider?.visible && (
            <Slider
              images={data.slider.images || []}
              backgroundColor={data.global.main_bg_color}
              textColor={data.global.main_text_color}
            />
          )}
          {data.services?.visible && (
            <Services
              data={data}
              services={data.services.cols || []}
              backgroundColor={data.global.main_bg_color}
              textColor={data.global.main_text_color}
              bodyColorBg={data.global.site_bg_color}
              bodyTextColor={data.global.site_text_color}
              screen={screen}
              onServiceClick={handleServiceClick}
            />
          )}
          {showProducts && (
            <div className=" w-[100%] top-0 bg-white z-50 overflow-auto">
              <div className="relative">
                <button
                  onClick={handleCloseProducts}
                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 z-50"
                >
                  Close
                </button>
                <ProductDisplay data={data.global} />
              </div>
            </div>
          )}
          {data.info?.visible && (
            <Info
              data={data}
              image={data.info.image}
              title={data.info.title}
              text={data.info.text}
              bodyColorBg={data.global.site_bg_color}
              bodyTextColor={data.global.site_text_color}
              screen={screen}
            />
          )}
          {data.socials?.visible && (
            <Socials
              data={data}
              screen={screen}
              socials={[
                {
                  link: data.socials.instagram,
                  name: "Instagram",
                },
                {
                  link: data.socials.facebook,
                  name: "Facebook",
                },
                {
                  link: data.socials.youtube,
                  name: "YouTube",
                },
                {
                  link: data.socials.messenger,
                  name: "Messenger",
                },
                {
                  link: data.socials.whatsApp,
                  name: "WhatsApp",
                },
                {
                  link: data.socials.viber,
                  name: "Viber",
                },
                {
                  link: data.socials.x,
                  name: "X",
                },
                {
                  link: data.socials.tikTok,
                  name: "TikTok",
                },
              ]}
              bodyColorBg={data.global.site_bg_color}
              bodyTextColor={data.global.site_text_color}
            />
          )}
          {data.footer?.visible && (
            <Footer
              logo={data.header.logo}
              data={data}
              company={data.site?.name || ""}
              footerColorBg={data.global.main_bg_color}
              footerTextColor={data.global.main_text_color}
              screen={screen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
