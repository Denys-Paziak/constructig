import React from 'react';

interface SocialItem {
    icon: string;  // URL або ім'я іконки
    link: string;  // Посилання на соціальну мережу
    name: string;  // Назва соціальної мережі
}

interface SocialsProps {
    socials: SocialItem[];
}

export const Socials: React.FC<SocialsProps> = ({ socials }) => {
    return (
        <div className="flex justify-around bg-white py-4">
            {socials.map((social, index) => (
                <a
                    key={index}
                    href={social.link}
                    className="flex flex-col items-center text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={social.icon}
                        alt={social.name}
                        className="h-12 w-12 mb-2"
                    />
                    <span className="text-sm text-blue-600">{social.name}</span>
                </a>
            ))}
        </div>
    );
};

export default Socials;
