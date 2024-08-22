import React from "react";

interface SocialItem {
  icon: string;
  link: string;
  name: string;
}

interface SocialsProps {
  socials: SocialItem[];
}

export const Socials: React.FC<SocialsProps> = ({ socials }) => {
  return (
    <div className="flex justify-around bg-white pb-24">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.link}
          className="flex flex-col items-center text-center gap-2 socialIcon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={"../" + social.name + ".png"}
            alt={social.icon}
            className="h-12 w-12 mb-2"
          />
          <span className="text-sm text-black">{social.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Socials;
