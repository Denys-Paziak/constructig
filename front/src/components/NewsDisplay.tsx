import React from "react";
import { INew } from "../services/news/news.interface";
import Loader from "./loader/Loader";

interface Props {
  data: any;
  bodyColorBg: { r: string; g: string; b: string; a: string };
  bodyTextColor: { r: number; g: number; b: number; a: number };
}

const NewsDisplay: React.FC<Props> = ({ data, bodyColorBg, bodyTextColor }) => {
  if (!data) {
    return <Loader />;
  }

  return (
    <div
      className="w-full rounded-lg"
      style={{
        background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
          bodyTextColor.b
        }, ${bodyTextColor.a / 4})`,
      }}
    >
      <div
        className="rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 p-3"
        style={{
          background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
            bodyTextColor.b
          }, ${bodyTextColor.a / 4})`,
        }}
      >
        {data.news.map((oneNew: INew) => (
          <div
            key={oneNew.id}
            className="flex flex-col items-start p-3 rounded-lg shadow-lg gap-4"
            style={{
              background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
                bodyTextColor.b
              }, ${bodyTextColor.a / 6})`,
            }}
          >
            <img
              src={oneNew.image}
              alt={oneNew.title}
              className="w-full h-[260px] md:h-[400px] object-cover rounded-lg mr-4"
            />
            <h3
              className="text-xl font-semibold"
              style={{
                color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
              }}
            >
              {oneNew.title}
            </h3>
            <p>{oneNew.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsDisplay;
