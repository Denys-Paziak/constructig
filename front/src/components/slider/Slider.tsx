import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

interface SliderProps {
  images: string[];
  backgroundColor?: string;
}

export const Slider: React.FC<SliderProps> = ({
  images,
  backgroundColor = "#ddd",
}) => {
  if (images.length === 0) {
    return (
      <div
        className="bg-gray-300 h-[300px] flex justify-center items-center"
        style={{ backgroundColor }}
      >
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination]}
        pagination={true}
        navigation={true}
        className="h-[90vh]"
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full flex justify-center items-center">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="object-cover h-full w-full"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
