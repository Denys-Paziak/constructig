import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

interface SliderProps {
  images: string[];
  backgroundColor?: any;
  textColor?: any;
}

export const Slider: React.FC<SliderProps> = ({
  images,
  backgroundColor,
  textColor,
}) => {
  const def = (
    <svg
      width="50px"
      height="50px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 3C4.23858 3 2 5.23858 2 8V16C2 18.7614 4.23858 21 7 21H17C19.7614 21 22 18.7614 22 16V8C22 5.23858 19.7614 3 17 3H7Z"
        fill={`rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`}
      />
      <path
        d="M19.8918 16.8014L17.8945 14.2809C16.9457 13.0835 15.2487 12.7904 13.9532 13.6001L13.1168 14.1228C12.6581 14.4095 12.0547 14.2795 11.7547 13.8295L10.3177 11.6741C9.20539 10.0056 6.80071 9.8771 5.51693 11.4176L4 13.238V16C4 17.6569 5.34315 19 7 19H17C18.3793 19 19.5412 18.0691 19.8918 16.8014Z"
        fill={`rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`}
      />
      <path
        d="M16 11C17.1046 11 18 10.1046 18 9C18 7.89543 17.1046 7 16 7C14.8954 7 14 7.89543 14 9C14 10.1046 14.8954 11 16 11Z"
        fill={`rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`}
      />
    </svg>
  );

  if (images.length === 0) {
    return (
      <div
        id="slider"
        className="bg-gray-300 h-[100vh] flex justify-center items-center relative"
      >
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          pagination={true}
          navigation={true}
          className="h-full"
        >
          <SwiperSlide>
            <div
              className="h-full w-full object-cover flex justify-center items-center"
              style={{
                backgroundColor: `rgba(${backgroundColor.r}, ${
                  backgroundColor.g
                }, ${backgroundColor.b}, ${backgroundColor.a / 4})`,
              }}
            >
              {def}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-full w-full flex justify-center items-center object-cover"
              style={{
                backgroundColor: `rgba(${backgroundColor.r}, ${
                  backgroundColor.g
                }, ${backgroundColor.b}, ${backgroundColor.a / 4})`,
              }}
            >
              {def}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-full w-full flex justify-center items-center object-cover"
              style={{
                backgroundColor: `rgba(${backgroundColor.r}, ${
                  backgroundColor.g
                }, ${backgroundColor.b}, ${backgroundColor.a / 4})`,
              }}
            >
              {def}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination]}
        pagination={true}
        navigation={true}
        className="h-full"
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide className="w-full h-full" key={index}>
              <div className="h-full w-full flex justify-center items-center object-cover">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="object-cover object-center h-[100vh] w-full"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
