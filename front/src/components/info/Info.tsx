import React from "react";

interface InfoProps {
  image: string | null;
  title: string;
  text: string;
  bodyColorBg: { r: string; g: string; b: string; a: string };
  bodyTextColor: { r: string; g: string; b: string; a: string };
}

export const Info: React.FC<InfoProps> = ({
  image,
  title,
  text,
  bodyColorBg,
  bodyTextColor,
}) => {
  return (
    <div
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
            About us
          </h2>
          {image ? (
            <div className="flex items-center gap-6 md:flex-row flex-col">
              <img
                src={image}
                alt={title}
                className="w-[100%] md:w-[50%] object-cover rounded-lg"
              />
              <div className="w-[100%] md:w-[50%]">
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
                    color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[100%] text-center">
                <h3 className="text-4xl font-semibold text-gray-800">
                  {title}
                </h3>
                <p className="text-gray-600 mt-4">{text}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
