import { useEffect, useState } from "react";
import { Header } from "./header/Header";
import { Info } from "./info/Info";
import { Services } from "./services/Services";
import { Slider } from "./slider/Slider";
import { Socials } from "./socials/Socials";
import Loader from "./loader/Loader";
import { Footer } from "./footer/Footer";
import ProductDisplay from "./ProductDisplay";
import Baner from "./baner/Baner.tsx";
import { sendMessageToOrder } from "../api/telegram.ts";
import { notify } from "../helpers/helper.ts";

interface PreviewProps {
  data: any;
  type?: string;
}

const Preview: React.FC<PreviewProps> = ({ data, type }) => {
  const [screen, setScreen] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showWifi, setShowWifi] = useState(false);
  const [basket, setBasket] = useState([]);
  const [basketMenu, setBasketMenu] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleMenuToggle = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const updateBasket = () => {
    let localBasket = localStorage.getItem("basket");

    if (localBasket) {
      let data = JSON.parse(localBasket);
      let price = 0;

      data.map((el: any) => {
        price += el.price;
      });

      setTotalPrice(price);
      setBasket(data);
    }
  };

  const deleteFromBasket = (index: number) => {
    let localBasket = localStorage.getItem("basket");

    if (localBasket) {
      let data = JSON.parse(localBasket);

      data.splice(index, 1);

      const totalPrice = data.reduce(
        (acc: number, el: any) => acc + el.price,
        0
      );

      localStorage.setItem("basket", JSON.stringify(data));

      setTotalPrice(totalPrice);
      setBasket(data);
    }
  };

  const handleServiceClick = (index: number) => {
    if (index === 2) {
      setShowProducts(true);
      return;
    }
    if (index === 3) {
      setShowProducts(false);
      return;
    }

    if (index === 4) {
      setShowWifi(true);
      return;
    }
  };

  const handleCloseProducts = () => {
    setShowProducts(false);
  };

  const handleOrder = async () => {
    setIsPopupVisible(false);

    const orderedItems = basket
      .map(
        (item, index) =>
          `#${index + 1} ${item.name} - €${item.price}\nDescription: ${
            item.description
          }`
      )
      .join("\n");

    const message = `
      🔔 New Order 🔔
      ------------------------------
      Table Number: ${inputValue}
      Ordered Items:
      ${orderedItems}
      ------------------------------
      Total Price: €${totalPrice}
    `;

    await sendMessageToOrder(message);

    localStorage.removeItem("basket");
    setBasket([]);
    setTotalPrice(0);
    notify("Thank you for your order, the waiter will be with you shortly!");

    setBasketMenu(false);
  };

  useEffect(() => {
    updateBasket();
  }, []);

  if (!data) return <Loader />;

  return (
    <div
      className={`${
        type === "constructor"
          ? `w-[75%] h-[100vh] ${
              isMenuOpen ? "overflow-hidden" : "overflow-scroll"
            } edit-site `
          : "w-[100%]"
      } flex items-center flex-col bg-gray-200`}
    >
      {basket && (
        <div
          className="fixed flex justify-center items-center w-14 h-14 cursor-pointer bottom-10 right-10 rounded-full z-50 bg-red-400 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
          style={{
            background: `rgba(${data.global.main_bg_color.r}, ${data.global.main_bg_color.g}, ${data.global.main_bg_color.b}, ${data.global.main_bg_color.a})`,
            color: `rgba(${data.global.main_text_color.r}, ${data.global.main_text_color.g}, ${data.global.main_text_color.b}, ${data.global.main_text_color.a})`,
          }}
          onClick={() => {
            setBasketMenu(true);
          }}
        >
          <div className="absolute -top-2 -left-2 w-6 h-6 flex justify-center items-center rounded-full bg-amber-50 text-black border-[1px] border-black shadow-sm text-xs font-bold animate-pulse">
            {basket.length}
          </div>
          <svg
            className="w-6 h-6 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
        </div>
      )}

      {basketMenu && (
        <div className="fixed z-[1000] w-full h-full bg-white overflow-y-scroll p-6 shadow-lg animate-fadeIn">
          <div
            className="absolute top-5 right-5 text-3xl cursor-pointer transform transition-transform hover:scale-110"
            onClick={() => {
              setBasketMenu(false);
            }}
          >
            ×
          </div>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Basket</h2>
            {basket.length === 0 ? (
              <div className="text-center text-xl text-gray-500">
                Your basket is empty
              </div>
            ) : (
              basket.map((el: any, index) => {
                return (
                  <div
                    key={index}
                    className="p-4 border-b border-gray-200 flex items-center justify-between mb-4 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        className="w-20 h-20 object-cover rounded-md shadow"
                        src={el.image}
                        alt={el.name}
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {el.name}
                        </h2>
                        <p className="text-gray-500">{el.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className="text-lg font-bold"
                        style={{
                          color: `rgba(${data.global.main_bg_color.r}, ${data.global.main_bg_color.g}, ${data.global.main_bg_color.b}, ${data.global.main_bg_color.a})`,
                        }}
                      >
                        {el.price} €
                      </span>
                      <button
                        className="mt-2 text-sm text-red-600 hover:text-red-800 hover:underline transition-colors duration-200"
                        onClick={() => deleteFromBasket(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            <div className="border-t border-gray-300 mt-6 pt-6 flex flex-col items-end">
              <div className="flex justify-between w-full text-xl font-semibold text-gray-900">
                <span>Total price:</span>
                <span>{totalPrice} €</span>
              </div>
              <button
                className="mt-4 px-6 py-3 text-white font-bold rounded-lg shadow transform transition-transform duration-300 hover:scale-105"
                style={{
                  background: `rgba(${data.global.main_bg_color.r}, ${data.global.main_bg_color.g}, ${data.global.main_bg_color.b}, ${data.global.main_bg_color.a})`,
                }}
                onClick={() => setIsPopupVisible(true)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && (
        <div
          className="fixed z-[10001] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsPopupVisible(false)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-gray-500 text-2xl"
              onClick={() => setIsPopupVisible(false)}
            >
              ×
            </button>
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="text-xl font-bold">Enter a number of table</h3>
              <p className="text-sm text-gray-700">
                Wait until the administrator processes your order
              </p>
            </div>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number of table"
            />
            <button
              className="w-full py-2 bg-blue-500 text-white rounded-md"
              onClick={handleOrder}
            >
              Make an order
            </button>
          </div>
        </div>
      )}

      {type === "constructor" ? (
        <div className="w-full bg-white shadow-md flex items-center justify-center gap-6 py-4 ">
          <div
            onClick={() => setScreen("desktop")}
            className={`w-8 h-8 p-2 ${
              screen === "desktop" ? "bg-blue-200" : "bg-gray-200"
            } shadow-sm rounded-md cursor-pointer`}
          >
            <img
              className="w-full h-full"
              src="../desktop-icon.svg"
              alt="desktop icon"
            />
          </div>
          <div
            onClick={() => setScreen("tablet")}
            className={`w-8 h-8 p-2 ${
              screen === "tablet" ? "bg-blue-200" : "bg-gray-200"
            } shadow-sm rounded-md cursor-pointer`}
          >
            <img
              className="w-full h-full"
              src="../tablet-icon.svg"
              alt="desktop icon"
            />
          </div>
          <div
            onClick={() => setScreen("mobile")}
            className={`w-8 h-8 p-2 ${
              screen === "mobile" ? "bg-blue-200" : "bg-gray-200"
            } shadow-sm rounded-md cursor-pointer`}
          >
            <img
              className="w-[400px] h-full"
              src="../mobile-icon.svg"
              alt="desktop icon"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className={` ${type === "constructor" ? "py-6 px-4" : ""} ${
          screen === "desktop"
            ? "w-full"
            : screen === "tablet"
            ? "w-[600px]"
            : screen === "mobile"
            ? "w-[375px]"
            : ""
        }`}
      >
        <div
          className={`relative ${
            type === "constructor" ? "rounded-xl overflow-hidden" : ""
          }`}
        >
          {/* <TopLine /> */}
          {data.header?.visible === 1 && (
            <Header
              logo={data.header.logo}
              data={data}
              company={data.site?.name || ""}
              headerColorBg={data.global.main_bg_color}
              headerTextColor={data.global.main_text_color}
              screen={screen}
              onMenuToggle={handleMenuToggle}
            />
          )}
          {data.slider?.visible === 1 && (
            <Slider
              images={data.slider.images || []}
              backgroundColor={data.global.main_bg_color}
              textColor={data.global.main_text_color}
            />
          )}

          {data.banner?.visible === 1 && (
            <Baner bodyColorBg={data.global.site_bg_color} />
          )}

          {data.services?.visible && (
            <Services
              data={data}
              services={data.services.cols || []}
              backgroundColor={data.global.main_bg_color}
              textColor={data.global.main_text_color}
              bodyColorBg={data.global.site_bg_color}
              headerColorBg={data.global.main_bg_color}
              bodyTextColor={data.global.site_text_color}
              screen={screen}
              onServiceClick={handleServiceClick}
            />
          )}
          {showProducts && (
            <div
              className="w-[100%] top-0 z-50 overflow-auto px-4 md:px-0 pb-24"
              style={{
                background: `rgba(${data.global.site_bg_color.r}, ${data.global.site_bg_color.g}, ${data.global.site_bg_color.b}, ${data.global.site_bg_color.a})`,
              }}
            >
              <div className="container mx-auto pt-16 flex flex-col items-end gap-4">
                <button
                  onClick={handleCloseProducts}
                  className="bg-red-transparent flex items-center gap-4 z-[50] border-b py-2 px-4 button-close"
                  style={{
                    color: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                    borderColor: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                  }}
                >
                  <span className="hidden md:block">Close</span>
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 0.5L9 8.5M9 0.5L1 8.5"
                      stroke-linecap="round"
                      style={{
                        stroke: `rgba(${data.global.site_text_color.r}, ${data.global.site_text_color.g}, ${data.global.site_text_color.b}, ${data.global.site_text_color.a})`,
                      }}
                    />
                  </svg>
                </button>
                <ProductDisplay
                  data={data.global}
                  bodyColorBg={data.global.site_bg_color}
                  headerColorBg={data.global.main_bg_color}
                  bodyTextColor={data.global.site_text_color}
                  updateBasket={updateBasket}
                />
              </div>
            </div>
          )}
          {showWifi && (
            <div
              className={
                "fixed top-0 left-0 w-full h-[100vh] bg-gray-200 z-[100] flex justify-center items-center flex-col"
              }
            >
              <button
                className="absolute top-2 right-4 text-gray-700 text-2xl"
                onClick={() => {
                  setShowWifi(false);
                }}
              >
                ×
              </button>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 py-2 px-4 bg-gray-300 rounded-md">
                  <h2 className={"text-2xl font-bold"}>Wifi name: </h2>
                  <p>
                    {data.services.cols[4].name
                      ? data.services.cols[4].name
                      : "wifi-restaurant"}
                  </p>
                </div>
                <div className="flex items-center gap-4 py-2 px-4 bg-gray-300 rounded-md">
                  <h2 className={"text-2xl font-bold"}>Wifi password: </h2>
                  <p>
                    {data.services.cols[4].password
                      ? data.services.cols[4].password
                      : "qwerty"}
                  </p>
                </div>
              </div>
            </div>
          )}
          {data.info?.visible === 1 && (
            <Info
              data={data}
              image={data.info.image}
              title={data.info.title}
              text={data.info.text}
              backgroundColor={data.global.main_bg_color}
              bodyColorBg={data.global.site_bg_color}
              bodyTextColor={data.global.site_text_color}
              screen={screen}
            />
          )}
          {data.socials?.visible === 1 && (
            <Socials
              data={data}
              screen={screen}
              socials={[
                {
                  link: data.socials.instagram,
                  name: "Instagram",
                },
                {
                  link: data.socials.facebook,
                  name: "Facebook",
                },
                {
                  link: data.socials.youtube,
                  name: "YouTube",
                },
                {
                  link: data.socials.messenger,
                  name: "Messenger",
                },
                {
                  link: data.socials.whatsApp,
                  name: "WhatsApp",
                },
                {
                  link: data.socials.viber,
                  name: "Viber",
                },
                {
                  link: data.socials.x,
                  name: "X",
                },
                {
                  link: data.socials.tikTok,
                  name: "TikTok",
                },
              ]}
              bodyColorBg={data.global.site_bg_color}
              bodyTextColor={data.global.site_text_color}
            />
          )}
          {data.footer?.visible === 1 && (
            <Footer
              logo={data.header.logo}
              data={data}
              company={data.site?.name || ""}
              footerColorBg={data.global.main_bg_color}
              footerTextColor={data.global.main_text_color}
              screen={screen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
