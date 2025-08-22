import React from "react";

const Products = () => {
  // Sample product data with Unsplash images
  const products = [
    { 
      id: 1, 
      title: "Laptop", 
      brand: "Dell", 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww/100x100/?laptop" 
    },
    { 
      id: 2, 
      title: "Phone", 
      brand: "Samsung", 
      image: "https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvbmV8ZW58MHx8MHx8fDA%3D/100x100/?smartphone" 
    },
    { 
      id: 3, 
      title: "Headphones", 
      brand: "Sony", 
      image: "https://images.unsplash.com/photo-1602248145578-9e5bc50c77b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0d2F0Y2glMjAlMjAlMkMlMjBoZWFkcGhvbmV8ZW58MHx8MHx8fDA%3D/100x100/?headphones" 
    },
    { 
      id: 4, 
      title: "Smartwatch", 
      brand: "Apple", 
      image: "https://images.unsplash.com/photo-1571265741625-917e6b6ea1e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnR3YXRjaCUyMCUyMCUyQyUyMGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D/100x100/?smartwatch" 
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Product List</h1>

      <ul className="w-96 bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {products.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-gray-50 flex items-center space-x-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex justify-between w-full">
              <span className="font-medium">{item.title}</span>
              <span className="text-gray-500">{item.brand}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
