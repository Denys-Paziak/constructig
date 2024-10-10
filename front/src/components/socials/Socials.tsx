import React from "react";

interface SocialItem {
  link: string;
  name: string;
}

interface SocialsProps {
  socials: SocialItem[];
  bodyColorBg: { r: string; g: string; b: string; a: string };
  bodyTextColor: { r: string; g: string; b: string; a: string };
  screen: string;
  data: any;
}

export const Socials: React.FC<SocialsProps> = ({
  socials,
  bodyColorBg,
  bodyTextColor,
  screen,
  data,
}) => {
  return (
    <div
      id="contact"
      className="flex justify-around pb-24 container-block"
      style={{
        background: `rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`,
      }}
    >
      <div className="container w-full flex flex-col items-center gap-12">
        <h2
          className="text-4xl font-bold"
          style={{
            color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
          }}
        >
          {data.header.menu[3].text}
        </h2>
        <div
          className={`w-full overflow-auto flex justify-between ${
            screen == "desctop" && "flex flex-col lg:flex-row"
          } ${screen == "tablet" && "flex-col gap-6"} ${
            screen == "mobile" && "flex-col gap-6"
          }`}
        >
          {socials.map((social, index) =>
            social.link !== null ? (
              <a
                key={index}
                href={social.link}
                className="flex flex-col items-center text-center gap-2 socialIcon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={"../../" + social.name + ".png"}
                  alt={social.name}
                  className="h-12 w-12 mb-2"
                />
                <span
                  className="text-sm"
                  style={{
                    color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                  }}
                >
                  {social.name}
                </span>
              </a>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Socials;
