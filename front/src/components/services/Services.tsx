import React from "react";
import { NavLink } from "react-router-dom";

interface ServiceItem {
  image: string;
  title: string;
  link: string;
  phone: string;
}

interface ServicesProps {
  services: ServiceItem[];
  backgroundColor?: any;
  textColor?: any;
  bodyColorBg: { r: string; g: string; b: string; a: string };
  headerColorBg: { r: string; g: string; b: string; a: string };
  bodyTextColor: { r: number; g: number; b: number; a: number };
  screen: any;
  data: any;
  onServiceClick?: (index: number) => void;
}

export const Services: React.FC<ServicesProps> = ({
  services,
  backgroundColor,
  textColor,
  bodyColorBg,
  headerColorBg,
  bodyTextColor,
  screen,
  data,
  onServiceClick,
}) => {
  if (data.services.visible !== 0) {
    return (
      <div
        id="services"
        className="py-12 md:py-24"
        style={{
          background: `rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`,
        }}
      >
        <div className="container mx-auto container-block">
          <div className="w-full flex flex-col items-center gap-12">
            <h2
              className="text-4xl font-bold"
              style={{
                color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
              }}
            >
              {data.header.menu[1].text}
            </h2>
            <div
              className={`flex justify-between gap-[15px]  md:justify-between px-0 services-blocks w-full ${
                screen == "desktop" &&
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              } ${screen == "tablet" && " grid-cols-2"} ${
                screen == "mobile" && " grid-cols-1"
              }`}
            >
              {services.map((service, index) => (
                <NavLink
                  key={index}
                  target={index === 0 ? "_blank" : index === 1 ? "_blank" : ""}
                  to={
                    index === 0
                      ? `${"tel:" + service.phone}`
                      : index === 1
                      ? service.link
                      : index === 3
                      ? `/${data.site.lang}/${data.site.url}/${data.site.name}/news`
                      : "#"
                  }
                  onClick={() => {
                    onServiceClick?.(index);
                  }}
                  className="w-[60px] h-[60px] md:w-[160px] md:h-[160px] rounded-[10px] md:rounded-[40px] md:py-10 md:px-4 flex flex-col items-center justify-between py-[6px] text-center gap-1 md:gap-2 cursor-pointer transition-all duration-300"
                  style={{
                    background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                      headerColorBg.b
                    }, ${+headerColorBg.a / 1.1})`,
                  }}
                >
                  {service.image.length > 0 ? (
                    <div className="w-[24px] h-[24px] max-w-[24px] max-h-[24px] md:w-[50px] md:h-[50px]  md:max-w-[50px] md:max-h-[50px]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover rounded-sm"
                      />
                    </div>
                  ) : (
                    <>
                      {index === 0 && (
                        <img
                          className="w-6 md:w-12 h-6 md:h-12 object-contain"
                          src="/call.svg"
                          alt="Call service"
                        />
                      )}
                      {index === 1 && (
                        <img
                          className="w-6 md:w-12 h-6 md:h-12 object-contain"
                          src="/geo.svg"
                          alt="Geo service"
                        />
                      )}
                      {index === 2 && (
                        <img
                          className="w-6 md:w-12 h-6 md:h-12 object-contain"
                          src="/menu.svg"
                          alt="Menu service"
                        />
                      )}
                      {index === 3 && (
                        <img
                          className="w-6 md:w-12 h-6 md:h-12 object-contain"
                          src="/news.svg"
                          alt="News service"
                        />
                      )}
                      {index === 4 && (
                        <img
                          className="w-6 md:w-12 h-6 md:h-12 object-contain"
                          src="/wifi.svg"
                          alt="Wifi service"
                        />
                      )}
                    </>
                  )}
                  <span className="text-[14px] md:text-lg text-white text-md">
                    {service.title}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
