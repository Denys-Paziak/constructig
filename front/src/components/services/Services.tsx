import React from "react";

interface ServiceItem {
  icon: string;
  title: string;
  link: string;
}

interface ServicesProps {
  services: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <div className="w-full bg-white py-10">
      <div className="flex justify-between items-center flex-col gap-6">
        <h2 className="text-4xl font-semibold text-gray-800">Services</h2>
        <div className="w-full flex justify-between gap-4">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="w-[25%] bg-blue-500 p-4 py-10 rounded-lg flex flex-col items-center text-center gap-4 hover:bg-blue-600 cursor-pointer"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="h-12 w-12 mb-2"
              />
              <span className="text-md text-white">{service.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
