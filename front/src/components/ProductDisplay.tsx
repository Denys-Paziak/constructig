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
}

const ProductDisplay: React.FC<Props> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems =
    selectedCategory !== null
      ? data.items.filter((item) => item.category_name === selectedCategory)
      : [];

  console.log(data.categories);

  return (
    <div className="container mx-auto p-4">
      {selectedCategory === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className="cursor-pointer flex items-center p-4 border rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-blue-500 mb-4"
          >
            ← Back to Categories
          </button>
          <h2 className="text-2xl font-bold mb-4">
            Items in {selectedCategory}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-lg font-bold">${item.price}</p>
                </div>
              ))
            ) : (
              <p>No items found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
