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
      className="py-12"
      style={{
        backgroundColor: `rgba(${footerColorBg.r}, ${footerColorBg.g}, ${footerColorBg.b}, ${footerColorBg.a})`,
      }}
    >
      <div className="container mx-auto w-full flex flex-col gap-6">
        <div className="w-full flex items-center justify-between pb-6 border-b border-gray-300">
          <div
            className="w-20"
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
          >
            {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
          </div>
          <ul
            className="flex items-center gap-8"
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
          >
            <li className="list-none">
              <a href="#" className="text-md">
                item 1
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="text-md">
                item 2
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="text-md">
                item 3
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="text-md">
                item 4
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="text-md">
                item 5
              </a>
            </li>
          </ul>
          <div>
            <a
              style={{
                color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
              }}
              className="text-lg text-black hover:text-blue-500"
              href="https://google.com"
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            praesentium amet. Consequuntur iure corporis minus animi,
            voluptatibus hic modi excepturi corrupti ipsam dolorum itaque
            sapiente vel dolore fugit error. Aperiam corporis ipsam repellendus
            non iure rerum praesentium modi laboriosam hic modi excepturi
            corrupti ipsam dolorum itaque sapiente vel dolore fugit error.
            Aperiam corporis ipsam repellendus non iure rerum praesentium modi
            laboriosam
          </p>
          <p
            style={{
              color: `rgba(${footerTextColor.r}, ${footerTextColor.g}, ${footerTextColor.b}, ${footerTextColor.a})`,
            }}
            className="text-sm text-black"
          >
            hic modi excepturi corrupti ipsam dolorum itaque sapiente vel dolore
            fugit error. Aperiam corporis ipsam repellendus non iure rerum
            praesentium modi laboriosam re rerum praesentium modi laboriosam
          </p>
        </div>
      </div>
    </div>
  );
};
