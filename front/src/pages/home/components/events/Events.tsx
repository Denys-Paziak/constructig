import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const Events = () => {
  const swiper = useSwiper();

  return (
    <section className="w-full pb-[160px] pt-[40px] px-[20px]">
      <div className="container mx-auto">
        <div className="w-full flex flex-col gap-[60px]">
          <div className="w-full flex flex-col gap-[30px]">
            <h2 className="text-center text-black font-medium text-3xl md:text-4xl lg:text-5xl">
              Events in your city
            </h2>
            <p className="text-center text-2xl" style={{ color: "#AFAFAF" }}>
              Aenean auctor neque enim, sit amet condimentum metus fermentum ac.
            </p>
          </div>
          <div className="w-full flex flex-col gap-[60px]">
            <div className="flex items-center gap-[20px]">
              <span className="text-lg text-black font-semibold">City</span>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-[140px] rounded-md bg-transparent px-[20px] py-[16px] text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Thorold
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-black"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Account settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Support
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        License
                      </a>
                    </MenuItem>
                    <form action="#" method="POST">
                      <MenuItem>
                        <button
                          type="submit"
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </div>
            <div className="w-full relative">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={{
                  nextEl: ".arrow-right-brands",
                  prevEl: ".arrow-left-brands",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 80,
                  },
                }}
                modules={[Navigation]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="mySwiper partners-slider"
              >
                <SwiperSlide>
                  <img src="../event-image.jpg" alt="event img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../event-image.jpg" alt="event img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../event-image.jpg" alt="event img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../event-image.jpg" alt="event img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../event-image.jpg" alt="event img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../event-image.jpg" alt="event img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../event-image.jpg" alt="event img" />
                </SwiperSlide>
              </Swiper>

              <span
                onClick={() => swiper && swiper.slidePrev()}
                className={`arrow-left-brands arrow__brands_left arrow-brands`}
              >
                <svg
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66699 9L20.3337 9M1.66699 9L9.66699 17M1.66699 9L9.66699 1"
                    stroke="#AFAFAF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                onClick={() => swiper && swiper.slideNext()}
                className={`arrow-right-brands arrow__brands_right arrow-brands`}
              >
                <svg
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.333 9L1.66634 9M20.333 9L12.333 17M20.333 9L12.333 1"
                    stroke="#AFAFAF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
