import React from 'react';

interface ServiceItem {
    icon: string;  // URL або ім'я іконки
    title: string; // Назва сервісу
    link: string;  // Посилання на дію
}

interface ServicesProps {
    services: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
    return (
        <div className="flex justify-around bg-white pt-12">
            {services.map((service, index) => (
                <a
                    key={index}
                    href={service.link}
                    className="flex flex-col items-center text-center"
                >
                    <img
                        src={service.icon}
                        alt={service.title}
                        className="h-12 w-12 mb-2"
                    />
                    <span className="text-sm text-black">{service.title}</span>
                </a>
            ))}
        </div>
    );
};

export default Services;
