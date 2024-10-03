import React, { useState } from "react";

interface Category {
  id: number;
  site_id: number;
  name: string;
  image: string;
}

interface Item {
  id: number;
  category_name: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular: number;
}

interface BasketItem {
  id: number;
  name: string;
  category_name: string;
  isPopular: string | number;
  description?: string;
  price: number;
  image?: string;
}

interface Props {
  data: {
    categories: Category[];
    items: Item[];
  };
  bodyColorBg: { r: string; g: string; b: string; a: string };
  headerColorBg: { r: string; g: string; b: string; a: number };
  bodyTextColor: { r: number; g: number; b: number; a: number };
  updateBasket: any;
}

const ProductDisplay: React.FC<Props> = ({
  data,
  headerColorBg,
  bodyTextColor,
  bodyColorBg,
  updateBasket,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems =
    selectedCategory !== null
      ? data.items
          .filter((item: Item) => item.category_name === selectedCategory)
          .sort((a: any, b: any) => parseInt(b.isPopular) - parseInt(a.isPopular))
      : [];

  const basketHandler = (item: BasketItem) => {
    const basket = localStorage.getItem("basket");

    if (basket) {
      const data: BasketItem[] = JSON.parse(basket);
      const newData = JSON.stringify([...data, item]);
      localStorage.setItem("basket", newData);
    } else {
      const newData = JSON.stringify([item]);
      localStorage.setItem("basket", newData);
    }

    updateBasket();
  };

  const closeModal = () => setSelectedItem(null);

  return (
    <div className="w-full rounded-lg">
      {selectedItem && (
        <div
          className="fixed z-[10001] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="px-4 md:px-0 ">
            <div
              className="bg-white rounded-lg shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-4 text-gray-500 text-2xl"
                onClick={closeModal}
              >
                ×
              </button>
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="min-w-full md:w-[60%] h-60 md:h-96 object-cover rounded-md"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
                <p className="text-lg font-semibold">€ {selectedItem.price} </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCategory === null ? (
        <div
          className="rounded-lg flex flex-col gap-4 p-3"
          style={{
            background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
              bodyTextColor.b
            }, ${bodyTextColor.a / 4})`,
          }}
        >
          {data.categories.length > 0 ? (
            data.categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className="cursor-pointer flex items-center rounded-lg shadow-lg transition duration-300 category-item"
                style={{
                  background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                    headerColorBg.b
                  }, ${+headerColorBg.a / 1.1})`,
                }}
              >
                <div className="w-[30%] md:w-[50%] h-[120px] md:h-[160px] img_w">
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover image-border"
                    />
                  )}
                </div>

                <div className="w-[70%] md:w-[50%] py-3 md:py-0 rounded-t-lg md:rounded-none md:bg-none flex items-center justify-center category-top">
                  <h3
                    className="text-2xl px-[20px] py-[10px] border-b md:border-b-0 md:px-[60px] md:py-[20px] rounded-none md:rounded-md md:text-4xl font-bold opacity-[80%] no-bg-color"
                    style={{
                      color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                      backgroundColor:
                        window.innerWidth < 1000
                          ? ""
                          : `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                              headerColorBg.b
                            }, ${headerColorBg.a / 1})`,
                    }}
                  >
                    {category.name}
                  </h3>
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
      ) : (
        <div
          className="p-4 relative rounded-lg"
          style={{
            background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
              bodyTextColor.b
            }, ${bodyTextColor.a / 4})`,
          }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-4 absolute top-[-30px] text-sm md:text-md md:top-[-35px] left-0"
            style={{
              color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
            }}
          >
            ← Back to Categories
          </button>
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
            }}
          >
            Items in {selectedCategory}
          </h2>
          <div className="w-full flex flex-col gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden w-full flex flex-row-reverse md:flex-row rounded-md shadow-lg product-item"
                  style={{
                    background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                      headerColorBg.b
                    }, ${+headerColorBg.a / 1.1})`,
                  }}
                >
                  <div className="w-[70%] md:w-[50%] flex flex-col gap-[6px] md:gap-[20px] p-[6px] md:p-[40px]">
                    <div className="w-full flex md:flex-row items-center gap-2">
                      <h4
                        className="text-md md:text-lg font-semibold"
                        style={{
                          color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                          minWidth: " fit-content",
                        }}
                      >
                        {item.name}
                      </h4>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                      <p
                        className="text-sm md:text-lg opacity-[80%] h-[50px] md:h-auto overflow-scroll"
                        style={{
                          color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                        }}
                      >
                        {item.description}
                      </p>
                      <p
                        className="text-md md:text-lg font-bold"
                        style={{
                          color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                        }}
                      >
                        € {item.price} isPopular{item.isPopular}
                      </p>
                      <button
                        className={"py-2 px-4 text-sm w-fit rounded-md mt-4"}
                        style={{
                          background: `rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`,
                        }}
                        onClick={() => basketHandler(item)}
                      >
                        add to basket
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      "w-[30%] md:w-[50%] min-h-[120px] md:h-[320px] no-image-border img_w"
                    }
                    onClick={() => setSelectedItem(item)}
                    style={
                      !item.image
                        ? {
                            backgroundColor: `rgba(${headerColorBg.r}, ${
                              headerColorBg.g
                            }, ${headerColorBg.b}, ${headerColorBg.a / 1})`,
                          }
                        : {}
                    }
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full min-h-full object-cover image-border hover:cursor-pointer"
                      />
                    )}
                  </div>
                  {item.isPopular === 1 && (
                    <span className="py-0.5 px-10 bg-red-600 text-white text-xs rotate-45 absolute top-[15px] right-[-35px]">
                      Popular
                    </span>
                  )}
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
      )}
    </div>
  );
};

export default ProductDisplay;
