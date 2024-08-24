import React from "react";

interface Props {
  logo: string | null;
  data: any;
  company: string;
  footerColorBg: { r: string; g: string; b: string; a: string };
  footerTextColor: { r: string; g: string; b: string; a: string };
  screen: string;
}

export const Footer: React.FC<Props> = ({
  logo,
  data,
  company,
  footerColorBg,
  footerTextColor,
  screen,
}) => {
  return (
    <div
      className="py-12 container-block"
      style={{
        backgroundColor: `rgba(${footerColorBg.r}, ${footerColorBg.g}, ${footerColorBg.b}, ${footerColorBg.a})`,
      }}
    >
      <div className="container mx-auto w-full flex flex-col gap-6">
        <div className="w-full flex items-center justify-between pb-6 border-b footer-top">
          <div
            className="notranslate"
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
              borderColor: `rgba(${footerColorBg.r}, ${footerColorBg.g}, ${footerColorBg.b}, ${footerColorBg.a})`,
            }}
          >
            {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
          </div>
          <ul
            className="flex items-center gap-8 footer-menu"
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
          >
            {data.slider?.visible && (
              <a href="#slider">{data.header.menu[0].text}</a>
            )}
            {data.services?.visible && (
              <a href="#services">{data.header.menu[1].text}</a>
            )}
            {data.info?.visible && (
              <a href="#about">{data.header.menu[2].text}</a>
            )}
            {data.socials?.visible && (
              <a href="#contact">{data.header.menu[3].text}</a>
            )}
          </ul>
          <div>
            <a
              style={{
                color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
              }}
              className="text-lg text-black hover:text-blue-500"
              href={data.footer.web_link}
            >
              My website
            </a>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
            className="text-sm text-black"
          >
            {data.footer.first_description}
          </p>
          <p
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
            className="text-sm text-black"
          >
            {data.footer.second_description}
          </p>
        </div>
      </div>
    </div>
  );
};
