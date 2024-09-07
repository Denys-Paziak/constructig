import React from "react";
import { INew } from "../services/news/news.interface";
import Loader from "./loader/Loader";

interface Props {
  data: any;
  bodyColorBg: { r: string; g: string; b: string; a: string };
  headerColorBg: { r: string; g: string; b: string; a: string };
  bodyTextColor: { r: number; g: number; b: number; a: number };
}

const NewsDisplay: React.FC<Props> = ({
  data,
  bodyColorBg,
  headerColorBg,
  bodyTextColor,
}) => {
  if (!data) {
    return <Loader />;
  }

  return (
    <div
      className="w-full rounded-lg"
      style={{
        background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
          headerColorBg.b
        }, ${+headerColorBg.a / 6})`,
      }}
    >
      <div
        className="rounded-lg flex flex-col gap-4 p-3"
        style={{
          background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
            bodyTextColor.b
          }, ${bodyTextColor.a / 4})`,
        }}
      >
        {data.news.length > 0 ? (
          data.news.map((oneNew: INew) => (
            <div
              key={oneNew.id}
              className="flex flex-col md:flex-row rounded-lg shadow-lg"
              style={{
                background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                  headerColorBg.b
                }, ${+headerColorBg.a / 1.1})`,
              }}
            >
              <img
                src={oneNew.image}
                alt={oneNew.title}
                className="w-full md:w-[50%] min-h-full object-cover rounded-t-lg md:rounded-lg"
              />
              <div className="w-full md:w-[50%] flex flex-col gap-[12px] md:gap-[20px] p-[12px] md:p-[40px]">
                <h3
                  className="text-xl font-semibold"
                  style={{
                    color: `rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`,
                  }}
                >
                  {oneNew.title}
                </h3>
                <p
                  className="text-md h-[180px] overflow-scroll md:overflow-visible md:h-auto opacity-[80%]"
                  style={{
                    color: `rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`,
                  }}
                >
                  {oneNew.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p
            className="text-center py-8"
            style={{
              color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
            }}
          >
            No items found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsDisplay;
