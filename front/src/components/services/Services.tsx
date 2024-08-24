import React from "react";

interface ServiceItem {
  image: string;
  title: string;
  link: string;
}

interface ServicesProps {
  services: ServiceItem[];
  backgroundColor?: any;
  textColor?: any;
  bodyColorBg: { r: string; g: string; b: string; a: string };
  bodyTextColor: { r: string; g: string; b: string; a: string };
}

export const Services: React.FC<ServicesProps> = ({
  services,
  backgroundColor,
  textColor,
  bodyColorBg,
  bodyTextColor,
}) => {
  return (
    <div
      id="services"
      className=" py-24"
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
            Services
          </h2>
          <div className="w-full flex justify-between px-0 services-blocks">
            {services.map((service, index) => (
              <a
                key={index}
                href={service.link}
                className="bg-blue-400 w-[22%] rounded-lg py-10 px-4 flex flex-col items-center text-center gap-4 cursor-pointer hover:bg-blue-500 transition-all duration-300"
              >
                {service.image.length > 0 ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-12 w-12 mb-2"
                  />
                ) : (
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 3C4.23858 3 2 5.23858 2 8V16C2 18.7614 4.23858 21 7 21H17C19.7614 21 22 18.7614 22 16V8C22 5.23858 19.7614 3 17 3H7Z"
                      fill={`rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`}
                    />
                    <path
                      d="M19.8918 16.8014L17.8945 14.2809C16.9457 13.0835 15.2487 12.7904 13.9532 13.6001L13.1168 14.1228C12.6581 14.4095 12.0547 14.2795 11.7547 13.8295L10.3177 11.6741C9.20539 10.0056 6.80071 9.8771 5.51693 11.4176L4 13.238V16C4 17.6569 5.34315 19 7 19H17C18.3793 19 19.5412 18.0691 19.8918 16.8014Z"
                      fill={`rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`}
                    />
                    <path
                      d="M16 11C17.1046 11 18 10.1046 18 9C18 7.89543 17.1046 7 16 7C14.8954 7 14 7.89543 14 9C14 10.1046 14.8954 11 16 11Z"
                      fill={`rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`}
                    />
                  </svg>
                )}
                <span className="text-lg text-white text-md">
                  {service.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
