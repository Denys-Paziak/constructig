import React from "react";

interface InfoProps {
  image: string | null;
  title: string;
  text: string;
  bodyColorBg: { r: any; g: any; b: any; a: any };
  backgroundColor: { r: any; g: any; b: any; a: any };
  bodyTextColor: { r: any; g: any; b: any; a: any };
  screen: string;
  data: any;
}

export const Info: React.FC<InfoProps> = ({
  image,
  title,
  text,
  bodyColorBg,
  backgroundColor,
  bodyTextColor,
  screen,
  data,
}) => {
  return (
    <div
      id="about"
      className="pb-24 flex gap-4"
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
            {data.header.menu[2].text}
          </h2>
          {image ? (
            <div
              className={`flex items-center gap-6 ${
                screen == "desktop" && "flex-col lg:flex-row"
              }  ${screen == "tablet" && "flex-col"} ${
                screen == "mobile" && "flex-col"
              }`}
            >
              <img
                src={image}
                alt={title}
                className={`${screen === "desktop" && "w-[100%] lg:w-[50%]"} ${
                  screen === "tablet" && "w-[100%]"
                } ${
                  screen === "mobile" && "w-[100%]"
                } w-[100%] object-cover rounded-lg  `}
              />
              <div
                className={`${screen === "desktop" && "w-[100%] lg:w-[50%]"} ${
                  screen === "tablet" && "w-[100%]"
                } w-[100%]`}
              >
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="mt-4"
                  style={{
                    color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
                      bodyTextColor.b
                    }, ${bodyTextColor.a / 1.4})`,
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`flex items-center ${
                screen == "desktop" && "flex-col lg:flex-row"
              }  ${screen == "tablet" && "flex-col"} ${
                screen == "mobile" && "flex-col"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[100%] md:min-w-[50%] object-cover rounded-lg"
              >
                <path
                  d="M7 3C4.23858 3 2 5.23858 2 8V16C2 18.7614 4.23858 21 7 21H17C19.7614 21 22 18.7614 22 16V8C22 5.23858 19.7614 3 17 3H7Z"
                  fill={`rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`}
                />
                <path
                  d="M19.8918 16.8014L17.8945 14.2809C16.9457 13.0835 15.2487 12.7904 13.9532 13.6001L13.1168 14.1228C12.6581 14.4095 12.0547 14.2795 11.7547 13.8295L10.3177 11.6741C9.20539 10.0056 6.80071 9.8771 5.51693 11.4176L4 13.238V16C4 17.6569 5.34315 19 7 19H17C18.3793 19 19.5412 18.0691 19.8918 16.8014Z"
                  fill={`rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`}
                />
                <path
                  d="M16 11C17.1046 11 18 10.1046 18 9C18 7.89543 17.1046 7 16 7C14.8954 7 14 7.89543 14 9C14 10.1046 14.8954 11 16 11Z"
                  fill={`rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`}
                />
              </svg>

              <div className="w-[100%]">
                <h3
                  className="text-4xl font-semibold"
                  style={{
                    color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                  }}
                >
                  {title}
                </h3>
                <p
                  className=" mt-4"
                  style={{
                    color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
                      bodyTextColor.b
                    }, ${bodyTextColor.a / 1.4})`,
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
