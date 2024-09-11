import { useState } from "react";
import { Header } from "./header/Header";
import { Info } from "./info/Info";
import { Services } from "./services/Services";
import { Slider } from "./slider/Slider";
import { Socials } from "./socials/Socials";
import Loader from "./loader/Loader";
import { Footer } from "./footer/Footer";
import ProductDisplay from "./ProductDisplay";
import NewsDisplay from "./NewsDisplay";
import TopLine from "./top-line/TopLine";
import Baner from "./baner/Baner.tsx";

interface PreviewProps {
  data: any;
  type?: string;
}

const Preview: React.FC<PreviewProps> = ({ data, type }) => {
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showNews, setShowNews] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleServiceClick = (index: number) => {
    if (index === 2) {
      setShowProducts(true);
      setShowNews(false);
      return;
    }
    if (index === 3) {
      setShowNews(true);
      setShowProducts(false);
      return;
    }
  };

  const handleCloseProducts = () => {
    setShowProducts(false);
  };

  const handleCloseNews = () => {
    setShowNews(false);
  };

  if (!data) return <Loader />;

  return (
    <div
      className={`${
        type === "constructor"
          ? `w-[75%] h-[100vh] ${
              isMenuOpen ? "overflow-hidden" : "overflow-scroll"
            } edit-site `
          : "w-[100%]"
      } flex items-center flex-col bg-gray-200`}
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
            ? "w-[600px]"
            : screen === "mobile"
            ? "w-[375px]"
            : ""
        }`}
      >
        <div
          className={`relative ${
            type === "constructor" ? "rounded-xl overflow-hidden" : ""
          }`}
        >
          <TopLine />
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
          <Baner bodyColorBg={data.global.site_bg_color} />
          {data.services?.visible && (
            <Services
              data={data}
              services={data.services.cols || []}
              backgroundColor={data.global.main_bg_color}
              textColor={data.global.main_text_color}
              bodyColorBg={data.global.site_bg_color}
              headerColorBg={data.global.main_bg_color}
              bodyTextColor={data.global.site_text_color}
              screen={screen}
              onServiceClick={handleServiceClick}
            />
          )}
          {showProducts && (
            <div
              className="w-[100%] top-0 z-50 overflow-auto px-4 md:px-0 pb-24"
              style={{
                background: `rgba(${data.global.site_bg_color.r}, ${data.global.site_bg_color.g}, ${data.global.site_bg_color.b}, ${data.global.site_bg_color.a})`,
              }}
            >
              <div className="container mx-auto pt-16 flex flex-col items-end gap-4">
                <button
                  onClick={handleCloseProducts}
                  className="bg-red-transparent flex items-center gap-4 z-[100001] border-b py-2 px-4 button-close"
                  style={{
                    color: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                    borderColor: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                  }}
                >
                  <span className="hidden md:block">Close</span>
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 0.5L9 8.5M9 0.5L1 8.5"
                      stroke-linecap="round"
                      style={{
                        stroke: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                      }}
                    />
                  </svg>
                </button>
                <ProductDisplay
                  data={data.global}
                  bodyColorBg={data.global.site_bg_color}
                  headerColorBg={data.global.main_bg_color}
                  bodyTextColor={data.global.site_text_color}
                />
              </div>
            </div>
          )}
          {showNews && (
            <div
              className="w-[100%] top-0 z-50 overflow-auto px-4 md:px-0 pb-24"
              style={{
                background: `rgba(${data.global.site_bg_color.r}, ${data.global.site_bg_color.g}, ${data.global.site_bg_color.b}, ${data.global.site_bg_color.a})`,
              }}
            >
              <div className="container mx-auto pt-16 flex flex-col items-end gap-4">
                <button
                  onClick={handleCloseNews}
                  className="bg-red-transparent flex items-center gap-4 z-[100001] border-b py-2 px-4 button-close"
                  style={{
                    color: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                    borderColor: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                  }}
                >
                  <span className="hidden md:block">Close</span>
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 0.5L9 8.5M9 0.5L1 8.5"
                      stroke-linecap="round"
                      style={{
                        stroke: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                      }}
                    />
                  </svg>
                </button>
                <NewsDisplay
                  data={data.global}
                  bodyColorBg={data.global.site_bg_color}
                  headerColorBg={data.global.main_bg_color}
                  bodyTextColor={data.global.site_text_color}
                />
              </div>
            </div>
          )}
          {data.info?.visible && (
            <Info
              data={data}
              image={data.info.image}
              title={data.info.title}
              text={data.info.text}
              backgroundColor={data.global.main_bg_color}
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
