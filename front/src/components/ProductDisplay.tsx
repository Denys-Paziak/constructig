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
  bodyTextColor: { r: number; g: number; b: number; a: number };
}

const ProductDisplay: React.FC<Props> = ({
  data,
  bodyColorBg,
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
        background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
          bodyTextColor.b
        }, ${bodyTextColor.a / 4})`,
      }}
    >
      {selectedCategory === null ? (
        <div
          className="rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 p-3"
          style={{
            background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
              bodyTextColor.b
            }, ${bodyTextColor.a / 4})`,
          }}
        >
          {data.categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className="cursor-pointer flex items-center p-3 rounded-lg shadow-lg transition duration-300"
              style={{
                background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
                  bodyTextColor.b
                }, ${bodyTextColor.a / 6})`,
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <h3
                className="text-xl font-semibold"
                style={{
                  color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                }}
              >
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-4"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg shadow-lg p-4"
                  style={{
                    background: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${
                      bodyTextColor.b
                    }, ${bodyTextColor.a / 6})`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <h4
                    className="text-lg font-semibold mb-2"
                    style={{
                      color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className=" mb-2"
                    style={{
                      color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                    }}
                  >
                    {item.description}
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{
                      color: `rgba(${bodyTextColor.r}, ${bodyTextColor.g}, ${bodyTextColor.b}, ${bodyTextColor.a})`,
                    }}
                  >
                    ${item.price}
                  </p>
                </div>
              ))
            ) : (
              <p
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
