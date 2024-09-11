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
  headerColorBg: { r: string; g: string; b: string; a: string };
  bodyTextColor: { r: number; g: number; b: number; a: number };
}

const ProductDisplay: React.FC<Props> = ({
  data,
  bodyColorBg,
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
                className="cursor-pointer relative flex items-center rounded-lg shadow-lg transition duration-300 category-item"
                style={{
                  background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                    headerColorBg.b
                  }, ${+headerColorBg.a / 1.1})`,
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full md:w-[50%] h-[320px] object-cover"
                />
                <div
                  className="w-full absolute md:static top-0 left-0 right-0 py-3 md:py-0 rounded-t-lg md:rounded-none md:w-[50%] md:bg-none flex items-center justify-center category-top"
                  style={{
                    background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                      headerColorBg.b
                    }, ${+headerColorBg.a})`,
                  }}
                >
                  <h3
                    className="text-2xl md:text-4xl font-bold opacity-[80%]"
                    style={{
                      color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
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
                  className="w-full flex flex-col-reverse md:flex-row rounded-lg shadow-lg product-item"
                  style={{
                    background: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${
                      headerColorBg.b
                    }, ${+headerColorBg.a / 1.1})`,
                  }}
                >
                  <div className="w-full md:w-[50%] flex flex-col gap-[10px] md:gap-[20px] p-[14px] md:p-[40px]">
                    <div className="w-full flex flex-col md:flex-row items-start  md:items-center gap-2">
                      <h4
                        className="text-lg font-semibold"
                        style={{
                          color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                          minWidth: " fit-content",
                        }}
                      >
                        {item.name}
                      </h4>
                      <span
                        className="hidden md:block w-full h-[1px] opacity-[50%]"
                        style={{
                          background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                        }}
                      ></span>
                      <p
                        className="text-lg font-bold"
                        style={{
                          color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                        }}
                      >
                        ${item.price}
                      </p>
                    </div>
                    <p
                      className="text-lg opacity-[80%]"
                      style={{
                        color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-[50%] h-[320px] object-cover"
                  />
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
