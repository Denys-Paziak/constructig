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
}

interface Props {
  data: {
    categories: Category[];
    items: Item[];
  };
  bodyColorBg: { r: string; g: string; b: string; a: string };
  headerColorBg: { r: string; g: string; b: string; a: number };
  bodyTextColor: { r: number; g: number; b: number; a: number };
}

const ProductDisplay: React.FC<Props> = ({
  data,
  headerColorBg,
  bodyTextColor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems =
    selectedCategory !== null
      ? data.items.filter((item) => item.category_name === selectedCategory)
      : [];

  return (
    <div
      className="w-full rounded-lg"
      style={{
        background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
          headerColorBg.b
        }, ${+headerColorBg.a / 6})`,
      }}
    >
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
                className=" hoverImg cursor-pointer flex items-center rounded-lg shadow-lg transition duration-300 category-item"
                style={{
                  background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                    headerColorBg.b
                  }, ${+headerColorBg.a / 1.1})`,
                }}
              >
                <div className="w-[30%] md:w-[50%] h-[120px] md:h-[320px] img_w ">
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
                      backgroundColor: window.innerWidth < 1000 ? '' :  `rgba(${headerColorBg.r}, ${
                          headerColorBg.g
                      }, ${headerColorBg.b}, ${headerColorBg.a / 1})`,

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
                  className="hoverImg w-full flex flex-row-reverse md:flex-row rounded-md shadow-lg product-item"
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
                      <span
                        className="w-full h-[1px] opacity-[50%]"
                        style={{
                          background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                        }}
                      ></span>
                      <p
                        className="text-md md:text-lg font-bold"
                        style={{
                          color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                        }}
                      >
                        ${item.price}
                      </p>
                    </div>
                    <p
                      className="text-sm md:text-lg opacity-[80%]"
                      style={{
                        color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={
                      "w-[30%] md:w-[50%] min-h-[120px] md:h-[320px] no-image-border img_w"
                    }
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
                        className="w-full min-h-full object-cover image-border"
                      />
                    )}
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
      )}
    </div>
  );
};

export default ProductDisplay;
